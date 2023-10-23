import path from 'path'
const ROOT = path.join(__dirname, '..', '..', '..', '..', '.env')
import {config} from 'dotenv'
config({path: ROOT})

import '../../lib/util/ErrorHandler'
import * as log from '../../lib/util/Logger'

import chai from 'chai'
import cap from 'chai-as-promised'
import sinon from 'sinon'
chai.use(cap)
const {expect} = chai

import {IPhase} from '../../lib/interfaces/IPhase'
import {Phase} from '../../lib/models/Phase'
import * as testData from '../data/phase.testData'
import NI from '../../lib/util/NetworkInterface'

const LOG_LEVEL = log.levels.DEBUG

const ID1 = 1255604
const EVENT_ID_1 = 822160
const PHASE_1_PG_COUNT = 1
const PHASE_1_SET_COUNT = 61
const PHASE_1_ENTRANT_COUNT = 31
const PHASE_1_ATTENDEE_COUNT = 31

const ID2 = 1242261
const EVENT_ID_2 = 432884
const PHASE_2_PG_COUNT = 2
const PHASE_2_SET_COUNT = 180
const PHASE_2_ENTRANT_COUNT = 128
const PHASE_2_ATTENDEE_COUNT = 128

const ID3 = 1242262
const EVENT_ID_3 = 432884
const PHASE_3_PG_COUNT = 1
const PHASE_3_SET_COUNT = 11
const PHASE_3_ENTRANT_COUNT = 8
const PHASE_3_ATTENDEE_COUNT = 8

let phase1: IPhase
let phase2: IPhase
let phase3: IPhase
const concurrency = 4

describe('startgg Phase', function() {
    describe('mocked sophisticated functions unit tests', () => {
        // getPhaseGroups()
        // getSeeds()
        // getEntrants()
        it('getEntrants(), should return the correct entrants for stubbed value for single bracket', async () => {
            const myPhase = new Phase(ID3, EVENT_ID_3, 'Top 8', 8, 1)
            const niStub1 = sinon.mock(NI).expects('query').once().returns(testData.mockedTop8PhasePaginatedDataQueryResponse)
            const niStub2 = sinon.mock(NI).expects('clusterQuery').once().returns(testData.mockedTop8GetEntrantsClusterQueryResponse)

            const res = myPhase.getEntrants()
            sinon.assert.calledOnce(niStub1)
            expect(await res).to.deep.equal(testData.expectedTop8PhaseGetEntrantsReturnValue)
            niStub1.restore()
            niStub2.restore()
        })

        // getAttendees()
        it('getAttendees(), should return the correct attendees for stubbed value for single bracket', async () => {
            const myPhase = new Phase(ID3, EVENT_ID_3, 'Top 8', 8, 1)
            const niStub1 = sinon.mock(NI).expects('query').once().returns(testData.mockedTop8PhasePaginatedDataQueryResponse)
            const niStub2 = sinon.mock(NI).expects('clusterQuery').once().returns(testData.mockedTop8GetAttendeesClusterQueryResponse)

            const res = myPhase.getAttendees()
            sinon.assert.calledOnce(niStub1)
            expect(await res).to.deep.equal(testData.expectedTop8PhaseGetAttendeesReturnValue)
            niStub1.restore()
            niStub2.restore()
        })

        // getSets
        it('getSets(), should return the correct sets for stubbed value for single bracket', async () => {
            const myPhase = new Phase(ID3, EVENT_ID_3, 'Top 8', 8, 1)
            const niStub1 = sinon.mock(NI).expects('query').once().returns(testData.mockedTop8PhasePaginatedDataQueryResponse)
            const niStub2 = sinon.mock(NI).expects('clusterQuery').once().returns(testData.mockedTop8GetSetsClusterQueryResponse)

            const res = myPhase.getSets()
            sinon.assert.calledOnce(niStub1)
            expect(await res).to.deep.equal(testData.expectedTop8PhaseGetSetsReturnValue)
            niStub1.restore()
            niStub2.restore()
        })
    })
})