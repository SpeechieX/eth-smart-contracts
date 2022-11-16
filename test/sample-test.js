// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// Issues with Listing Price and Audit Price, test later to find sections

describe("Marketplace", function () {
	it("Should create and execute market sales", async function () {
		const Market = await ethers.getContractFactory("Marketplace");
		const market = await Market.deploy();
		await market.deployed();
		const marketAddress = market.address;

		const NFT = await ethers.getContractFactory("NFT");
		const nft = await NFT.deploy(marketAddress);
		await nft.deployed();
		const nftContractAddress = nft.address;

		let listingPrice = await market.getListingPrice();
		listingPrice = listingPrice.toString();

		const auctionPrice = ethers.utils.parseUnits("1", "ether");

		await nft.createToken("a");
		await nft.createToken("b");
		await nft.createToken("c");

		// await market.createMarketItem(nftContractAddress, 1, 1);
		// await market.createMarketItem(nftContractAddress, 2, 2);
		// await market.createMarketItem(nftContractAddress, 3, 3);

		await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
			value: listingPrice,
		});
		await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
			value: listingPrice,
		});

		const [_, userAddress] = await ethers.getSigners();

		transaction = await nft.createToken("d");
		transaction = await nft.createToken("e");
		transaction = await nft.createToken("f");
		transaction = await nft.createToken("g");
		transaction = await nft.createToken("h");
		transaction = await nft.createToken("i");

		await market
			.connect(userAddress)
			.createMarketSale(nftContractAddress, 1, { value: auctionPrice });

		items = await market.fetchMarketItems();
		items = await Promise.all(
			items.map(async (i) => {
				const tokenUri = await nft.tokenURI(i.tokenId);
				let item = {
					price: i.price.toNumber(),
					tokenId: i.price.toNumber(),
					seller: i.seller,
					owner: i.owner,
					tokenUri,
				};
				return item;
			}),
		);
		console.log("items: ", items);

		const myNfts = await market.connect(userAddress).fetchMyNFTs();
		console.log("myNfts:", myNfts);
	});
});
