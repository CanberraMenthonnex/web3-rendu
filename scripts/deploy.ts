import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const quizContrat = await ethers.getContractFactory("QuizScore");
  const quiz = await quizContrat.deploy("0x54EBf55B11BA28bFB7c818D36fab5C9C3b575F1a");

  console.log("Quiz deployed to:", quiz.target);
  console.log("Quiz deployed to:", quiz.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
