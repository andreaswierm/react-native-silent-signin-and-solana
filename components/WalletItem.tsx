import React, { FC, useEffect, useState } from "react";
import { Wallet } from "@dynamic-labs/client";
import { View, Text, Button } from "react-native";
import { amount, destinationAddress, useDynamic } from "@/client";

import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

export const WalletItem: FC<{ wallet: Wallet }> = ({ wallet }) => {
  const { wallets, solana } = useDynamic();
  const [balance, setBalance] = useState("");

  const sendTransaction = async () => {
    if (!amount) {
      throw new Error("Sol is required");
    }

    if (!destinationAddress) {
      throw new Error("Address is required");
    }

    const connection = solana.getConnection();

    const blockhash = await connection.getLatestBlockhash();

    const amountInLamports = Number(amount) * LAMPORTS_PER_SOL;
    const fromKey = new PublicKey(wallet.address);
    const toKey = new PublicKey(destinationAddress);

    const instructions = [
      SystemProgram.transfer({
        fromPubkey: fromKey,
        lamports: amountInLamports,
        toPubkey: toKey,
      }),
    ];

    // create v0 compatible message
    const messageV0 = new TransactionMessage({
      instructions,
      payerKey: fromKey,
      recentBlockhash: blockhash.blockhash,
    }).compileToV0Message();

    const transferTransaction = new VersionedTransaction(messageV0);

    const signer = solana.getSigner({ wallet });

    const { signature } = await signer.signAndSendTransaction(
      transferTransaction
    );

    console.log("Successful transaction signature:", signature);
  };

  const signMessage = async () => {
    const primaryWallet = wallets.primary;

    if (!primaryWallet) return;

    const signer = solana.getSigner({ wallet: primaryWallet });

    const message = "Hello, World!";

    const signature = await signer.signMessage(
      new TextEncoder().encode(message)
    );

    console.log("Successful message signature:", signature);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      await new Promise((r) => setTimeout(r, 1000));

      const { balance } = await wallets.getBalance({ wallet });

      setBalance(balance);
    };

    fetchBalance();
  }, [wallet]);

  return (
    <View>
      <Text>Wallet address: {wallet.address}</Text>
      <Text>chain: {wallet.chain}</Text>

      <Text>Balance updated: {balance}</Text>
      <Button title="Send Transaction" onPress={sendTransaction} />
      <Button title="Sign Message" onPress={signMessage} />
    </View>
  );
};
