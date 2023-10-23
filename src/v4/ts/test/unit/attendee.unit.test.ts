import path from 'path'
const ROOT = path.join(__dirname, '..', '..', '..', '..', '..', '.env')
import {config} from 'dotenv'
config({path: ROOT})

import {expect} from 'chai'
import sinon from 'sinon'

import {IAttendee} from '../../lib/interfaces/IAttendee'
import {Attendee} from '../../lib/models/Attendee'
import NI from '../../lib/util/NetworkInterface'

import * as testData from '../data/attendee.testData'

describe('startgg Attendee (Participant)', () => {
    describe('mocked, sophisticated functions unit tests', () => {
        // getEnteredPhases()
        it('getEnteredPhases(), should return the correct phases for stubbed value for attendee phases', async () => {
            const myAttendee = new Attendee(12345, 'GamerTag', null, null, null, null, null, null, null, null, null)
            const niStub = sinon.mock(NI).expects('query').once().returns(testData.mockedAttendeePhasesQueryResponse)

            const res = myAttendee.getEnteredPhases()
            sinon.assert.calledOnce(niStub)
            expect(await res).to.deep.equal(testData.mockedGetEnteredPhasesReturnValue)
            niStub.restore()
        })

        // getEnteredPhaseGroups
        it('getEnteredPhaseGroups(), should return the correct phase groups for stubbed value for attendee phase groups', async () => {
            const myAttendee = new Attendee(12345, 'GamerTag', null, null, null, null, null, null, null, null, null)
            const niStub = sinon.mock(NI).expects('query').once().returns(testData.mockedAttendeePhaseGroupsQueryResponse)

            const res = myAttendee.getEnteredPhaseGroups()
            sinon.assert.calledOnce(niStub)
            expect(JSON.stringify(await res)).to.be.equal(JSON.stringify(testData.mockedGetEnteredPhaseGroupsReturnValue))
            niStub.restore()
        })
    })
})
