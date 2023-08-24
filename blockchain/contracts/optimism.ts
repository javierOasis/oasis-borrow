import { ADDRESSES } from '@oasisdex/addresses'
import aaveV2PriceOracle from 'blockchain/abi-js/aave-v2-price-oracle'
import aaveV2ProtocolDataProvider from 'blockchain/abi-js/aave-v2-protocol-data-provider'
import aaveV3Oracle from 'blockchain/abi-js/aave-v3-oracle'
import aaveV3Pool from 'blockchain/abi-js/aave-v3-pool'
import aaveV3PoolDataProvider from 'blockchain/abi-js/aave-v3-pool-data-provider'
import accountFactory from 'blockchain/abi-js/account-factory'
import accountGuard from 'blockchain/abi-js/account-guard'
import ajnaERC20PoolFactory from 'blockchain/abi-js/ajna-erc20-pool-factory'
import ajnaPool from 'blockchain/abi-js/ajna-pool'
import ajnaPoolInfo from 'blockchain/abi-js/ajna-pool-info'
import ajnaProxyActions from 'blockchain/abi-js/ajna-proxy-actions'
import ajnaRewardsClaimer from 'blockchain/abi-js/ajna-rewards-claimer'
import ajnaRewardsManager from 'blockchain/abi-js/ajna-rewards-manager'
import automationBot from 'blockchain/abi-js/automation-bot'
import automationBotAggregator from 'blockchain/abi-js/automation-bot-aggregator'
import automationBotV2 from 'blockchain/abi-js/automation-bot-v2'
import cdpRegistry from 'blockchain/abi-js/cdp-registry'
import chainLinkPriceOracle from 'blockchain/abi-js/chainlink-price-oracle'
import dsProxyFactory from 'blockchain/abi-js/ds-proxy-factory'
import dsProxyRegistry from 'blockchain/abi-js/ds-proxy-registry'
import dssCdpManager from 'blockchain/abi-js/dss-cdp-manager'
import dssCharter from 'blockchain/abi-js/dss-charter'
import dssCropper from 'blockchain/abi-js/dss-cropper'
import guniProxyActions from 'blockchain/abi-js/dss-guni-proxy-actions'
import dssProxyActions from 'blockchain/abi-js/dss-proxy-actions'
import dssProxyActionsCharter from 'blockchain/abi-js/dss-proxy-actions-charter'
import dssProxyActionsCropjoin from 'blockchain/abi-js/dss-proxy-actions-cropjoin'
import dssProxyActionsDsr from 'blockchain/abi-js/dss-proxy-actions-dsr'
import exchange from 'blockchain/abi-js/exchange'
import gasPriceOracle from 'blockchain/abi-js/gas-price-oracle'
import getCdps from 'blockchain/abi-js/get-cdps'
import lidoCrvLiquidityFarmingReward from 'blockchain/abi-js/lido-crv-liquidity-farming-reward'
import otc from 'blockchain/abi-js/matching-market'
import mcdDog from 'blockchain/abi-js/mcd-dog'
import mcdEnd from 'blockchain/abi-js/mcd-end'
import mcdJoinDai from 'blockchain/abi-js/mcd-join-dai'
import mcdJug from 'blockchain/abi-js/mcd-jug'
import mcdPot from 'blockchain/abi-js/mcd-pot'
import mcdSpot from 'blockchain/abi-js/mcd-spot'
import merkleRedeemer from 'blockchain/abi-js/merkle-redeemer'
import dssMultiplyProxyActions from 'blockchain/abi-js/multiply-proxy-actions'
import operationExecutor from 'blockchain/abi-js/operation-executor'
import otcSupport from 'blockchain/abi-js/otc-support-methods'
import vat from 'blockchain/abi-js/vat'
import {
  getCollateralJoinContracts,
  getCollaterals,
  getOsms,
} from 'blockchain/addresses/addressesUtils'
import { contractDesc, emptyContractDesc } from 'blockchain/networks'
import { supportedIlks } from 'blockchain/tokens/mainnet'
import {
  AAVE_V3_POOL_GENESIS_OPTIMISM_MAINNET,
  ACCOUNT_FACTORY_GENESIS_OPTIMISM_MAINNET,
  ACCOUNT_GUARD_GENESIS_OPTIMISM_MAINNET,
} from 'blockchain/tokens/optimism'
import { tokensOptimism } from 'blockchain/tokens/optimism'
import { etherscanAPIKey } from 'config/runtimeConfig'
import { ContractDesc } from 'features/web3Context'

