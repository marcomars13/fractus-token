const { Connection, clusterApiUrl, Keypair, PublicKey } = require('@solana/web3.js');
const { Metaplex, keypairIdentity } = require('@metaplex-foundation/js');
const fs = require('fs');

const secret = JSON.parse(fs.readFileSync("/Users/marco/my-keypair.json"));
const keypair = Keypair.fromSecretKey(Uint8Array.from(secret));

const connection = new Connection(clusterApiUrl('devnet'));
const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair));

(async () => {
  const mint = new PublicKey("3gUpRYrRN2rcDTb8tbKWZ5LB2cg28jQdjGNsxxLGtfrB");
  const uri = "https://raw.githubusercontent.com/marcomars13/fractus-token/main/metadata.json";

  try {
    await metaplex.tokens().update({
      mintAddress: mint,
      name: "Fractus",
      symbol: "FRA",
      uri: uri,
    });

    console.log("✅ Metadata updated for", mint.toBase58());
  } catch (err) {
    console.error("❌ Error updating metadata:", err);
  }
})();
