const StarNotary = artifacts.require('StarNotary');

contract('StarNotary', accounts => { 

    beforeEach(async function() { 
        this.contract = await StarNotary.new({from: accounts[0]});
    });
    
    describe('can create a star', () => { 

        let user1 = accounts[0];
        let tokenId = 1;

        beforeEach(async function () { 
            await this.contract.createStar('Star power 103!', 'I love my wonderful star', 'dec_121.874', 'mag_245.978', 'ra_032.155', tokenId, {from: user1});   
        });

        it('can create a star and get its info', async function () {

            let star = await this.contract.tokenIdToStarInfo(tokenId);

            assert.equal(star[0], 'Star power 103!');
            assert.equal(star[1], 'I love my wonderful star');
            assert.equal(star[2], 'dec_121.874');
            assert.equal(star[3], 'mag_245.978');
            assert.equal(star[4], 'ra_032.155');
        });


        it('checking if star exists', async function () {

            let coor = web3.fromAscii( 'dec_121.874'+ 'mag_245.978'+ 'ra_032.155')
            assert.equal(await this.contract.checkIfStarExists(coor), true);
        });


        it('checking if star already mint and user1 is the owner of the tonken', async function() {
            assert.equal(await this.contract.ownerOf(tokenId), user1);
        });


    });


    

    describe('buying and selling stars', () => { 
        let user1 = accounts[1];
        let user2 = accounts[2];
        let randomMaliciousUser = accounts[3];
        
        let starId = 1;
        let starPrice = web3.toWei(.01, "ether");

        beforeEach(async function () { 
            await this.contract.createStar('Star power 103!', 'I love my wonderful star', 'dec_121.874', 'mag_245.978', 'ra_032.155', starId, {from: user1});   
        });

        it('user1 can put up their star for sale', async function () { 
            assert.equal(await this.contract.ownerOf(starId), user1);
            await this.contract.putStarUpForSale(starId, starPrice, {from: user1});
            
            assert.equal(await this.contract.starsForSale(starId), starPrice);
        });

        describe('user2 can buy a star that was put up for sale', () => { 
            beforeEach(async function () { 
                await this.contract.putStarUpForSale(starId, starPrice, {from: user1});
            });

            it('user2 is the owner of the star after they buy it', async function() { 
                await this.contract.buyStar(starId, {from: user2, value: starPrice, gasPrice: 0});
                assert.equal(await this.contract.ownerOf(starId), user2);
            });

            it('user2 ether balance changed correctly', async function () { 
                let overpaidAmount = web3.toWei(.05, 'ether');
                const balanceBeforeTransaction = web3.eth.getBalance(user2);
                await this.contract.buyStar(starId, {from: user2, value: overpaidAmount, gasPrice: 0});
                const balanceAfterTransaction = web3.eth.getBalance(user2);

                assert.equal(balanceBeforeTransaction.sub(balanceAfterTransaction), starPrice);
            });
        });
    });
    
    describe('owner can approve a token', () => { 
        let user1 = accounts[1];
        let user2 = accounts[2];
        let randomMaliciousUser = accounts[3];
        
        let starId = 1;
        let starPrice = web3.toWei(.01, "ether");

        beforeEach(async function () { 
            await this.contract.createStar('Star power 103!', 'I love my wonderful star', 'dec_121.874', 'mag_245.978', 'ra_032.155', starId, {from: user1});   
        });

        it('user1 can approve user2', async function () { 
            assert.equal(await this.contract.ownerOf(starId), user1);
            await this.contract.approve(user2, starId, {from: user1});
            assert.equal(await this.contract.getApproved(starId), user2);
        });


        it('user1 can approve user2 all his stars', async function () { 
            assert.equal(await this.contract.ownerOf(starId), user1);
            await this.contract.setApprovalForAll(user2, true, {from: user1})
            assert.equal(await this.contract.isApprovedForAll(user1, user2), true);
        });
        
    });
  
});