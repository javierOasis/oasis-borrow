import BigNumber from 'bignumber.js'
import {
  createPositionsOverviewSummary$,
  Position,
  PositionView,
} from 'features/vaultsOverview/pipes/positionsOverviewSummary'
import { getStateUnpacker } from 'helpers/testHelpers'
import { zero } from 'helpers/zero'
import { of } from 'rxjs'

describe('positionsOverviewSummary', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('calculates proportions correctly, maps usd, and sorts values', () => {
    const mockBalances: { [key: string]: BigNumber | undefined } = {
      ETH: new BigNumber(1),
      WBTC: new BigNumber(5),
    }

    const walletBalance$ = jest.fn((token: string) => of(mockBalances[token] || zero))

    const tokenPriceUsd$ = jest.fn(() =>
      of({
        ETH: new BigNumber(2),
        WBTC: new BigNumber(6),
      }),
    )

    const obsv$ = createPositionsOverviewSummary$(
      walletBalance$,
      tokenPriceUsd$,
      () => of([]),
      () => of([{ path: 'url', icon: 'icon', text: 'text' }]),
      '0x00',
    )

    const state = getStateUnpacker(obsv$)

    const [wbtc, eth] = state().assetsAndPositions

    // 'orders values by usd'
    expect(wbtc.token).toBe('WBTC')
    // 'orders values by usd'
    expect(eth.token).toBe('ETH')
    // 'calculates usd value'
    expect(wbtc.contentsUsd?.toString()).toBe('30')
    // 'calculates usd value'
    expect(eth.contentsUsd?.toString()).toBe('2')
    // 'calculates proportion'
    expect(wbtc.proportion?.toString()).toBe('93.75')
    // 'calculates proportion'
    expect(eth.proportion?.toString()).toBe('6.25')
  })

  it('calculates the other proportion correctly', () => {
    const mockBalances: { [key: string]: BigNumber | undefined } = {
      ETH: new BigNumber(16),
      WBTC: new BigNumber(5),
      STETH: new BigNumber(5),
      MKR: new BigNumber(5),
      WETH: new BigNumber(5),
      // these two tokens included in 'other' proportion
      BAT: new BigNumber(5),
      RENBTC: new BigNumber(4),
    } as { [key: string]: BigNumber }

    const walletBalance$ = jest.fn((token: string) => of(mockBalances[token] || zero))

    const tokenPriceUsd$ = jest.fn(() =>
      of({
        ETH: new BigNumber(1),
        WBTC: new BigNumber(1),
        STETH: new BigNumber(1),
        MKR: new BigNumber(1),
        WETH: new BigNumber(1),
        BAT: new BigNumber(1),
        RENBTC: new BigNumber(1),
      }),
    )

    const obsv$ = createPositionsOverviewSummary$(
      walletBalance$,
      tokenPriceUsd$,
      () => of([]),
      () => of([{ path: 'url', icon: 'icon', text: 'text' }]),
      '0x00',
    )

    const state = getStateUnpacker(obsv$)

    expect(state().percentageOther.toString()).toBe('10')
  })

  it('includes the maker positions', () => {
    const mockBalances: { [key: string]: BigNumber | undefined } = {
      ETH: new BigNumber(1),
    }

    const walletBalance$ = jest.fn((token: string) => of(mockBalances[token] || zero))

    const tokenPriceUsd$ = jest.fn(() =>
      of({
        ETH: new BigNumber(6),
      }),
    )

    const positions: Position[] = [
      {
        token: 'ETH',
        title: 'ETH-A Oasis Multiply',
        contentsUsd: new BigNumber(5),
        url: 'example.com/eth',
      },
      {
        token: 'DAI',
        title: 'DAI-A Oasis Earn',
        contentsUsd: new BigNumber(7),
        url: 'example.com/earn',
      },
    ]

    const obsv$ = createPositionsOverviewSummary$(
      walletBalance$,
      tokenPriceUsd$,
      () => of(positions),
      () => of([{ path: 'url', icon: 'icon', text: 'text' }]),
      '0x00',
    )

    const state = getStateUnpacker(obsv$)

    const [earnPosition, ethInWallet, multiplyPosition] = state().assetsAndPositions

    expect(earnPosition.token)

    expect(earnPosition.token).toBe('DAI')
    expect(earnPosition.contentsUsd?.toString()).toBe('7')
    expect((earnPosition as PositionView).title).toBe('DAI-A Oasis Earn')
    expect((earnPosition as PositionView).url).toBe('example.com/earn')

    expect(ethInWallet.token).toBe('ETH')
    expect(ethInWallet.contentsUsd?.toString()).toBe('6')

    expect(multiplyPosition.token).toBe('ETH')
    expect(multiplyPosition.contentsUsd?.toString()).toBe('5')
    expect((multiplyPosition as PositionView).title).toBe('ETH-A Oasis Multiply')
    expect((multiplyPosition as PositionView).url).toBe('example.com/eth')

    expect(state().totalValueUsd.toString()).toBe('18')
  })
})
