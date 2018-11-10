pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 { 

    struct Star {
        string name;
        string story;
        string dec;
        string mag;
        string cent;
        bool isExists;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo; 
    mapping(uint256 => uint256) public starsForSale;
    mapping(bytes32 => bool) public starTokens;

    function createStar(string _name, string _story, string _dec, string _mag, string _cent,  uint256 _tokenId) public { 
        //uniqueness star coordinations
        bytes32 starCoordinates = keccak256(abi.encodePacked(_dec, _mag, _cent));
        require(checkIfStarExists(starCoordinates), "A star coordinations is exists, it must be unique!");

        //add star
        Star memory newStar = Star(_name,_story,_dec,_mag,_cent,true);
        tokenIdToStarInfo[_tokenId] = newStar;
        starTokens[starCoordinates] = true;

        mint(msg.sender, _tokenId);
    }

    function checkIfStarExists(bytes32 starCoordinates) public view returns(bool) {
        return !starTokens[starCoordinates];
    }

    function mint(address _to, uint256 _tokenId) internal {
        ERC721._mint(_to, _tokenId);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender);

        starsForSale[_tokenId] = _price;
    }

    function starsForSale(uint256 _tokenId) public view returns(uint256) {
        return starsForSale[_tokenId];
    }


    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0);
        
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);
        
        starOwner.transfer(starCost);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }
    }


    function approve(address to, uint256 tokenId) public {
        ERC721.approve(to, tokenId);
    } 

    function safeTransferFrom(address from, address to, uint256 tokenId) public {
        ERC721.safeTransferFrom(from, to, tokenId);
    }

    function setApprovalForAll(address to, bool approved) public {
        ERC721.setApprovalForAll(to, approved);
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        return ERC721.getApproved(tokenId);
    }

    function isApprovedForAll(address owner, address operator) public view returns (bool) {
        return ERC721.isApprovedForAll(owner, operator); 
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        return ERC721.ownerOf(tokenId);
    }

    function tokenIdToStarInfo(uint256 _tokenId) public view returns (string, string, string, string, string) {
        Star memory star = tokenIdToStarInfo[_tokenId];
        
        require(star.isExists, "star does not exist!");
        return (star.name, star.story, star.dec, star.mag, star.cent);
    }

}