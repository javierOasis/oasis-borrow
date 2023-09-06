import { IPosition } from '@oasisdex/dma-library'
import BigNumber from 'bignumber.js'
import { AaveV2UserReserveData } from 'blockchain/aave'
import { AaveV3UserReserveData } from 'blockchain/aave-v3'
import { SparkV3UserReserveData } from 'blockchain/spark-v3'
import { AaveLikeUserAccountData } from 'lendingProtocols/aave-like-common/aave-like-user-account-data'

type ConfigurationData = string[]

export interface AaveLikeProtocolData {
  positionData: AaveV3UserReserveData | AaveV2UserReserveData | SparkV3UserReserveData
  accountData: AaveLikeUserAccountData
  oraclePrice: BigNumber
  position: IPosition
  userConfiguration: ConfigurationData
  reservesList: ConfigurationData
}