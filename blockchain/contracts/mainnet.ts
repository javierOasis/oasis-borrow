import { ADDRESSES } from '@oasisdex/addresses'
import aaveV2LendingPool from 'blockchain/abi-js/aave-v2-lending-pool'
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
import { contractDesc } from 'blockchain/networks'
import {
  AAVE_V2_LENDING_POOL_GENESIS_MAINNET,
  AAVE_V3_POOL_GENESIS_MAINNET,
  ACCOUNT_GUARD_FACTORY_GENESIS_MAINNET,
  supportedIlks,
  tokensMainnet,
} from 'blockchain/tokens/mainnet'
import { etherscanAPIKey, mainnetCacheUrl } from 'config/runtimeConfig'

const { mainnet } = ADDRESSES

const mainnetContracts = {
  collaterals: getCollaterals(mainnet.common, supportedIlks),
  joins: {
    ...getCollateralJoinContracts(mainnet.maker.joins, supportedIlks),
  },
  mcdOsms: getOsms(mainnet.maker.pips, supportedIlks),
  tokens: tokensMainnet,
  tokensMainnet,
  otc: contractDesc(otc, mainnet.common.Otc),
  otcSupportMethods: contractDesc(otcSupport, mainnet.common.OtcSupportMethods),
  getCdps: contractDesc(getCdps, mainnet.maker.common.GetCdps),
  mcdJug: contractDesc(mcdJug, mainnet.maker.common.Jug),
  mcdPot: contractDesc(mcdPot, mainnet.maker.common.Pot),
  mcdEnd: contractDesc(mcdEnd, mainnet.maker.common.End),
  mcdSpot: contractDesc(mcdSpot, mainnet.maker.common.Spot),
  mcdDog: contractDesc(mcdDog, mainnet.maker.common.Dog),
  merkleRedeemer: contractDesc(merkleRedeemer, mainnet.common.MerkleRedeemer),
  dssCharter: contractDesc(dssCharter, mainnet.common.DssCharter),
  dssCdpManager: contractDesc(dssCdpManager, mainnet.maker.common.CdpManager),
  vat: contractDesc(vat, mainnet.maker.common.Vat),
  mcdJoinDai: contractDesc(mcdJoinDai, mainnet.maker.joins.MCD_JOIN_DAI),
  dsProxyRegistry: contractDesc(dsProxyRegistry, mainnet.mpa.core.DSProxyRegistry),
  dsProxyFactory: contractDesc(dsProxyFactory, mainnet.mpa.core.DSProxyFactory),
  dssProxyActions: contractDesc(dssProxyActions, mainnet.common.DssProxyActions),
  dssProxyActionsCharter: contractDesc(
    dssProxyActionsCharter,
    mainnet.common.DssProxyActionsCharter,
  ),
  automationBot: contractDesc(automationBot, mainnet.automation.AutomationBot),
  automationBotV2: contractDesc(automationBotV2, mainnet.automation.AutomationBotV2),
  automationBotAggregator: contractDesc(
    automationBotAggregator,
    mainnet.automation.AutomationBotAggregator,
  ),
  serviceRegistry: mainnet.common.ServiceRegistry,
  guniProxyActions: contractDesc(guniProxyActions, mainnet.common.GuniProxyActions),
  guniResolver: mainnet.common.GuniResolver,
  guniRouter: mainnet.common.GuniRouter,
  dssMultiplyProxyActions: contractDesc(
    dssMultiplyProxyActions,
    mainnet.common.DssMultiplyProxyActions,
  ),
  dssCropper: contractDesc(dssCropper, mainnet.common.DssCropper),
  cdpRegistry: contractDesc(cdpRegistry, mainnet.common.CdpRegistry),
  dssProxyActionsCropjoin: contractDesc(
    dssProxyActionsCropjoin,
    mainnet.common.DssProxyActionsCropjoin,
  ),
  dssProxyActionsDsr: contractDesc(dssProxyActionsDsr, mainnet.common.DssProxyActionsDsr),
  defaultExchange: contractDesc(exchange, mainnet.common.DefaultExchange),
  noFeesExchange: contractDesc(exchange, mainnet.common.NoFeesExchange),
  lowerFeesExchange: contractDesc(exchange, mainnet.common.LowerFeesExchange),
  fmm: mainnet.maker.common.FlashMintModule,
  lidoCrvLiquidityFarmingReward: contractDesc(
    lidoCrvLiquidityFarmingReward,
    mainnet.common.LidoCrvLiquidityFarmingReward,
  ),
  aaveTokens: {
    STETH: mainnet.common.STETH,
  } as Record<string, string>,
  aaveV2ProtocolDataProvider: contractDesc(
    aaveV2ProtocolDataProvider,
    mainnet.aave.v2.ProtocolDataProvider,
  ),
  aaveV2PriceOracle: contractDesc(aaveV2PriceOracle, mainnet.aave.v2.PriceOracle),
  chainlinkPriceOracle: {
    USDCUSD: contractDesc(chainLinkPriceOracle, mainnet.common.ChainlinkPriceOracle_USDCUSD),
    ETHUSD: contractDesc(chainLinkPriceOracle, mainnet.common.ChainlinkPriceOracle_ETHUSD),
  },
  aaveV2LendingPool: contractDesc(
    aaveV2LendingPool,
    mainnet.aave.v2.LendingPool,
    AAVE_V2_LENDING_POOL_GENESIS_MAINNET,
  ),
  operationExecutor: contractDesc(operationExecutor, mainnet.mpa.core.OperationExecutor),
  swapAddress: mainnet.mpa.core.Swap,
  accountFactory: contractDesc(
    accountFactory,
    mainnet.mpa.core.AccountFactory,
    ACCOUNT_GUARD_FACTORY_GENESIS_MAINNET,
  ),
  accountGuard: contractDesc(
    accountGuard,
    mainnet.mpa.core.AccountGuard,
    ACCOUNT_GUARD_FACTORY_GENESIS_MAINNET,
  ),
  aaveV3Pool: contractDesc(aaveV3Pool, mainnet.aave.v3.Pool, AAVE_V3_POOL_GENESIS_MAINNET),
  aaveV3Oracle: contractDesc(aaveV3Oracle, mainnet.aave.v3.AaveOracle),
  aaveV3PoolDataProvider: contractDesc(
    aaveV3PoolDataProvider,
    mainnet.aave.v3.AavePoolDataProvider,
  ),
  // TODO ajna addresses to be updated
  ajnaPoolInfo: contractDesc(ajnaPoolInfo, mainnet.ajna.AjnaPoolInfo),
  ajnaProxyActions: contractDesc(ajnaProxyActions, mainnet.ajna.AjnaProxyActions),
  ajnaPoolPairs: {
    'CBETH-ETH': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_CBETHETH),
    'CBETH-GHO': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_CBETHGHO),
    'ETH-DAI': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_ETHDAI),
    'ETH-GHO': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_ETHGHO),
    'ETH-USDC': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_ETHUSDC),
    'GHO-DAI': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_GHODAI),
    'RETH-DAI': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_RETHDAI),
    'RETH-ETH': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_RETHETH),
    'RETH-GHO': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_RETHGHO),
    'RETH-USDC': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_RETHUSDC),
    'SDAI-USDC': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_SDAIUSDC),
    'TBTC-USDC': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_TBTCUSDC),
    'TBTC-WBTC': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_TBTCWBTC),
    'USDC-ETH': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_USDCETH),
    'USDC-WBTC': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_USDCWBTC),
    'USDC-WLD': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_USDCWLD),
    'WBTC-DAI': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_WBTCDAI),
    'WBTC-GHO': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_WBTCGHO),
    'WBTC-USDC': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_WBTCUSDC),
    'WLD-USDC': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_WLDUSDC),
    'WSTETH-DAI': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_WSTETHDAI),
    'WSTETH-ETH': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_WSTETHETH),
    'WSTETH-GHO': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_WSTETHGHO),
    'WSTETH-USDC': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_WSTETHUSDC),
    'YFI-DAI': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_YFIDAI),
  },
  ajnaOraclessPoolPairs: {
    'YIELDBTC-WBTC': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_YIELDBTCWBTC),
    'YIELDETH-ETH': contractDesc(ajnaPool, mainnet.ajna.AjnaPoolPairs_YIELDETHETH),
  },
  ajnaRewardsManager: contractDesc(ajnaRewardsManager, mainnet.ajna.AjnaRewardsManager),
  // TODO update address
  ajnaRewardsClaimer: contractDesc(ajnaRewardsClaimer, mainnet.ajna.AjnaRewardsClaimer),
  ajnaERC20PoolFactory: contractDesc(ajnaERC20PoolFactory, mainnet.ajna.ERC20PoolFactory),
  // not contracts
  cacheApi: mainnetCacheUrl,
  safeConfirmations: 10,
  openVaultSafeConfirmations: 6,
  taxProxyRegistries: [],
  etherscan: {
    url: 'https://etherscan.io',
    apiUrl: 'https://api.etherscan.io/api',
    apiKey: etherscanAPIKey || '',
  },
  ethtx: {
    url: 'https://ethtx.info/mainnet',
  },
  magicLink: {
    apiKey: '',
  },
  SdaiOracle: contractDesc(ajnaPoolInfo, mainnet.common.SdaiOracle),
}

export type MainnetContracts = typeof mainnetContracts
export default mainnetContracts
