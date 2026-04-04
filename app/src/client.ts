import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {
  PublicKey,
  SystemProgram,
  Keypair,
  Connection,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

const PROGRAM_ID = new PublicKey(
  "TKNz8Qv2f7bRJPmGxKLdh4UT9qXvShNjSg7Rw1PuAE"
);

export interface AssetRegistrationParams {
  assetId: number[];
  assetClass: object;
  name: string;
  metadataUri: string;
  valuationUsd: anchor.BN;
  location: [anchor.BN, anchor.BN];
  jurisdiction: number[];
}

export class TokenizationClient {
  private program: Program;
  private connection: Connection;

  constructor(program: Program, connection: Connection) {
    this.program = program;
    this.connection = connection;
  }

  /**
   * Derive the platform PDA
   */
  getPlatformPDA(): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("platform")],
      PROGRAM_ID
    );
  }

  /**
   * Derive the asset PDA from asset ID
   */
  getAssetPDA(assetId: number[]): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("asset"), Buffer.from(assetId)],
      PROGRAM_ID
    );
  }

  /**
   * Derive the token mint PDA for an asset
   */
  getMintPDA(assetPubkey: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("mint"), assetPubkey.toBuffer()],
      PROGRAM_ID
    );
  }

  /**
   * Derive the asset authority PDA
   */
  getAuthorityPDA(assetPubkey: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("authority"), assetPubkey.toBuffer()],
      PROGRAM_ID
    );
  }

  /**
   * Derive vault PDA for an asset
   */
  getVaultPDA(assetPubkey: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), assetPubkey.toBuffer()],
      PROGRAM_ID
    );
  }

  /**
   * Derive investor account PDA
   */
  getInvestorPDA(
    assetPubkey: PublicKey,
    investor: PublicKey
  ): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("investor"),
        assetPubkey.toBuffer(),
        investor.toBuffer(),
      ],
      PROGRAM_ID
    );
  }

  /**
   * Derive whitelist entry PDA
   */
  getWhitelistPDA(
    assetPubkey: PublicKey,
    investor: PublicKey
  ): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("whitelist"),
        assetPubkey.toBuffer(),
        investor.toBuffer(),
      ],
      PROGRAM_ID
    );
  }

  /**
   * Initialize the tokenization platform
   */
  async initializePlatform(
    authority: Keypair,
    treasury: PublicKey,
    feeBps: number
  ): Promise<string> {
    const [platformPDA] = this.getPlatformPDA();

    const tx = await this.program.methods
      .initializePlatform(feeBps)
      .accounts({
        authority: authority.publicKey,
        platform: platformPDA,
        treasury: treasury,
        systemProgram: SystemProgram.programId,
      })
      .signers([authority])
      .rpc();

    return tx;
  }

  /**
   * Register a new real-world asset
   */
  async registerAsset(
    issuer: Keypair,
    params: AssetRegistrationParams
  ): Promise<{ tx: string; assetPDA: PublicKey }> {
    const [platformPDA] = this.getPlatformPDA();
    const [assetPDA] = this.getAssetPDA(params.assetId);

    const tx = await this.program.methods
      .registerAsset(params)
      .accounts({
        issuer: issuer.publicKey,
        platform: platformPDA,
        asset: assetPDA,
        systemProgram: SystemProgram.programId,
      })
      .signers([issuer])
      .rpc();

    return { tx, assetPDA };
  }

  /**
   * Tokenize an asset into fractional SPL tokens
   */
  async tokenizeAsset(
    issuer: Keypair,
    assetPDA: PublicKey,
    totalSupply: anchor.BN,
    pricePerTokenLamports: anchor.BN
  ): Promise<string> {
    const [platformPDA] = this.getPlatformPDA();
    const [mintPDA] = this.getMintPDA(assetPDA);
    const [authorityPDA] = this.getAuthorityPDA(assetPDA);
    const [vaultPDA] = this.getVaultPDA(assetPDA);

    const tx = await this.program.methods
      .tokenizeAsset(totalSupply, pricePerTokenLamports)
      .accounts({
        issuer: issuer.publicKey,
        platform: platformPDA,
        asset: assetPDA,
        tokenMint: mintPDA,
        assetAuthority: authorityPDA,
        vault: vaultPDA,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      })
      .signers([issuer])
      .rpc();

    return tx;
  }

  /**
   * Purchase fractional tokens
   */
  async purchaseTokens(
    buyer: Keypair,
    assetPDA: PublicKey,
    amount: anchor.BN
  ): Promise<string> {
    const [platformPDA] = this.getPlatformPDA();
    const [authorityPDA] = this.getAuthorityPDA(assetPDA);
    const [vaultPDA] = this.getVaultPDA(assetPDA);
    const [investorPDA] = this.getInvestorPDA(assetPDA, buyer.publicKey);
    const [whitelistPDA] = this.getWhitelistPDA(assetPDA, buyer.publicKey);
    const [mintPDA] = this.getMintPDA(assetPDA);

    const asset = await this.program.account.realWorldAsset.fetch(assetPDA);

    const buyerATA = await getAssociatedTokenAddress(
      mintPDA,
      buyer.publicKey
    );

    const tx = await this.program.methods
      .purchaseTokens(amount)
      .accounts({
        buyer: buyer.publicKey,
        platform: platformPDA,
        asset: assetPDA,
        investorAccount: investorPDA,
        whitelist: whitelistPDA,
        vault: vaultPDA,
        buyerTokenAccount: buyerATA,
        assetAuthority: authorityPDA,
        issuer: (asset as any).issuer,
        treasury: (
          await this.program.account.platformConfig.fetch(platformPDA)
        ).treasury,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([buyer])
      .rpc();

    return tx;
  }

  /**
   * Fetch asset data from chain
   */
  async getAsset(assetPDA: PublicKey): Promise<any> {
    return this.program.account.realWorldAsset.fetch(assetPDA);
  }

  /**
   * Fetch all assets on the platform
   */
  async getAllAssets(): Promise<any[]> {
    return this.program.account.realWorldAsset.all();
  }

  /**
   * Fetch investor position
   */
  async getInvestorPosition(
    assetPDA: PublicKey,
    investor: PublicKey
  ): Promise<any> {
    const [investorPDA] = this.getInvestorPDA(assetPDA, investor);
    return this.program.account.investorAccount.fetch(investorPDA);
  }
}
