import { SecretNetworkClient, Wallet, coinsFromString } from "secretjs";
import dotenv from "dotenv";
dotenv.config();

const wallet = new Wallet(process.env.MNEMONIC);

const secretjs = new SecretNetworkClient({
  chainId: "pulsar-3",
  url: "https://pulsar.lcd.secretnodes.com",
  wallet: wallet,
  walletAddress: wallet.address,
});

let contractCodeHash =
  "abe95568a8e61e26948e3ed8273630c98bdfd1dc11bb0178eb031e3bc3124c2d";
let contractAddress = "secret1squ6kur0gnx2rttgaau5uf7kul9scyk8jc30k9";

let query_contract = async () => {
  let my_query = await secretjs.query.compute.queryContract({
    contract_address: contractAddress,
    code_hash: contractCodeHash,
    query: {
      get_epoch: {
        id: "1"
      }
    },
  });
  console.log("epoch: ", my_query);
};
query_contract();