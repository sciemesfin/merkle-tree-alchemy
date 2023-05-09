const axios = require('axios');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');

const serverUrl = 'http://localhost:1225';

async function main() {
  // Create a Merkle tree from the nice list
  const merkleTree = new MerkleTree(niceList);

  // Choose a name from the nice list
  const selectedName = 'Sidney Kertzmann'; // Replace with the desired name from the nice list

  // Generate the Merkle proof for the selected name
  const proof = merkleTree.getProof(niceList.indexOf(selectedName));

  // Send the selected name and its proof to the server for verification
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: selectedName,
    proof: proof,
  });

  console.log({ gift });
}

main();
