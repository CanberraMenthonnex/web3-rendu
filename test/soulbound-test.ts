import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Soulbound", () => {
    async function quizScoreFixture() {
        const [owner] = await ethers.getSigners();
        const Soulbound = await ethers.getContractFactory("QuizScore");
        const deployed_contract = await Soulbound.deploy(process.env.OWNER_ADRESS);

        return {deployed_contract, owner};
    }


    it("check the owner is correct", async () => {
        const {deployed_contract, owner} = await loadFixture(quizScoreFixture);
        // Check that owner address owns the token ID 0
        const value = await deployed_contract.ownerOf(1);
        expect(value).to.equal(owner.address);
    });
});