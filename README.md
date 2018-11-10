# Star Notary DApp on Rinkeby


The aim of this project is to create a star notary DApp that runs on the Ethereum Rinkeby Testnet. StarNotary smart contract written in a Solidity language and based on the open-zeppelin implementation of the ERC721 tokens.


## Installation

- NPM required to initialize project and create package.json to store project dependencies.
```
npm init
```
- Install web3
```
npm install --save web3
```
- Install open-zepplin
```
npm install openzeppelin-solidity
```
- Install truffle
```
npm install -g truffle
```
- Install truffle-hdwallet-provider
```
npm install --save truffle-hdwallet-provider
```
- Install http-server
```
npm install -g http-server
```



## Test Smart Contract 
```
truffle test test/StarNotaryTest.js
```

- output

```
Using network 'test'.



  Contract: StarNotary
    can create a star
      ✓ can create a star and get its info (48ms)
      ✓ checking if star exists
      ✓ checking if star already mint and user1 is the owner of the tonken
    buying and selling stars
      ✓ user1 can put up their star for sale (47ms)
      user2 can buy a star that was put up for sale
        ✓ user2 is the owner of the star after they buy it (44ms)
        ✓ user2 ether balance changed correctly (1088ms)
    owner can approve a token
      ✓ user1 can approve user2 (43ms)
      ✓ user1 can approve user2 all his stars (47ms)


  8 passing (2s)


```

## Deploy Smart Contract in Rinkeby
```
truffle migrate --reset --network rinkeby
```

- output

```
Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0x9ae9e147b37e1ee8e2737d27437c4eca1f38b3616803ea3b56f1b58cf936c772
  Migrations: 0xedc84e76f649551674e762529f1fb8f7c9fdbe33
Saving successful migration to network...
  ... 0x0fc9edf686bf51e0aeb6672133f26949983f29eec8f37b8fb2c61af3af8a06cf
Saving artifacts...
Running migration: 2_star_migration.js
  Replacing StarNotary...
  ... 0x2b2c12d028d5d52cdf108515d25f53606109c5cd6aa975bbd48af40b76fa02c9
  StarNotary: 0xd9c64a2b4189ea25ab172a04b4c32009682ec5c7
Saving successful migration to network...
  ... 0x8764b325f418d5bb84af12d37442d3c515cf71cddfba9418ef4505b6176d782f
Saving artifacts...

```

## Contract Info in Rinkeby


***Contract Address***
```
0xd9c64A2b4189Ea25ab172A04b4C32009682eC5C7
```

***TXHash***
```
0x2b2c12d028d5d52cdf108515d25f53606109c5cd6aa975bbd48af40b76fa02c9
```

***Claim a Star TXHash***
```
0x4df49fbcb524b0e84089c6f7435e7d19ec6f7eee30de4b6d1ff405db304a4117
```
