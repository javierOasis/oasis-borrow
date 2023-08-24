module.exports = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'borrowed',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'due',
        type: 'uint256',
      },
    ],
    name: 'FLData',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'methodName',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'cdpId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'swapMinAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'swapOptimistAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'collateralLeft',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'daiLeft',
        type: 'uint256',
      },
    ],
    name: 'MultipleActionCalled',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DAI',
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
    name: 'DAIJOIN',
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
        components: [
          {
            internalType: 'address',
            name: 'fromTokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'toTokenAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'fromTokenAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'toTokenAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minToTokenAmount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'exchangeAddress',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_exchangeCalldata',
            type: 'bytes',
          },
        ],
        internalType: 'struct ExchangeData',
        name: 'exchangeData',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'gemJoin',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'fundsReceiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'cdpId',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'ilk',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'requiredDebt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'token0Amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'methodName',
            type: 'string',
          },
        ],
        internalType: 'struct CdpData',
        name: 'cdpData',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'guni',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'router',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'resolver',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'guniProxyActions',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'otherToken',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'exchange',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'jug',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'manager',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'lender',
            type: 'address',
          },
        ],
        internalType: 'struct GuniAddressRegistry',
        name: 'guniAddressRegistry',
        type: 'tuple',
      },
    ],
    name: 'closeGuniVaultExitDai',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'daiContract',
    outputs: [
      {
        internalType: 'contract IERC20',
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
        internalType: 'contract IGUNIToken',
        name: 'guni',
        type: 'address',
      },
      {
        internalType: 'contract IGUNIResolver',
        name: 'resolver',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'bal0',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'otherTokenDecimals',
        type: 'uint256',
      },
    ],
    name: 'getOtherTokenAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'fromTokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'toTokenAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'fromTokenAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'toTokenAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minToTokenAmount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'exchangeAddress',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_exchangeCalldata',
            type: 'bytes',
          },
        ],
        internalType: 'struct ExchangeData',
        name: 'exchangeData',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'gemJoin',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'fundsReceiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'cdpId',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'ilk',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'requiredDebt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'token0Amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'methodName',
            type: 'string',
          },
        ],
        internalType: 'struct CdpData',
        name: 'cdpData',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'guni',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'router',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'resolver',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'guniProxyActions',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'otherToken',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'exchange',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'jug',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'manager',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'lender',
            type: 'address',
          },
        ],
        internalType: 'struct GuniAddressRegistry',
        name: 'guniAddressRegistry',
        type: 'tuple',
      },
    ],
    name: 'increaseMultipleGuni',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'initiator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
      },
    ],
    name: 'onFlashLoan',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'fromTokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'toTokenAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'fromTokenAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'toTokenAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minToTokenAmount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'exchangeAddress',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_exchangeCalldata',
            type: 'bytes',
          },
        ],
        internalType: 'struct ExchangeData',
        name: 'exchangeData',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'gemJoin',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'fundsReceiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'cdpId',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'ilk',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'requiredDebt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'token0Amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'methodName',
            type: 'string',
          },
        ],
        internalType: 'struct CdpData',
        name: 'cdpData',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'guni',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'router',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'resolver',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'guniProxyActions',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'otherToken',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'exchange',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'jug',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'manager',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'lender',
            type: 'address',
          },
        ],
        internalType: 'struct GuniAddressRegistry',
        name: 'guniAddressRegistry',
        type: 'tuple',
      },
    ],
    name: 'openMultiplyGuniVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
