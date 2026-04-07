import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { expect } from "chai";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { TokenizationClient } from "../app/src/client";

describe("asset-tokenization", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.AssetTokenization as Program;
  const client = new TokenizationClient(program, provider.connection);

  const admin = Keypair.generate();
  const treasury = Keypair.generate();
  const issuer = Keypair.generate();
  const investor1 = Keypair.generate();

  const assetId = new Array(32).fill(0);
  assetId[0] = 0x01; // Simple unique asset ID

  before(async () => {
    // Airdrop SOL to test accounts
    const airdropPromises = [admin, issuer, investor1].map(async (kp) => {
      const sig = await provider.connection.requestAirdrop(
        kp.publicKey,
        10 * LAMPORTS_PER_SOL
      );
      await provider.connection.confirmTransaction(sig);
    });
    await Promise.all(airdropPromises);
  });

  it("initializes the platform", async () => {
    const tx = await client.initializePlatform(
      admin,
      treasury.publicKey,
      250 // 2.5% fee
    );
    expect(tx).to.be.a("string");

    const [platformPDA] = client.getPlatformPDA();
    const platform = await program.account.platformConfig.fetch(platformPDA);
    expect(platform.feeBps).to.equal(250);
    expect(platform.authority.toBase58()).to.equal(
      admin.publicKey.toBase58()
    );
  });

  it("registers a real estate asset", async () => {
    const params = {
      assetId: assetId,
      assetClass: { realEstate: {} },
      name: "Sunset Boulevard Office Complex",
      metadataUri:
        "https://arweave.net/abc123_sunset_blvd_metadata",
      valuationUsd: new anchor.BN(2_500_000_000000), // $2.5M
      location: [
        new anchor.BN(34_052_235), // lat 34.052235
        new anchor.BN(-118_243_685), // lng -118.243685
      ] as [anchor.BN, anchor.BN],
      jurisdiction: [0x55, 0x53], // "US"
    };

    const { tx, assetPDA } = await client.registerAsset(issuer, params);
    expect(tx).to.be.a("string");

    const asset = await client.getAsset(assetPDA);
    expect(asset.name).to.equal("Sunset Boulevard Office Complex");
    expect(asset.valuationUsd.toNumber()).to.equal(2_500_000_000000);
    expect(asset.status).to.deep.equal({ registered: {} });
  });

  it("tokenizes the asset into 1M fractional tokens", async () => {
    const [assetPDA] = client.getAssetPDA(assetId);

    const tx = await client.tokenizeAsset(
      issuer,
      assetPDA,
      new anchor.BN(1_000_000_000000), // 1M tokens (6 decimals)
      new anchor.BN(2_500) // 0.0000025 SOL per token
    );
    expect(tx).to.be.a("string");

    const asset = await client.getAsset(assetPDA);
    expect(asset.status).to.deep.equal({ tokenized: {} });
    expect(asset.totalSupply.toNumber()).to.equal(1_000_000_000000);
  });

  it("adds investor to whitelist", async () => {
    const [platformPDA] = client.getPlatformPDA();
    const [assetPDA] = client.getAssetPDA(assetId);
    const [whitelistPDA] = client.getWhitelistPDA(
      assetPDA,
      investor1.publicKey
    );

    const tx = await program.methods
      .addToWhitelist(investor1.publicKey)
      .accounts({
        authority: admin.publicKey,
        platform: platformPDA,
        asset: assetPDA,
        whitelistEntry: whitelistPDA,
        systemProgram: SystemProgram.programId,
      })
      .signers([admin])
      .rpc();

    expect(tx).to.be.a("string");
  });

  it("investor purchases fractional tokens", async () => {
    const [assetPDA] = client.getAssetPDA(assetId);

    const tx = await client.purchaseTokens(
      investor1,
      assetPDA,
      new anchor.BN(100_000000) // 100 tokens
    );
    expect(tx).to.be.a("string");

    const position = await client.getInvestorPosition(
      assetPDA,
      investor1.publicKey
    );
    expect(position.tokenBalance.toNumber()).to.equal(100_000000);
  });

  it("distributes rental yield", async () => {
    const [assetPDA] = client.getAssetPDA(assetId);

    const tx = await program.methods
      .distributeYield(new anchor.BN(5 * LAMPORTS_PER_SOL))
      .accounts({
        issuer: issuer.publicKey,
        asset: assetPDA,
        systemProgram: SystemProgram.programId,
      })
      .signers([issuer])
      .rpc();

    expect(tx).to.be.a("string");

    const asset = await client.getAsset(assetPDA);
    expect(asset.totalYieldDistributed.toNumber()).to.equal(
      5 * LAMPORTS_PER_SOL
    );
  });
});
