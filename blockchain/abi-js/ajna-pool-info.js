module.exports = [
  {
    inputs: [],
    name: 'BucketIndexOutOfBounds',
    type: 'error',
  },
  {
    inputs: [],
    name: 'BucketPriceOutOfBounds',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'x',
        type: 'int256',
      },
    ],
    name: 'PRBMathSD59x18__CeilOverflow',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PRBMathSD59x18__DivInputTooSmall',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'rAbs',
        type: 'uint256',
      },
    ],
    name: 'PRBMathSD59x18__DivOverflow',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'x',
        type: 'int256',
      },
    ],
    name: 'PRBMathSD59x18__Exp2InputTooBig',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'x',
        type: 'int256',
      },
    ],
    name: 'PRBMathSD59x18__FromIntOverflow',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'x',
        type: 'int256',
      },
    ],
    name: 'PRBMathSD59x18__FromIntUnderflow',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'x',
        type: 'int256',
      },
    ],
    name: 'PRBMathSD59x18__LogInputTooSmall',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PRBMathSD59x18__MulInputTooSmall',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'rAbs',
        type: 'uint256',
      },
    ],
    name: 'PRBMathSD59x18__MulOverflow',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'prod1',
        type: 'uint256',
      },
    ],
    name: 'PRBMath__MulDivFixedPointOverflow',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'prod1',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'denominator',
        type: 'uint256',
      },
    ],
    name: 'PRBMath__MulDivOverflow',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'borrower_',
        type: 'address',
      },
    ],
    name: 'auctionStatus',
    outputs: [
      {
        internalType: 'uint256',
        name: 'kickTime_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'collateral_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'debtToCover_',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isCollateralized_',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'price_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'neutralPrice_',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'availableQuoteTokenAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount_',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'borrowFeeRate',
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
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'borrower_',
        type: 'address',
      },
    ],
    name: 'borrowerInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'debt_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'collateral_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 't0Np_',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'index_',
        type: 'uint256',
      },
    ],
    name: 'bucketInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quoteTokens_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'collateral_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'bucketLP_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'scale_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'exchangeRate_',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'hpb',
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
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'hpbIndex',
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
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'htp',
    outputs: [
      {
        internalType: 'uint256',
        name: 'htp_',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index_',
        type: 'uint256',
      },
    ],
    name: 'indexToPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'lenderInterestMargin',
    outputs: [
      {
        internalType: 'uint256',
        name: 'lenderInterestMargin_',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'lp_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'index_',
        type: 'uint256',
      },
    ],
    name: 'lpToCollateral',
    outputs: [
      {
        internalType: 'uint256',
        name: 'collateralAmount_',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'lp_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'index_',
        type: 'uint256',
      },
    ],
    name: 'lpToQuoteTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: 'quoteAmount_',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'lup',
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
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'lupIndex',
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
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'momp',
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
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'poolLoansInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'poolSize_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'loansCount_',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'maxBorrower_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'pendingInflator_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'pendingInterestFactor_',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'poolPricesInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'hpb_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'hpbIndex_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'htp_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'htpIndex_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lup_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lupIndex_',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'poolReservesInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'reserves_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'claimableReserves_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'claimableReservesRemaining_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'auctionPrice_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'timeRemaining_',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'poolUtilizationInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'poolMinDebtAmount_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'poolCollateralization_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'poolActualUtilization_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'poolTargetUtilization_',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'price_',
        type: 'uint256',
      },
    ],
    name: 'priceToIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'ajnaPool_',
        type: 'address',
      },
    ],
    name: 'unutilizedDepositFeeRate',
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
]