import type { MainnetContracts } from './mainnet'
import mainnetContracts from './mainnet'

const { optimism } = ADDRESSES

type OptimismContracts = MainnetContracts & {
  gasPriceOracle: ContractDesc
}

export const optimismContracts: OptimismContracts = {
  otc: contractDesc(otc, optimism.common.Otc),
  collaterals: getCollaterals(optimism.common, supportedIlks),
  tokens: tokensOptimism,
  tokensMainnet: mainnetContracts.tokensMainnet,
  joins: {
    ...getCollateralJoinContracts(
      optimism.maker.joins,
      supportedIlks.filter(
        // these are not supported on goerli
        (ilk) =>
          !['CRVV1ETHSTETH-A', 'GUNIV3DAIUSDC1-A', 'GUNIV3DAIUSDC2-A', 'GNO-A'].includes(ilk),
      ),
    ),
  },
  getCdps: contractDesc(getCdps, optimism.maker.common.GetCdps),
  mcdOsms: getOsms(optimism.maker.pips, supportedIlks),
  mcdJug: contractDesc(mcdJug, optimism.maker.common.Jug),
  mcdPot: contractDesc(mcdPot, optimism.maker.common.Pot),
  mcdEnd: contractDesc(mcdEnd, optimism.maker.common.End),
  mcdSpot: contractDesc(mcdSpot, optimism.maker.common.Spot),
  mcdDog: contractDesc(mcdDog, optimism.maker.common.Dog),
  mcdJoinDai: contractDesc(mcdJoinDai, optimism.maker.joins.MCD_JOIN_DAI),

  merkleRedeemer: contractDesc(merkleRedeemer, optimism.common.MerkleRedeemer),
  dssCharter: contractDesc(dssCharter, optimism.common.DssCharter),
  dssCdpManager: contractDesc(dssCdpManager, optimism.maker.common.CdpManager),
  otcSupportMethods: contractDesc(otcSupport, optimism.common.OtcSupportMethods),
  vat: contractDesc(vat, optimism.maker.common.Vat),
  dsProxyRegistry: contractDesc(dsProxyRegistry, optimism.mpa.core.DSProxyRegistry),
  dsProxyFactory: contractDesc(dsProxyFactory, optimism.mpa.core.DSProxyFactory),
  dssProxyActions: contractDesc(dssProxyActions, optimism.common.DssProxyActions),
  dssProxyActionsCharter: contractDesc(
    dssProxyActionsCharter,
    optimism.common.DssProxyActionsCharter,
  ),
  cdpRegistry: contractDesc(cdpRegistry, optimism.common.CdpRegistry),
  dssProxyActionsCropjoin: contractDesc(
    dssProxyActionsCropjoin,
    optimism.common.DssProxyActionsCropjoin,
  ),
  dssMultiplyProxyActions: contractDesc(
    dssMultiplyProxyActions,
    optimism.common.DssMultiplyProxyActions,
  ),
  guniProxyActions: contractDesc(guniProxyActions, optimism.common.GuniProxyActions), // TODO: add address
  dssCropper: contractDesc(dssCropper, optimism.common.DssCropper),
  guniResolver: optimism.common.GuniResolver,
  guniRouter: optimism.common.GuniRouter,

  automationBot: contractDesc(automationBot, optimism.automation.AutomationBot),
  automationBotV2: contractDesc(automationBotV2, optimism.automation.AutomationBotV2),
  automationBotAggregator: contractDesc(
    automationBotAggregator,
    optimism.automation.AutomationBotAggregator,
  ),

  serviceRegistry: optimism.common.ServiceRegistry,
  defaultExchange: contractDesc(exchange, optimism.common.DefaultExchange),
  noFeesExchange: contractDesc(exchange, optimism.common.NoFeesExchange),
  lowerFeesExchange: contractDesc(exchange, optimism.common.LowerFeesExchange),
  // Currently this is not supported on Goerli - no deployed contract
  fmm: optimism.maker.common.FlashMintModule,
  dssProxyActionsDsr: contractDesc(dssProxyActionsDsr, optimism.common.DssProxyActionsDsr),
  lidoCrvLiquidityFarmingReward: contractDesc(
    lidoCrvLiquidityFarmingReward,
    optimism.common.LidoCrvLiquidityFarmingReward,
  ),
  aaveTokens: {},
  aaveV2ProtocolDataProvider: contractDesc(
    aaveV2ProtocolDataProvider,
    optimism.aave.v2.ProtocolDataProvider,
  ),
  aaveV2PriceOracle: contractDesc(aaveV2PriceOracle, optimism.aave.v2.PriceOracle),
  chainlinkPriceOracle: {
    USDCUSD: contractDesc(chainLinkPriceOracle, optimism.common.ChainlinkPriceOracle_USDCUSD),
    ETHUSD: contractDesc(chainLinkPriceOracle, optimism.common.ChainlinkPriceOracle_ETHUSD),
  },
  aaveV2LendingPool: emptyContractDesc('aaveV2LendingPool'),

  operationExecutor: contractDesc(operationExecutor, optimism.mpa.core.OperationExecutor),
  swapAddress: optimism.mpa.core.Swap,
  accountFactory: contractDesc(
    accountFactory,
    optimism.mpa.core.AccountFactory,
    ACCOUNT_FACTORY_GENESIS_OPTIMISM_MAINNET,
  ),
  accountGuard: contractDesc(
    accountGuard,
    optimism.mpa.core.AccountGuard,
    ACCOUNT_GUARD_GENESIS_OPTIMISM_MAINNET,
  ),
  aaveV3Pool: contractDesc(
    aaveV3Pool,
    optimism.aave.v3.Pool,
    AAVE_V3_POOL_GENESIS_OPTIMISM_MAINNET,
  ),
  aaveV3Oracle: contractDesc(aaveV3Oracle, optimism.aave.v3.AaveOracle),
  aaveV3PoolDataProvider: contractDesc(
    aaveV3PoolDataProvider,
    optimism.aave.v3.AavePoolDataProvider,
  ),
  ajnaPoolInfo: contractDesc(ajnaPoolInfo, optimism.ajna.AjnaPoolInfo),
  ajnaProxyActions: contractDesc(ajnaProxyActions, optimism.ajna.AjnaProxyActions),
  ajnaPoolPairs: {
    'CBETH-ETH': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_CBETHETH),
    'CBETH-GHO': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_CBETHGHO),
    'ETH-DAI': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_ETHDAI),
    'ETH-GHO': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_ETHGHO),
    'ETH-USDC': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_ETHUSDC),
    'GHO-DAI': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_GHODAI),
    'RETH-DAI': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_RETHDAI),
    'RETH-ETH': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_RETHETH),
    'RETH-GHO': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_RETHGHO),
    'RETH-USDC': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_RETHUSDC),
    'SDAI-USDC': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_SDAIUSDC),
    'TBTC-USDC': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_TBTCUSDC),
    'TBTC-WBTC': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_TBTCWBTC),
    'USDC-ETH': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_USDCETH),
    'USDC-WBTC': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_USDCWBTC),
    'USDC-WLD': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_USDCWLD),
    'WBTC-DAI': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_WBTCDAI),
    'WBTC-GHO': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_WBTCGHO),
    'WBTC-USDC': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_WBTCUSDC),
    'WLD-USDC': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_WLDUSDC),
    'WSTETH-DAI': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_WSTETHDAI),
    'WSTETH-ETH': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_WSTETHETH),
    'WSTETH-GHO': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_WSTETHGHO),
    'WSTETH-USDC': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_WSTETHUSDC),
    'YFI-DAI': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_YFIDAI),
  },
  ajnaOraclessPoolPairs: {
    'YIELDBTC-WBTC': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_YIELDBTCWBTC),
    'YIELDETH-ETH': contractDesc(ajnaPool, optimism.ajna.AjnaPoolPairs_YIELDETHETH),
  },
  ajnaRewardsManager: contractDesc(ajnaRewardsManager, optimism.ajna.AjnaRewardsManager),
  // TODO update address
  ajnaRewardsClaimer: contractDesc(ajnaRewardsClaimer, optimism.ajna.AjnaRewardsClaimer),
  ajnaERC20PoolFactory: contractDesc(ajnaERC20PoolFactory, optimism.ajna.ERC20PoolFactory),
  // NOT contracts
  cacheApi: 'not-implemented',
  safeConfirmations: 6,
  openVaultSafeConfirmations: 6,
  taxProxyRegistries: [],
  etherscan: {
    url: 'https://optimistic.etherscan.io/',
    apiUrl: 'https://api-optimistic.etherscan.io/api',
    apiKey: etherscanAPIKey || '',
  },
  ethtx: {
    url: '',
  },
  magicLink: {
    apiKey: '',
  },
  gasPriceOracle: contractDesc(gasPriceOracle, '0x420000000000000000000000000000000000000F'),
  SdaiOracle: contractDesc(ajnaPoolInfo, optimism.common.SdaiOracle),
}
