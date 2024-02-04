const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();
    const signer0 = ethers.provider.getSigner(0);


    return { game, signer0 };  
  }
  it('should be a winner', async function () {
    const { game, signer0 } = await loadFixture(deployContractAndSetVariables);
    console.log(await signer0.getAddress())
    // nested mappings are rough :}
    await game.write(await signer0.getAddress())


    await game.win(await signer0.getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
