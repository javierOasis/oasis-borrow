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
  AAVE_V2_LENDING_POOL_GENESIS_GOERLI,
  AAVE_V3_POOL_GENESIS_GOERLI,
  ACCOUNT_GUARD_FACTORY_GENESIS_GOERLI,
  tokensGoerli,
} from 'blockchain/tokens/goerli'
import { supportedIlks } from 'blockchain/tokens/mainnet'
import { etherscanAPIKey } from 'config/runtimeConfig'

import type { MainnetContracts } from './mainnet'
import mainnetContracts from './mainnet'

const { goerli } = ADDRESSES

export const goerliContracts: MainnetContracts = {
  otc: contractDesc(otc, goerli.common.Otc),
  collaterals: getCollaterals(goerli.common, supportedIlks),
  tokens: tokensGoerli,
  tokensMainnet: mainnetContracts.tokensMainnet,
  joins: {
    ...getCollateralJoinContracts(
      goerli.maker.joins,
      supportedIlks.filter(
        // these are not supported on goerli
        (ilk) =>
          !['CRVV1ETHSTETH-A', 'GUNIV3DAIUSDC1-A', 'GUNIV3DAIUSDC2-A', 'GNO-A'].includes(ilk),
      ),
    ),
  },
  getCdps: contractDesc(getCdps, goerli.maker.common.GetCdps),
  mcdOsms: getOsms(goerli.maker.pips, supportedIlks),
  mcdJug: contractDesc(mcdJug, goerli.maker.common.Jug),
  mcdPot: contractDesc(mcdPot, goerli.maker.common.Pot),
  mcdEnd: contractDesc(mcdEnd, goerli.maker.common.End),
  mcdSpot: contractDesc(mcdSpot, goerli.maker.common.Spot),
  mcdDog: contractDesc(mcdDog, goerli.maker.common.Dog),
  mcdJoinDai: contractDesc(mcdJoinDai, goerli.maker.joins.MCD_JOIN_DAI),

  merkleRedeemer: contractDesc(merkleRedeemer, goerli.common.MerkleRedeemer),
  dssCharter: contractDesc(dssCharter, goerli.common.DssCharter),
  dssCdpManager: contractDesc(dssCdpManager, goerli.maker.common.CdpManager),
  otcSupportMethods: contractDesc(otcSupport, goerli.common.OtcSupportMethods),
  vat: contractDesc(vat, goerli.maker.common.Vat),
  dsProxyRegistry: contractDesc(dsProxyRegistry, goerli.mpa.core.DSProxyRegistry),
  dsProxyFactory: contractDesc(dsProxyFactory, goerli.mpa.core.DSProxyFactory),
  dssProxyActions: contractDesc(dssProxyActions, goerli.common.DssProxyActions),
  dssProxyActionsCharter: contractDesc(
    dssProxyActionsCharter,
    goerli.common.DssProxyActionsCharter,
  ),
  cdpRegistry: contractDesc(cdpRegistry, goerli.common.CdpRegistry),
  dssProxyActionsCropjoin: contractDesc(
    dssProxyActionsCropjoin,
    goerli.common.DssProxyActionsCropjoin,
  ),
  dssMultiplyProxyActions: contractDesc(
    dssMultiplyProxyActions,
    goerli.common.DssMultiplyProxyActions,
  ),
  guniProxyActions: contractDesc(guniProxyActions, goerli.common.GuniProxyActions), // TODO: add address
  dssCropper: contractDesc(dssCropper, goerli.common.DssCropper),
  guniResolver: goerli.common.GuniResolver,
  guniRouter: goerli.common.GuniRouter,

  automationBot: contractDesc(automationBot, goerli.automation.AutomationBot),
  automationBotV2: contractDesc(automationBotV2, goerli.automation.AutomationBotV2),
  automationBotAggregator: contractDesc(
    automationBotAggregator,
    goerli.automation.AutomationBotAggregator,
  ),

  serviceRegistry: goerli.common.ServiceRegistry,
  defaultExchange: contractDesc(exchange, goerli.common.DefaultExchange),
  noFeesExchange: contractDesc(exchange, goerli.common.NoFeesExchange),
  lowerFeesExchange: contractDesc(exchange, goerli.common.LowerFeesExchange),
  // Currently this is not supported on Goerli - no deployed contract
  fmm: goerli.maker.common.FlashMintModule,
  dssProxyActionsDsr: contractDesc(dssProxyActionsDsr, goerli.common.DssProxyActionsDsr),
  lidoCrvLiquidityFarmingReward: contractDesc(
    lidoCrvLiquidityFarmingReward,
    goerli.common.LidoCrvLiquidityFarmingReward,
  ),
  aaveTokens: {},
  aaveV2ProtocolDataProvider: contractDesc(
    aaveV2ProtocolDataProvider,
    goerli.aave.v2.ProtocolDataProvider,
  ),
  aaveV2PriceOracle: contractDesc(aaveV2PriceOracle, goerli.aave.v2.PriceOracle),
  chainlinkPriceOracle: {
    USDCUSD: contractDesc(chainLinkPriceOracle, goerli.common.ChainlinkPriceOracle_USDCUSD),
    ETHUSD: contractDesc(chainLinkPriceOracle, goerli.common.ChainlinkPriceOracle_ETHUSD),
  },
  aaveV2LendingPool: contractDesc(
    aaveV2LendingPool,
    goerli.aave.v2.LendingPool,
    AAVE_V2_LENDING_POOL_GENESIS_GOERLI,
  ),

  operationExecutor: contractDesc(operationExecutor, goerli.mpa.core.OperationExecutor),
  swapAddress: goerli.mpa.core.Swap,
  accountFactory: contractDesc(
    accountFactory,
    goerli.mpa.core.AccountFactory,
    ACCOUNT_GUARD_FACTORY_GENESIS_GOERLI,
  ),
  accountGuard: contractDesc(
    accountGuard,
    goerli.mpa.core.AccountGuard,
    ACCOUNT_GUARD_FACTORY_GENESIS_GOERLI,
  ),
  aaveV3Pool: contractDesc(aaveV3Pool, goerli.aave.v3.Pool, AAVE_V3_POOL_GENESIS_GOERLI),
  aaveV3Oracle: contractDesc(aaveV3Oracle, goerli.aave.v3.AaveOracle),
  aaveV3PoolDataProvider: contractDesc(aaveV3PoolDataProvider, goerli.aave.v3.AavePoolDataProvider),
  ajnaPoolInfo: contractDesc(ajnaPoolInfo, goerli.ajna.AjnaPoolInfo),
  ajnaProxyActions: contractDesc(ajnaProxyActions, goerli.ajna.AjnaProxyActions),
  ajnaPoolPairs: {
    'CBETH-ETH': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_CBETHETH),
    'CBETH-GHO': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_CBETHGHO),
    'ETH-DAI': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_ETHDAI),
    'ETH-GHO': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_ETHGHO),
    'ETH-USDC': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_ETHUSDC),
    'GHO-DAI': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_GHODAI),
    'RETH-DAI': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_RETHDAI),
    'RETH-ETH': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_RETHETH),
    'RETH-GHO': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_RETHGHO),
    'RETH-USDC': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_RETHUSDC),
    'SDAI-USDC': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_SDAIUSDC),
    'TBTC-USDC': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_TBTCUSDC),
    'TBTC-WBTC': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_TBTCWBTC),
    'USDC-ETH': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_USDCETH),
    'USDC-WBTC': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_USDCWBTC),
    'USDC-WLD': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_USDCWLD),
    'WBTC-DAI': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_WBTCDAI),
    'WBTC-GHO': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_WBTCGHO),
    'WBTC-USDC': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_WBTCUSDC),
    'WLD-USDC': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_WLDUSDC),
    'WSTETH-DAI': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_WSTETHDAI),
    'WSTETH-ETH': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_WSTETHETH),
    'WSTETH-GHO': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_WSTETHGHO),
    'WSTETH-USDC': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_WSTETHUSDC),
    'YFI-DAI': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_YFIDAI),
  },
  ajnaOraclessPoolPairs: {
    'YIELDBTC-WBTC': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_YIELDBTCWBTC),
    'YIELDETH-ETH': contractDesc(ajnaPool, goerli.ajna.AjnaPoolPairs_YIELDETHETH),
  },
  ajnaRewardsManager: contractDesc(ajnaRewardsManager, goerli.ajna.AjnaRewardsManager),
  // TODO update address
  ajnaRewardsClaimer: contractDesc(ajnaRewardsClaimer, goerli.ajna.AjnaRewardsClaimer),
  ajnaERC20PoolFactory: contractDesc(ajnaERC20PoolFactory, goerli.ajna.ERC20PoolFactory),
  // NOT contracts
  cacheApi: 'https://cache-goerli-staging.staging.summer.fi/api/v1',
  safeConfirmations: 6,
  openVaultSafeConfirmations: 6,
  taxProxyRegistries: [],
  etherscan: {
    url: 'https://goerli.etherscan.io',
    apiUrl: 'https://api-goerli.etherscan.io/api',
    apiKey: etherscanAPIKey || '',
  },
  ethtx: {
    url: 'https://ethtx.info/goerli',
  },
  magicLink: {
    apiKey: '',
  },
  SdaiOracle: contractDesc(ajnaPoolInfo, goerli.common.SdaiOracle),
}
