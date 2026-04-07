"use client";

import { useCallback, useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { AnchorProvider } from "@coral-xyz/anchor";
import { PROGRAM_ID } from "@/lib/constants";

export function useHomeCrowd() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const provider = useMemo(() => {
    if (!wallet.publicKey) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new AnchorProvider(connection, wallet as any, {
      commitment: "confirmed",
    });
  }, [connection, wallet]);

  const getPropertyPDA = useCallback(
    (buyerPubkey: PublicKey, propertyName: string) => {
      const [pda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("property"),
          buyerPubkey.toBuffer(),
          Buffer.from(propertyName),
        ],
        PROGRAM_ID
      );
      return pda;
    },
    []
  );

  const getUsdcVaultPDA = useCallback(
    (buyerPubkey: PublicKey, propertyName: string) => {
      const [pda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("usdc_vault"),
          buyerPubkey.toBuffer(),
          Buffer.from(propertyName),
        ],
        PROGRAM_ID
      );
      return pda;
    },
    []
  );

  const getRentVaultPDA = useCallback(
    (buyerPubkey: PublicKey, propertyName: string) => {
      const [pda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("rent_vault"),
          buyerPubkey.toBuffer(),
          Buffer.from(propertyName),
        ],
        PROGRAM_ID
      );
      return pda;
    },
    []
  );

  return {
    provider,
    programId: PROGRAM_ID,
    getPropertyPDA,
    getUsdcVaultPDA,
    getRentVaultPDA,
  };
}
