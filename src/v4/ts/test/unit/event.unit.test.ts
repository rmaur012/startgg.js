import path from 'path'
const ROOT = path.join(__dirname, '..', '..', '..', '..', '.env')
import {config} from 'dotenv'
config({path: ROOT})

import '../../lib/util/ErrorHandler'
// import * as log from '../../lib/util/Logger'

import chai from 'chai'
import cap from 'chai-as-promised'
import sinon from 'sinon'
chai.use(cap)
const {expect} = chai

import {IEvent}  from '../../lib/interfaces/IEvent'
import {Event} from '../../lib/models/Event'
import NI from '../../lib/util/NetworkInterface'
import * as testData from '../data/event.testData'

let event1: IEvent, event2: IEvent

const EVENT_1_ID = 822160
const EVENT_1_SLUG = 'tournament/nxt-lvl-55/event/ultimate-singles'
const EVENT_1_TOURNAMENT_SLUG='nxt-lvl-55'
const EVENT_1_EVENT_SLUG='ultimate-singles'
const EVENT_1_PHASE_COUNT = 1
const EVENT_1_PHASE_GROUP_COUNT = 1
const EVENT_1_ENTRANT_COUNT = 31
const EVENT_1_ATTENDEE_COUNT = 31
const EVENT_1_SET_COUNT = 61

const EVENT_2_ID = 23597
const EVENT_2_SLUG = 'tournament/tipped-off-12-presented-by-the-lab-gaming-center/event/melee-doubles'
const EVENT_2_TOURNAMENT_SLUG='tipped-off-12-presented-by-the-lab-gaming-center'
const EVENT_2_EVENT_SLUG='melee-doubles'
const EVENT_2_PHASE_COUNT = 2
const EVENT_2_PHASE_GROUP_COUNT = 9
const EVENT_2_ENTRANT_COUNT = 60
const EVENT_2_ATTENDEE_COUNT = 120
const EVENT_2_SET_COUNT = 121

const TOP_8_LABELS = [
    'Losers Quarter-Final', 'Losers Quarter-Final',
    'Losers Semi-Final', 'Losers Semi-Final',
    'Winners Semi-Final', 'Winners Semi-Final',
    'Winners Final', 'Grand Final', 'Losers Final'
]
const GRAND_FINAL_RESET_TOKEN = 'Grand Final Reset'

describe('startgg Event', function() {
    describe('mocked sophisticated functions unit tests', () => {
        // getPhases()
        it('getPhases(), should return the correct mapping for stubbed value for single bracket', async () => {
            const myEvent = new Event(822160, 'Get Phases Single', 'gps', null, null, null, null, null, null, null, null, null)
            const niStub = sinon.mock(NI).expects('query').once().returns(testData.mockedGetPhasesQueryResponseOfSingleBracket)

            const res = myEvent.getPhases()
            sinon.assert.calledOnce(niStub)
            expect(JSON.stringify(await res)).to.be.equal(JSON.stringify(testData.expectedGetPhasesReturnValueOfSingleBracket))
            niStub.restore()
        })

        it('getPhases(), should return the correct mapping for stubbed value for single bracket', async () => {
            const myEvent = new Event(23597, 'Get Phases Extensive', 'gps', null, null, null, null, null, null, null, null, null)
            const niStub = sinon.mock(NI).expects('query').once().returns(testData.mockedGetPhasesResultOfExtensiveBracket)

            const res = myEvent.getPhases()
            sinon.assert.calledOnce(niStub)
            expect(JSON.stringify(await res)).to.be.equal(JSON.stringify(testData.expectedGetPhasesReturnValueOfExtensiveBracket))
            niStub.restore()
        })

        // getPhaseGroups
        it('getPhaseGroups(), should return the correct mapping for stubbed value for single bracket', async () => {
            const myEvent = new Event(822160, 'Get Phase Groups Single', 'gps', null, null, null, null, null, null, null, null, null)
            const niStub = sinon.mock(NI).expects('query').once().returns(testData.mockedGetPhaseGroupsQueryResponseOfSingleBracket)

            const res = myEvent.getPhaseGroups()
            sinon.assert.calledOnce(niStub)
            expect(JSON.stringify(await res)).to.be.equal(JSON.stringify(testData.expectedGetPhaseGroupsReturnValueOfSingleBracket))
            niStub.restore()
        })

        it('getPhaseGroups(), should return the correct mapping for stubbed value for single bracket', async () => {
            const myEvent = new Event(23597, 'Get Phase Groups Extensive', 'gps', null, null, null, null, null, null, null, null, null)
            const niStub = sinon.mock(NI).expects('query').once().returns(testData.mockedGetPhaseGroupsResultOfExtensiveBracket)

            const res = myEvent.getPhaseGroups()
            sinon.assert.calledOnce(niStub)
            expect(JSON.stringify(await res)).to.be.equal(JSON.stringify(testData.expectedGetPhaseGroupsReturnValueOfExtensiveBracket))
            niStub.restore()
        })

        // getStandings, but not implemented right now

        // getEntrants
        it('getEntrants(), should return the correct mapping for stubbed value for single bracket', async () => {
            const myEvent = new Event(23597, 'Get Entrants', 'gps', null, null, null, null, null, null, null, null, null)
            const eventStub = sinon.mock(myEvent).expects('getPhaseGroups').once().returns(testData.mockedGetPhaseGroupsFunction)
            const niStub = sinon.mock(NI).expects('clusterQuery').once().returns(testData.mockedGetEntrantsQueryResponse)

            const res = myEvent.getEntrants()
            sinon.assert.calledOnce(eventStub)
            expect(JSON.stringify(await res)).to.be.equal(JSON.stringify(testData.expectedGetEntrantsReturnValue))
            eventStub.restore()
            niStub.restore()
        })

        // getAttendees
        it('getAttendees(), should return the correct mapping for stubbed value for single bracket', async () => {
            const myEvent = new Event(23597, 'Get Attendees', 'gps', null, null, null, null, null, null, null, null, null)
            const eventStub = sinon.mock(myEvent).expects('getPhaseGroups').once().returns(testData.mockedGetPhaseGroupsFunctionForGetAttendees)
            const niStub = sinon.mock(NI).expects('clusterQuery').once().returns(testData.mockedGetAttendeesQueryResponseForGetAttendees)

            const res = myEvent.getAttendees()
            sinon.assert.calledOnce(eventStub)
            expect(JSON.stringify(await res)).to.be.equal(JSON.stringify(testData.expectedGetAttendeesReturnValueForGetAttendees))
            eventStub.restore()
            niStub.restore()
        })

        // getSets
        it('getSets(), should return the correct set counts for stubbed value for single bracket', async () => {
            const myEvent = new Event(23597, 'Get Sets', 'gps', null, null, null, null, null, null, null, null, null)
            const eventStub = sinon.mock(myEvent).expects('getPhaseGroups').once().returns(testData.mockedGetPhaseGroupsFunctionForGetSets)
            const niStub = sinon.mock(NI).expects('clusterQuery').once().returns(testData.mockedGetAttendeesQueryResponseForGetSets)

            const res = myEvent.getSets()
            sinon.assert.calledOnce(eventStub)
            expect(JSON.parse(JSON.stringify(await res)).length).to.be.equal(testData.expectedGetSetReturnValueArrayLengthForGetSets)
            eventStub.restore()
            niStub.restore()
        })
    })
})