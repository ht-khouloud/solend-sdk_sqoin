import { Connection, Keypair, Transaction, LAMPORTS_PER_SOL, PublicKey, Account, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';
import BN from 'bn.js';
import * as anchor from '@project-serum/anchor';
import { initObligationInstruction, SolendAction, SolendMarket, SolendWallet } from "../src";
import { privateKey } from './account';
//Mainet
 let conUrl = "https://api.mainnet-beta.solana.com"
let environment: any = 'production'
let symble="FTT"
/*  let conUrl="https://api.devnet.solana.com";
let environment: any = 'devnet' 
 */

jest.setTimeout(100_000);

describe("calculate", function () {

 it("performs a  deposit Reserve Liquidity And Obligation Collateral", async function () {
  const connection = new Connection(conUrl, {
    commitment: "finalized",
  });

  const depositAmount = new BN("1000");
  const account = new Account(privateKey);

  const solendAction = await SolendAction.buildDepositTxns(
    connection,
    depositAmount,
    symble,
    account.publicKey,
   environment
  );

  const sendTransaction = async (txn: Transaction, connection: Connection) => {
    const { blockhash } = await connection.getRecentBlockhash();
    txn.recentBlockhash = blockhash;
    txn.feePayer = account.publicKey;
    txn.sign(account);
    return connection.sendRawTransaction(txn.serialize());
  }

  const txHash = await solendAction.sendTransactions(sendTransaction);

  await connection.confirmTransaction(txHash, 'finalized');

  const market = await SolendMarket.initialize(
    connection,
    environment
  );
console.log(txHash,'performs a  deposit Reserve Liquidity And Obligation Collateral')
  const obligation = await market.fetchObligationByWallet(account.publicKey);


}); 
/*
 it("performs a  Withdraw Obligation  Collateral", async function () { 
  const connection = new Connection(conUrl, {
    commitment: "finalized",
  });

  const depositAmount = new BN("100");
  const account = new Account(privateKey);
  const solendAction = await SolendAction.buildwithdrawObligationCollateralTxns(
    connection,
    depositAmount,
    symble,
    account.publicKey,
    environment,
    new PublicKey('So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo')
  );

  const sendTransaction = async (txn: Transaction, connection: Connection) => {
    const { blockhash } = await connection.getRecentBlockhash();
    txn.recentBlockhash = blockhash;
    txn.feePayer = account.publicKey;
    txn.sign(account);
    return connection.sendRawTransaction(txn.serialize());
  }

  const txHash = await solendAction.sendTransactions(sendTransaction);
console.log('txHash Withdraw Obligation  Collateral',txHash)
  await connection.confirmTransaction(txHash, 'finalized');

  const market = await SolendMarket.initialize(
    connection,
    environment
  );

  const obligation = await market.fetchObligationByWallet(account.publicKey);

  //   expect(obligation!.deposits[0].amount === depositAmount)
});  
it("performs a  Withdraw Obligation Collateral And Redeem Reserve Liquidity", async function () {
  const connection = new Connection(conUrl, {
    commitment: "finalized",
  });

  const depositAmount = new BN("100");
  const account = new Account(privateKey);
  const solendAction = await SolendAction.buildwithdrawObligationCollateralAndRedeemReserveLiquidityTxns(
    connection,
    depositAmount,
    symble,
    account.publicKey,
    environment,
    new PublicKey('So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo')
  );

  const sendTransaction = async (txn: Transaction, connection: Connection) => {
    const { blockhash } = await connection.getRecentBlockhash();
    txn.recentBlockhash = blockhash;
    txn.feePayer = account.publicKey;
    txn.sign(account);
    return connection.sendRawTransaction(txn.serialize());
  }

  const txHash = await solendAction.sendTransactions(sendTransaction);
console.log('txHash ',txHash)
  await connection.confirmTransaction(txHash, 'finalized');

  const market = await SolendMarket.initialize(
    connection,
    environment
  );

  const obligation = await market.fetchObligationByWallet(account.publicKey);

  //   expect(obligation!.deposits[0].amount === depositAmount)
}); 


 */
/* it("performs a brrow", async function () {
  const connection = new Connection(conUrl, {
    commitment: "finalized",
  });

  const depositAmount = new BN("100");
  const account = new Account(privateKey);
  const solendAction = await SolendAction.buildBorrowTxns(
    connection,
    depositAmount,
    symble,
    account.publicKey,
    environment
   
  );

  const sendTransaction = async (txn: Transaction, connection: Connection) => {
    const { blockhash } = await connection.getRecentBlockhash();
    txn.recentBlockhash = blockhash;
    txn.feePayer = account.publicKey;
    txn.sign(account);
    return connection.sendRawTransaction(txn.serialize());
  }

  const txHash = await solendAction.sendTransactions(sendTransaction);
  console.log('txHash buildBorrowTxns',txHash)
  await connection.confirmTransaction(txHash, 'finalized');


});  
it("performs a redeem reserve collateral", async function () {
  const connection = new Connection(conUrl, {
    commitment: "finalized",
  });

  const depositAmount = new BN("10");

  const account = new Account(privateKey);
  const solendAction = await SolendAction.buildRedeemReserveCollateralTxns(
    connection,
    depositAmount,
    symble,
    account.publicKey,
  environment
  );

  const sendTransaction = async (txn: Transaction, connection: Connection) => {
    const { blockhash } = await connection.getRecentBlockhash();
    txn.recentBlockhash = blockhash;
    txn.feePayer = account.publicKey;
    txn.sign(account);
    return connection.sendRawTransaction(txn.serialize());
  }

  const txHash = await solendAction.sendTransactions(sendTransaction);

  await connection.confirmTransaction(txHash, 'finalized');

  const market = await SolendMarket.initialize(
    connection,
  environment
  );


}); 

/* it("init obligation ",async function () {
  const connection = new Connection('https://api.devnet.solana.com', {
    commitment: "finalized",
  });
  const owner = new Account(privateKey);
       let lendingMarket = new PublicKey(
    'GvjoVKNjBvQcFaSKUW1gTE7DxhSpjHbE69umVR5nPuQp',
  )
  
  let obligationProgramID = new PublicKey(
    'ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx',
  )    let lendingMarket = new PublicKey(
    '4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY',
  )
  let obligationProgramID = new PublicKey("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo"); 

  let tx =await SolendAction.initTNX(connection,owner,lendingMarket,obligationProgramID)
  console.log("init obligation init obligation  ",tx)
}) */
});
