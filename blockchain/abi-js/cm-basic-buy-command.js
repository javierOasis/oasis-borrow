module.exports = [
  {
    inputs: [
      {
        internalType: 'contract ServiceRegistry',
        name: '_serviceRegistry',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'CDP_MANAGER_KEY',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MCD_SPOT_KEY',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MCD_VAT_KEY',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MCD_VIEW_KEY',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MIN_ALLOWED_DEVIATION',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MPA_KEY',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'maxAcceptableBaseFeeInGwei',
        type: 'uint256',
      },
    ],
    name: 'baseFeeIsValid',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'triggerData',
        type: 'bytes',
      },
    ],
    name: 'decode',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'cdpId',
            type: 'uint256',
          },
          {
            internalType: 'uint16',
            name: 'triggerType',
            type: 'uint16',
          },
          {
            internalType: 'uint256',
            name: 'execCollRatio',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'targetCollRatio',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxBuyPrice',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'continuous',
            type: 'bool',
          },
          {
            internalType: 'uint64',
            name: 'deviation',
            type: 'uint64',
          },
          {
            internalType: 'uint32',
            name: 'maxBaseFeeInGwei',
            type: 'uint32',
          },
        ],
        internalType: 'struct CmBasicBuyCommand.BasicBuyTriggerData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'deviation',
        type: 'uint256',
      },
    ],
    name: 'deviationIsValid',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'executionData',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'cdpId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'triggerData',
        type: 'bytes',
      },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'cdpId',
        type: 'uint256',
      },
    ],
    name: 'getVaultAndMarketInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'collRatio',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'nextCollRatio',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'currPrice',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'nextPrice',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'ilk',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'cdpId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'triggerData',
        type: 'bytes',
      },
    ],
    name: 'isExecutionCorrect',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'cdpId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'triggerData',
        type: 'bytes',
      },
    ],
    name: 'isExecutionLegal',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_cdpId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'triggerData',
        type: 'bytes',
      },
    ],
    name: 'isTriggerDataValid',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'serviceRegistry',
    outputs: [
      {
        internalType: 'contract ServiceRegistry',
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
        internalType: 'bytes4',
        name: 'expectedSelector',
        type: 'bytes4',
      },
      {
        internalType: 'bytes',
        name: 'executionData',
        type: 'bytes',
      },
    ],
    name: 'validateSelector',
    outputs: [],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'triggerType',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'expectedTriggerType',
        type: 'uint16',
      },
    ],
    name: 'validateTriggerType',
    outputs: [],
    stateMutability: 'pure',
    type: 'function',
  },
]
