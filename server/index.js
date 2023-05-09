const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: Hardcode a Merkle root here representing the whole nice list
// Paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '';

app.post('/gift', (req, res) => {
  // Grab the parameters from the front-end here
  const { name, proof } = req.body;

  // Convert the leaf from hex to bytes
  const leaf = Buffer.from(name, 'hex');

  // Verify that the name is in the list using the provided proof and Merkle root
  const isInTheList = verifyProof(proof, leaf, MERKLE_ROOT);

  if (isInTheList) {
    res.send('You got a toy robot!');
  } else {
    res.send('You are not on the list :(');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
