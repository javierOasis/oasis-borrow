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
import { tokensArbitrum } from 'blockchain/tokens/'
import { AAVE_V3_POOL_GENESIS_GOERLI } from 'blockchain/tokens/arbitrum'
import { supportedIlks } from 'blockchain/tokens/mainnet'
import { etherscanAPIKey } from 'config/runtimeConfig'

import type { MainnetContracts } from './mainnet'
import mainnetContracts from './mainnet'

const { arbitrum } = ADDRESSES

export const arbitrumContracts: MainnetContracts = {
  otc: contractDesc(otc, arbitrum.common.Otc),
  collaterals: getCollaterals(arbitrum.common, supportedIlks),
  tokens: tokensArbitrum,
  tokensMainnet: mainnetContracts.tokensMainnet,
  joins: {
    ...getCollateralJoinContracts(
      arbitrum.maker.joins,
      supportedIlks.filter(
        // these are not supported on goerli
        (ilk) =>
          !['CRVV1ETHSTETH-A', 'GUNIV3DAIUSDC1-A', 'GUNIV3DAIUSDC2-A', 'GNO-A'].includes(ilk),
      ),
    ),
  },
  getCdps: contractDesc(getCdps, arbitrum.maker.common.GetCdps),
  mcdOsms: getOsms(arbitrum.maker.pips, supportedIlks),
  mcdJug: contractDesc(mcdJug, arbitrum.maker.common.Jug),
  mcdPot: contractDesc(mcdPot, arbitrum.maker.common.Pot),
  mcdEnd: contractDesc(mcdEnd, arbitrum.maker.common.End),
  mcdSpot: contractDesc(mcdSpot, arbitrum.maker.common.Spot),
  mcdDog: contractDesc(mcdDog, arbitrum.maker.common.Dog),
  mcdJoinDai: contractDesc(mcdJoinDai, arbitrum.maker.joins.MCD_JOIN_DAI),

  merkleRedeemer: contractDesc(merkleRedeemer, arbitrum.common.MerkleRedeemer),
  dssCharter: contractDesc(dssCharter, arbitrum.common.DssCharter),
  dssCdpManager: contractDesc(dssCdpManager, arbitrum.maker.common.CdpManager),
  otcSupportMethods: contractDesc(otcSupport, arbitrum.common.OtcSupportMethods),
  vat: contractDesc(vat, arbitrum.maker.common.Vat),
  dsProxyRegistry: contractDesc(dsProxyRegistry, arbitrum.mpa.core.DSProxyRegistry),
  dsProxyFactory: contractDesc(dsProxyFactory, arbitrum.mpa.core.DSProxyFactory),
  dssProxyActions: contractDesc(dssProxyActions, arbitrum.common.DssProxyActions),
  dssProxyActionsCharter: contractDesc(
    dssProxyActionsCharter,
    arbitrum.common.DssProxyActionsCharter,
  ),
  cdpRegistry: contractDesc(cdpRegistry, arbitrum.common.CdpRegistry),
  dssProxyActionsCropjoin: contractDesc(
    dssProxyActionsCropjoin,
    arbitrum.common.DssProxyActionsCropjoin,
  ),
  dssMultiplyProxyActions: contractDesc(
    dssMultiplyProxyActions,
    arbitrum.common.DssMultiplyProxyActions,
  ),
  guniProxyActions: contractDesc(guniProxyActions, arbitrum.common.GuniProxyActions), // TODO: add address
  dssCropper: contractDesc(dssCropper, arbitrum.common.DssCropper),
  guniResolver: arbitrum.common.GuniResolver,
  guniRouter: arbitrum.common.GuniRouter,

  automationBot: contractDesc(automationBot, arbitrum.automation.AutomationBot),
  automationBotV2: contractDesc(automationBotV2, arbitrum.automation.AutomationBotV2),
  automationBotAggregator: contractDesc(
    automationBotAggregator,
    arbitrum.automation.AutomationBotAggregator,
  ),

  serviceRegistry: arbitrum.common.ServiceRegistry,
  defaultExchange: contractDesc(exchange, arbitrum.common.DefaultExchange),
  noFeesExchange: contractDesc(exchange, arbitrum.common.NoFeesExchange),
  lowerFeesExchange: contractDesc(exchange, arbitrum.common.LowerFeesExchange),
  // Currently this is not supported on Goerli - no deployed contract
  fmm: arbitrum.maker.common.FlashMintModule,
  dssProxyActionsDsr: contractDesc(dssProxyActionsDsr, arbitrum.common.DssProxyActionsDsr),
  lidoCrvLiquidityFarmingReward: contractDesc(
    lidoCrvLiquidityFarmingReward,
    arbitrum.common.LidoCrvLiquidityFarmingReward,
  ),
  aaveTokens: {},
  aaveV2ProtocolDataProvider: contractDesc(
    aaveV2ProtocolDataProvider,
    arbitrum.aave.v2.ProtocolDataProvider,
  ),
  aaveV2PriceOracle: contractDesc(aaveV2PriceOracle, arbitrum.aave.v2.PriceOracle),
  chainlinkPriceOracle: {
    USDCUSD: contractDesc(chainLinkPriceOracle, arbitrum.common.ChainlinkPriceOracle_USDCUSD),
    ETHUSD: contractDesc(chainLinkPriceOracle, arbitrum.common.ChainlinkPriceOracle_ETHUSD),
  },
  aaveV2LendingPool: emptyContractDesc('aaveV2LendingPool'),

  operationExecutor: contractDesc(operationExecutor, arbitrum.mpa.core.OperationExecutor),
  swapAddress: arbitrum.mpa.core.Swap,
  accountFactory: contractDesc(accountFactory, arbitrum.mpa.core.AccountFactory),
  accountGuard: contractDesc(accountGuard, arbitrum.mpa.core.AccountGuard),
  aaveV3Pool: contractDesc(aaveV3Pool, arbitrum.aave.v3.Pool, AAVE_V3_POOL_GENESIS_GOERLI),
  aaveV3Oracle: contractDesc(aaveV3Oracle, arbitrum.aave.v3.AaveOracle),
  aaveV3PoolDataProvider: contractDesc(
    aaveV3PoolDataProvider,
    arbitrum.aave.v3.AavePoolDataProvider,
  ),
  ajnaPoolInfo: contractDesc(ajnaPoolInfo, arbitrum.ajna.AjnaPoolInfo),
  ajnaProxyActions: contractDesc(ajnaProxyActions, arbitrum.ajna.AjnaProxyActions),
  ajnaPoolPairs: {
    'CBETH-ETH': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_CBETHETH),
    'CBETH-GHO': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_CBETHGHO),
    'ETH-DAI': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_ETHDAI),
    'ETH-GHO': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_ETHGHO),
    'ETH-USDC': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_ETHUSDC),
    'GHO-DAI': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_GHODAI),
    'RETH-DAI': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_RETHDAI),
    'RETH-ETH': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_RETHETH),
    'RETH-GHO': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_RETHGHO),
    'RETH-USDC': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_RETHUSDC),
    'SDAI-USDC': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_SDAIUSDC),
    'TBTC-USDC': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_TBTCUSDC),
    'TBTC-WBTC': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_TBTCWBTC),
    'USDC-ETH': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_USDCETH),
    'USDC-WBTC': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_USDCWBTC),
    'USDC-WLD': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_USDCWLD),
    'WBTC-DAI': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_WBTCDAI),
    'WBTC-GHO': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_WBTCGHO),
    'WBTC-USDC': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_WBTCUSDC),
    'WLD-USDC': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_WLDUSDC),
    'WSTETH-DAI': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_WSTETHDAI),
    'WSTETH-ETH': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_WSTETHETH),
    'WSTETH-GHO': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_WSTETHGHO),
    'WSTETH-USDC': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_WSTETHUSDC),
    'YFI-DAI': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_YFIDAI),
  },
  ajnaOraclessPoolPairs: {
    'YIELDBTC-WBTC': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_YIELDBTCWBTC),
    'YIELDETH-ETH': contractDesc(ajnaPool, arbitrum.ajna.AjnaPoolPairs_YIELDETHETH),
  },
  ajnaRewardsManager: contractDesc(ajnaRewardsManager, arbitrum.ajna.AjnaRewardsManager),
  // TODO update address
  ajnaRewardsClaimer: contractDesc(ajnaRewardsClaimer, arbitrum.ajna.AjnaRewardsClaimer),
  ajnaERC20PoolFactory: contractDesc(ajnaERC20PoolFactory, arbitrum.ajna.ERC20PoolFactory),
  // NOT contracts
  cacheApi: 'not-implemented',
  safeConfirmations: 6,
  openVaultSafeConfirmations: 6,
  taxProxyRegistries: [],
  etherscan: {
    url: 'https://optimistic.etherscan.io/',
    apiUrl: 'not-implemented',
    apiKey: etherscanAPIKey || '',
  },
  ethtx: {
    url: '',
  },
  magicLink: {
    apiKey: '',
  },
  SdaiOracle: contractDesc(ajnaPoolInfo, arbitrum.common.SdaiOracle),
}
