import { SecretNetworkClient, Wallet } from "secretjs";
import dotenv from "dotenv";
dotenv.config();

const wallet = new Wallet(process.env.MNEMONIC);

const secretjs = new SecretNetworkClient({
    chainId: "pulsar-3",
    url: "https://pulsar.lcd.secretnodes.com",
    wallet: wallet,
    walletAddress: wallet.address,
});

let add_epoch = async () => {
    let contractCodeHash =
        "abe95568a8e61e26948e3ed8273630c98bdfd1dc11bb0178eb031e3bc3124c2d";
    let contractAddress = "secret1squ6kur0gnx2rttgaau5uf7kul9scyk8jc30k9";
    const witness = "0x244897572368eadf65bfbc5aec98d8e5443a9072"

    let tx = await secretjs.tx.compute.executeContract(
        {
            sender: wallet.address,
            contract_address: contractAddress,
            msg: {
                add_epoch: {
                    witness: [{ address: witness, host: "" }],
                    minimum_witness: "1",
                }
            },
            code_hash: contractCodeHash,
        },
        { gasLimit: 100_000 }
    );
    console.log(`Tx hash: ${tx.transactionHash}`);
};

add_epoch();