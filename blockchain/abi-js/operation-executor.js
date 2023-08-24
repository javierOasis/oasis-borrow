module.exports = [
  {
    inputs: [
      {
        internalType: 'contract ServiceRegistry',
        name: '_registry',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
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
        components: [
          {
            internalType: 'bytes32',
            name: 'targetHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
          {
            internalType: 'bool',
            name: 'skipped',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'Operation',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'targetHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
          {
            internalType: 'bool',
            name: 'skipped',
            type: 'bool',
          },
        ],
        internalType: 'struct Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'callbackAggregate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'targetHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
          {
            internalType: 'bool',
            name: 'skipped',
            type: 'bool',
          },
        ],
        internalType: 'struct Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
      {
        internalType: 'string',
        name: 'operationName',
        type: 'string',
      },
    ],
    name: 'executeOp',
    outputs: [],
    stateMutability: 'payable',
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
        name: 'asset',
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
        name: 'data',
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
    inputs: [],
    name: 'registry',
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
]
