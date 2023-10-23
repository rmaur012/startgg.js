import path from 'path'
const ROOT = path.join(__dirname, '..', '..', '..', '..', '.env')
import {config} from 'dotenv'
config({path: ROOT})

import '../../lib/util/ErrorHandler'

import chai from 'chai'
import cap from 'chai-as-promised'
import sinon from 'sinon'
chai.use(cap)
const {expect} = chai

import {ITournament} from '../../lib/interfaces/ITournament'
import {Tournament} from '../../lib/models/Tournament'
import NI from '../../lib/util/NetworkInterface'
import * as testData from '../data/tournament.testData'

let tournament1: ITournament, tournament2: ITournament, tournament4: ITournament

const TOURNAMENT_ID_1 = 432884
const TOURNAMENT_SLUG_1 = 'tournament/port-priority-7'

const TOURNAMENT_ID_2 = 438800
const TOURNAMENT_SLUG_2 = 'tournament/genesis-9-1'

const TOURNAMENT_ID_3 = 449011
const TOURNAMENT_SLUG_3 = 'tournament/let-s-make-big-moves-2023'

const TOURNAMENT_ID_4 = 594032
const TOURNAMENT_SLUG_4 = 'tournament/unfunstuff-smash-ultimate-unfunday-mondays-week-40'

describe('startgg Tournament', function() {
    describe('mocked sophisticated functions unit tests', () => {
        // getEvents()
        it('getEvents(), should return the correct events for stubbed value for single bracket', async () => {
            const myTournament = new Tournament(TOURNAMENT_ID_1, 'Port Priority 7', TOURNAMENT_SLUG_1, null, null, null, testData.mockedVenue)
            const niStub1 = sinon.mock(NI).expects('query').once().returns(testData.mockedGetEventsTournamentEventsQueryResponse)

            const res = await myTournament.getEvents()
            sinon.assert.calledOnce(niStub1)
            expect(JSON.stringify(res)).to.be.equal(JSON.stringify(testData.expectedGetEventsReturnValue))
            niStub1.restore()
        })

        // getPhases()
        it('getPhases(), should return the correct phases for stubbed value for single bracket', async () => {
            const myTournament = new Tournament(TOURNAMENT_ID_1, 'Port Priority 7', TOURNAMENT_SLUG_1, null, null, null, testData.mockedVenue)
            const niStub1 = sinon.mock(NI).expects('query').once().returns(testData.mockedGetPhasesTournamentEventsQueryResponse)

            const res = await myTournament.getPhases()
            sinon.assert.calledOnce(niStub1)
            expect(await res).to.deep.equal(testData.expectedGetPhasesReturnValue)
            niStub1.restore()
        })

        // getPhaseGroups()
        it('getPhaseGroups(), should return the correct phase groups for stubbed value for single bracket', async () => {
            const myTournament = new Tournament(TOURNAMENT_ID_1, 'Port Priority 7', TOURNAMENT_SLUG_1, null, null, null, testData.mockedVenue)
            const niStub1 = sinon.mock(NI).expects('query').once().returns(testData.mockedGetPhaseGroupsTournamentEventsQueryResponse)

            const res = await myTournament.getPhaseGroups()
            sinon.assert.calledOnce(niStub1)
            expect(res).to.deep.equal(testData.expectedGetPhaseGroupsReturnValue)
            niStub1.restore()
        })

        // getSets(), checking for size due to long object to keep as testData
        it('getSets(), should return the correct sets for stubbed value for single bracket', async () => {
            const myTournament = new Tournament(TOURNAMENT_ID_1, 'Port Priority 7', TOURNAMENT_SLUG_1, null, null, null, testData.mockedVenue)
            const niStub1 = sinon.mock(NI).expects('query').once().returns(testData.mockedGetPhaseGroupsTournamentEventsQueryResponse)
            const niStub2 = sinon.mock(NI).expects('clusterQuery').once().returns(testData.mockedGetSetsTournamentEventsQueryResponse)

            const res = await myTournament.getSets()
            sinon.assert.calledOnce(niStub1)
            sinon.assert.calledOnce(niStub2)
            expect(res.length).to.deep.equal(testData.expectedGetSetsArraySizeReturnValue)
            niStub1.restore()
            niStub2.restore()
        })

        // getEntrants()
        it('getEntrants(), should return the correct entrants for stubbed value for single bracket', async () => {
            const myTournament = new Tournament(TOURNAMENT_ID_1, 'Port Priority 7', TOURNAMENT_SLUG_1, null, null, null, testData.mockedVenue)
            const niStub1 = sinon.mock(NI).expects('query').once().returns(testData.mockedGetPhaseGroupsTournamentEventsQueryResponse)
            const niStub2 = sinon.mock(NI).expects('clusterQuery').once().returns(testData.mockedGetEntrantsTournamentEventsQueryResponse)

            const res = await myTournament.getEntrants()
            sinon.assert.calledOnce(niStub1)
            sinon.assert.calledOnce(niStub2)
            expect(res).to.deep.equal(testData.expectedGetEntrantsReturnValue)
            niStub1.restore()
            niStub2.restore()
        })

        // getAttendees()
        it('getAttendees(), should return the correct attendees for stubbed value for single bracket', async () => {
            const myTournament = new Tournament(TOURNAMENT_ID_1, 'Port Priority 7', TOURNAMENT_SLUG_1, null, null, null, testData.mockedVenue)
            const niStub1 = sinon.mock(NI).expects('paginatedQuery').once().returns(testData.mockedGetAttendeesTournamentEventsPaginatedQueryResponse)

            const res = await myTournament.getAttendees()
            sinon.assert.calledOnce(niStub1)
            expect(JSON.stringify(res)).to.deep.equal(JSON.stringify(testData.expectedGetAttendeesReturnValue))
            niStub1.restore()
        })
    })
})
