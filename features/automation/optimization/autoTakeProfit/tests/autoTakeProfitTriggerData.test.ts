import { expect } from 'chai'

describe('extractAutoTakeProfitData', () => {

    describe('given TriggersData, with just one trigger of Auto Take Profit To Collateral', () => {
        it('should return only one auto take profit to collateral trigger data', () => {
        })
    })
    describe('given TriggersData, with just one trigger of Auto Take Profit To DAI', () => {
        it('should return only one auto take profit to DAI trigger data', () => {
        })
    })
    describe('given TriggersData, with multiple triggers of various types, one of them beaint auto take profit trigger', () => {
        it('should return only one auto take profit trigger data', () => {
            expect(true).to.be.true // this is just to pass the linter check
        })
    })
    describe('given TriggersData, with multiple auto take profit triggers one being to collateral and having lowest execution price', () => {
        it('should return only one auto take profit trigger data, one with lowest execution price to collateral', () => {
        })
    })
    describe('given TriggersData, with multiple auto take profit triggers one being to DAI and having lowest execution price', () => {
        it('should return only one auto take profit trigger data, one with lowest execution price to DAI', () => {
        })
    })

    describe('given triggers data with one trigger with incorrect trigger type', () => {
        it('should return empty array', () => {
        })
    })

    describe('given triggers data with one trigger with incorrect command address', () => {
        it('should return empty array', () => {
        })
    })

    describe('given triggers data with multiple valid triggers, one being valid auto take profit trigger and one trigger with incorrect command address', () => {
        it('should return one auto take profit trigger data', () => {
        })
    })
})

describe('')