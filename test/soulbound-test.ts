import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Soulbound", () => {
    async function deployTokenFixture() {
        const [owner, addr1] = await ethers.getSigners();
        // const deployed_contract = await ethers.deployContract("QuizScore", [owner.address])
        const contract = await ethers.getContractFactory("QuizScore", owner);
        const deployed_contract = await contract.deploy(owner.address);

        return {deployed_contract, owner, addr1};
    }


    it("Should set the right owner", async () => {
        const {deployed_contract, owner} = await loadFixture(deployTokenFixture);
        expect(await deployed_contract.owner()).to.equal(owner.address);
    });

    it("Should emit TokenAwarded event when awarding item", async () => {
        const {deployed_contract, addr1} = await loadFixture(deployTokenFixture);
        await expect(deployed_contract.awardItem(addr1.address, "tokenURI"))
            .to.emit(deployed_contract, "TokenAwarded")
            .withArgs(addr1.address, 1, "tokenURI");
    });

    it("Should return error if transfer is not from owner", async () => {
        const {deployed_contract, addr1} = await loadFixture(deployTokenFixture);
        await expect(deployed_contract.connect(addr1)
            .awardItem(addr1.address, "tokenURI")).to.be.reverted;
    });
});