import { NetworkIds } from 'blockchain/networks'

export const allNetworksContracts = {
  [NetworkIds.MAINNET]: await import('./mainnet'),
  [NetworkIds.HARDHAT]: await import('./mainnet'),
  [NetworkIds.GOERLI]: await import('./goerli'),
  [NetworkIds.OPTIMISMMAINNET]: await import('./optimism'),
  // empty contracts config - to be filled
  [NetworkIds.ARBITRUMMAINNET]: await import('./arbitrum'),
  [NetworkIds.ARBITRUMGOERLI]: {},
  [NetworkIds.POLYGONMAINNET]: {},
  [NetworkIds.POLYGONMUMBAI]: {},
  [NetworkIds.OPTIMISMGOERLI]: {},
  [NetworkIds.EMPTYNET]: {},
}

export type AllNetworksContractsType = typeof allNetworksContracts
