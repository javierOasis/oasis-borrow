module.exports = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'vat_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'charter_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'cdpRegistry_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'cdpRegistry',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'charter',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'daiJoin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'u',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'wad',
        type: 'uint256',
      },
    ],
    name: 'daiJoin_join',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'jug',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'daiJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'wad',
        type: 'uint256',
      },
    ],
    name: 'draw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ethJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'wad',
        type: 'uint256',
      },
    ],
    name: 'exitETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'gemJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256',
      },
    ],
    name: 'exitGem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ethJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'wad',
        type: 'uint256',
      },
    ],
    name: 'freeETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'gemJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256',
      },
    ],
    name: 'freeGem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'obj',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'usr',
        type: 'address',
      },
    ],
    name: 'hope',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ethJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
    ],
    name: 'lockETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'jug',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'ethJoin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'daiJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'wadD',
        type: 'uint256',
      },
    ],
    name: 'lockETHAndDraw',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'gemJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256',
      },
    ],
    name: 'lockGem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'jug',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'gemJoin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'daiJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amtC',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'wadD',
        type: 'uint256',
      },
    ],
    name: 'lockGemAndDraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'obj',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'usr',
        type: 'address',
      },
    ],
    name: 'nope',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'ilk',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'usr',
        type: 'address',
      },
    ],
    name: 'open',
    outputs: [
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'jug',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'ethJoin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'daiJoin',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'ilk',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'wadD',
        type: 'uint256',
      },
    ],
    name: 'openLockETHAndDraw',
    outputs: [
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'jug',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'gemJoin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'daiJoin',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'ilk',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'amtC',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'wadD',
        type: 'uint256',
      },
    ],
    name: 'openLockGemAndDraw',
    outputs: [
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'dst',
        type: 'address',
      },
    ],
    name: 'quit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'srcCdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'dstCdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'wad',
        type: 'uint256',
      },
    ],
    name: 'roll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'gem',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'dst',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'vat',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'daiJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'wad',
        type: 'uint256',
      },
    ],
    name: 'wipe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'daiJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
    ],
    name: 'wipeAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ethJoin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'daiJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'wadC',
        type: 'uint256',
      },
    ],
    name: 'wipeAllAndFreeETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'gemJoin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'daiJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amtC',
        type: 'uint256',
      },
    ],
    name: 'wipeAllAndFreeGem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ethJoin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'daiJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'wadC',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'wadD',
        type: 'uint256',
      },
    ],
    name: 'wipeAndFreeETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'gemJoin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'daiJoin',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'cdp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amtC',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'wadD',
        type: 'uint256',
      },
    ],
    name: 'wipeAndFreeGem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
