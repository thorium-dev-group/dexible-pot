const hre = require("hardhat");
const {ethers : eths} = require('ethers');
class DeployContext {

    constructor(props) {
        Object.assign(this, props);
        
        const {deployments, forceDeploy} = props;
        this.hre = hre;
        this.ethers = hre.ethers;
        this.deployments = deployments || {
            getOrNull: async (name) => {
                return null;
            },
            deploy: async (name, {
                libraries,
                from,
                args
            }) => {
                const depSigner = this.wallets.all.filter(a => a.address === from)[0];
                let con = await this.ethers.getContractFactory(name, {
                    libraries,
                    signer: depSigner
                });
        
                if(!con) {
                    throw new Error(`Could not find contract ${name}`);
                }

                console.log(`Deploying ${name} using signer ${depSigner.address}...`);
                const deployed = await (args ? con.deploy(...args) : con.deploy());
                console.log("Deployment txn", deployed.deployTransaction.hash);
                console.log("Estimated gas", deployed.deployTransaction.gasLimit.toString());
                const r = await deployed.deployTransaction.wait();
                deployed.receipt = r;
                return deployed;
            }
        };
        this.forceDeploy = forceDeploy;
    }

    init = async () => {
        const signers = await hre.ethers.getSigners();
        const accts = hre.network.config.accounts;
        for(let i=0;i<signers.length;++i) {
            const a = accts;
            const m = a.mnemonic;
            const p = `${a.path}/${i}`;
            const w = eths.Wallet.fromMnemonic(m, p);
            signers[i].privateKey = w.privateKey.substring(2);
        }

        this.chainId = +(await this.ethers.provider.getNetwork()).chainId;

        this.wallets = {
            all: signers,
            owner: signers[0],
            admin: signers[1]
        }
    }
}

module.exports = {
    DeployContext
}