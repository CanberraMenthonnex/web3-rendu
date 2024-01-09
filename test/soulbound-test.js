import { expect } from "chai";
import {ethers} from "hardhat";

describe("Soulbound", () => {
    let owner;

    beforeEach(async () => {
        [owner] = await ethers.getSigners();
        const Soulbound = await ethers.getContractFactory("QuizScore");
        const deployed_contract = await Soulbound.deploy();

        await deployed_contract.safeMint(owner.address);
    })


    it("check the owner is correct", async () => {
        // Check that owner address owns the token ID 0
        const value = await deployed_contract.ownerOf(1);
        expect(value).to.equal(owner.address);
    });
});