require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const pk = fs.readFileSync(".secret").toString();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.4",
	paths: {
		artifacts: "./src/artifacts",
	},
	networks: {
		hardhat: {
			chainId: 1337,
		},
		mumbai: {
			url: "https://rpc-mumbai.maticvigil.com/v1/93f5b685041f9ffcc39c216c71b340b60752695a",
			accounts: [`0x${pk}`],
			// gasPrice: 800000000,
		},
		mainnet: {
			url: "https://rpc-mainnet.maticvigil.com/v1/93f5b685041f9ffcc39c216c71b340b60752695a",
			accounts: [`0x${pk}`],
			// gasPrice: 800000000,
		},
		// ropsten: {
		// 	url: "https://ropsten.infura.io/v3/c8dc15e142cf44d49e01b32537537c93",
		// },
	},
};
