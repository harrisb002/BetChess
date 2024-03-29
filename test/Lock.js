//loadFixture: Takes another function it can call so we can use the cached state of the contract
//Results in not having to redeploy the contract for every test case
const {
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("ChessAccount", function () {
    async function deployChessAccount() {
      // Contracts are deployed using the first signer/account by default
      // Can get the different accounts to use to sign tx's
      const [addr0, addr1, addr2, addr3, addr4] = await ethers.getSigners();
  
      //Automatically gets ChessAccount from the contract directory defined in folder
      const ChessAccount = await ethers.getContractFactory("ChessAccount");
  
      //Once deployed, return the ChessAccount instance
      const chessAccount = await ChessAccount.deploy();
  
      // All the addresses that can be used to connect to instance and smart contract
      return { chessAccount, addr0};
    }
  
    /*
    IMPORTANT NOTES: 
    - Each contract is fresh and thus the tests state is independent of one another
    - Block tests using the subheaders through describes
  */
    // - Make sure the contract can deploy successfully
    describe("Deployment", () => {
      it("Should deploy without error", async () => {
        await loadFixture(deployChessAccount); //Will call if not called before or just return the cached addresses
      });
    });
    /*
    Can fail valid owners, or owner laready has multiple accounts
    Will test all these cases in this describe block
    WIll be used to test:
     1) CAN create an account with 1 owner
     2) CANNOT create account with duplicate owners
     3) CANNOT create account with more than 1 owner (For now ;p)
  */
     describe("Creating an account", function () {
      it("Should allow creating a single user account", async function () {
          const { chessAccount, addr0 } = await loadFixture(deployChessAccount);
          // pass the address of addr0 when creating a new account.
          await chessAccount.connect(addr0).createAccount(addr0.address);
          const accounts = await chessAccount.getAccounts();
          expect(accounts.length).to.equal(1);
          // verify the owner of the created account is addr0
          expect(accounts[0].owner).to.equal(addr0.address);
      });
  });
});