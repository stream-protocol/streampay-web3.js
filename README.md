# StreamPay JavaScript SDK

To create a StreamPayments application using JavaScript for the Solana blockchain.

1. **Setup Your Environment:**
   Before you start, make sure you have Node.js and npm (Node Package Manager) installed on your system. If not, you can download them from https://nodejs.org/.

2. **Create a New Project:**
   Create a new directory for your project and navigate to it in your terminal.

3. **Initialize Your Project:**
   Run the following command to initialize a new Node.js project and create a `package.json` file:
   ```bash
   npm init -y
   ```

4. **Install Solana JavaScript SDK:**
   Install the Solana JavaScript SDK using npm:
   ```bash
   npm install @solana/web3.js
   ```

5. **Write Your StreamPayments Code:**
   
Private keys should never be hard-coded into source code!

Instead, use use environment variables or a secure configuration management solution to handle private keys and other sensitive information. Load private keys from environment variables. Remember to replace the placeholders with actual private key values and to handle these keys securely:

   Create a JavaScript file, e.g., `streamPayments.js`, and add the following code to create a basic StreamPayments application:

   ```javascript
   const { Connection, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } = require('@solana/web3.js');

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


   Replace `'https://api.devnet.solana.com'` with the appropriate Solana testnet or mainnet 'https://api.mainnet-beta.solana.com' URL.

1. **Run Application:**
   Run StreamPayments.js application using Node.js:
   ```bash
   node streamPayments.js
   ```

Please note that this is a basic example to demonstrate the concept of creating a StreamPayments application on Solana. In a real-world scenario, you would need to handle additional complexities such as payment schedules, handling payment streams, and manage security aspects carefully. Additionally, handling private keys in code as shown in this example is not secure; you should use appropriate key management practices in a production environment.
