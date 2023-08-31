const { Connection, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } = require('@solana/web3.js');

async function createStreamPayments() {
    // Connect to the Solana network (mainnet)
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'recent');

    // Load your wallet's private key from an environment variable
    const payerPrivateKey = process.env.PAYER_PRIVATE_KEY; // Replace with your actual environment variable name
    const payerKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(payerPrivateKey)));

    // Create a new recipient account
    const recipientKeypair = Keypair.generate();

    // Construct a transaction to create the recipient account
    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payerKeypair.publicKey,
            newAccountPubkey: recipientKeypair.publicKey,
            lamports: 1000000, // Initial funding amount
            space: 1024,
            programId: SystemProgram.programId,
        })
    );

    // Sign and send the transaction
    await sendAndConfirmTransaction(connection, transaction, [payerKeypair, recipientKeypair]);

    console.log(`Recipient account created: ${recipientKeypair.publicKey.toBase58()}`);
}

createStreamPayments().catch(console.error);
