module.exports = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'returned',
        type: 'bytes',
      },
    ],
    name: 'Action',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'proxyAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'protocol',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'positionType',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'collateralToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'debtToken',
        type: 'address',
      },
    ],
    name: 'CreatePosition',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
      {
        internalType: 'uint8[]',
        name: '',
        type: 'uint8[]',
      },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_callData',
        type: 'bytes',
      },
    ],
    name: 'parseInputs',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'protocol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'positionType',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'collateralToken',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'debtToken',
            type: 'address',
          },
        ],
        internalType: 'struct PositionCreatedData',
        name: 'params',
        type: 'tuple',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
]
