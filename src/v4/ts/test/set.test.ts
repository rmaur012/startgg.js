import path from 'path'
const ROOT = path.join(__dirname, '..', '..', '..', '..', '.env')
import {config} from 'dotenv'
config({path: ROOT})

import '../lib/util/ErrorHandler'

import chai from 'chai'
import cap from 'chai-as-promised'
import moment from 'moment'
import sinon from 'sinon'
chai.use(cap)
const {expect} = chai

import {IAttendee} from '../lib/interfaces/IAttendee'
import {IEntrant} from '../lib/interfaces/IEntrant'
import { IGGSet } from '../lib/interfaces/IGGSet'
import {IPlayerLite} from '../lib/interfaces/IPlayerLite'

import {Attendee} from '../lib/models/Attendee'
import {Entrant} from '../lib/models/Entrant'
import {Game} from '../lib/models/Game'
import {GGSet} from '../lib/models/GGSet'
import Initializer from '../lib/util/Initializer'
import * as gameData from './data/games.testData'
import * as testData from './data/sets.testData'
import * as testDataEvents from './data/event.testData'
import NI from '../lib/util/NetworkInterface'

let set1: IGGSet, set2: IGGSet
const SET_ID_1 = +'54170233'
const SET_ID_2 = +'51002303'

describe('startgg Set (has still pending)', function() {
    this.timeout(10000)

    before(async () => {
        Initializer(process.env.API_TOKEN!)

        console.log('Testing displayScore parsing first...')
        expect(GGSet.parseDisplayScore(testData.set1.displayScore!)).to.deep.equal(testData.parsedDisplayScore1)
        expect(GGSet.parseDisplayScore(testData.set2.displayScore!)).to.deep.equal(testData.parsedDisplayScore2)
        console.log('Success!')
        console.log('Retrieving sets...')
        set1 = await GGSet.get(SET_ID_1)
        set2 = await GGSet.get(SET_ID_2)
        return true
    })

    // event id
    it('should return the correct event id 1', () => {
        expect(set1.getEventId()).to.be.equal(testData.set1.event.id)
    })
    it('should return the correct event id 2', () => {
        expect(set2.getEventId()).to.be.equal(testData.set2.event.id)
    })

    // phase group id
    it('should return the correct phase group 1', () => {
        expect(set1.getPhaseGroupId()).to.be.equal(testData.set1.phaseGroup.id)
    })
    it('should return the correct phase group 2', () => {
        expect(set2.getPhaseGroupId()).to.be.equal(testData.set2.phaseGroup.id)
    })

    // started at time
    it('should return the correct starting timestamp 1', () => {
        expect(set1.getStartedAtTimestamp()).to.be.equal(testData.set1.startedAt)
    })
    it('should return the correct starting timestamp 2 ', () => {
        expect(set2.getStartedAtTimestamp()).to.be.equal(testData.set2.startedAt)
    })

    // completed at time
    it('should return the correct completed timestamp 1', () => {
        expect(set1.getCompletedAtTimestamp()).to.be.equal(testData.set1.completedAt)
    })
    it('should return the correct completed timestamp 2', () => {
        expect(set2.getCompletedAtTimestamp()).to.be.equal(testData.set2.completedAt)
    })

    // completed at time date
    it('should return the correct completed Datetime 1', () => {
        const expected = moment.unix(testData.set1.completedAt!).toDate()
        expect(moment(set1.getCompletedAt()).isSame(expected)).to.to.true
    })
    it('should return the correct completed Datetime 2', () => {
        const expected = moment.unix(testData.set2.completedAt!).toDate()
        expect(moment(set2.getCompletedAt()).isSame(expected)).to.to.true
    })

    // display score
    it('should return the correct display score string 1', () => {
        expect(set1.getDisplayScore()).to.be.equal(testData.set1.displayScore)
    })
    it('should return the correct display score string 2', () => {
        expect(set2.getDisplayScore()).to.be.equal(testData.set2.displayScore)
    })

    // full round text
    it('should return the full round text 1', () => {
        expect(set1.getFullRoundText()).to.be.equal(testData.set1.fullRoundText)
    })
    it('should return the full round text 2', () => {
        expect(set2.getFullRoundText()).to.be.equal(testData.set2.fullRoundText)
    })

    // round
    it('should return the round 1', () => {
        expect(set1.getRound()).to.be.equal(testData.set1.round)
    })
    it('should return the round 2', () => {
        expect(set2.getRound()).to.be.equal(testData.set2.round)
    })

    // state
    it('should return the state 1', () => {
        expect(set1.getState()).to.be.equal(testData.set1.state)
    })
    it('should return the state 2', () => {
        expect(set2.getState()).to.be.equal(testData.set2.state)
    })

    // player 1
    it('should return player1 1', () => {
        expect(set1.getPlayer1()).to.deep.equal(testData.p1)
    })
    it('should return player1 2', () => {
        expect(set2.getPlayer1()).to.deep.equal(testData.p3)
    })

    // player 1 playerId
    it('should return player1 1 playerId', () => {
        expect(set1.getPlayer1PlayerId()).to.be.equal(testData.p1.entrantId)
    })
    it('should return player1 2 playerId', () => {
        expect(set2.getPlayer1PlayerId()).to.be.equal(testData.p3.entrantId)
    })

    // player 1 attendee id
    it('should return player1 1 attendeeId', () => {
        expect(set1.getPlayer1AttendeeIds()).to.have.members(testData.p1.attendeeIds)
    })
    it('should return player1 2 attendeeId', () => {
        expect(set2.getPlayer1AttendeeIds()).to.have.members(testData.p3.attendeeIds)
    })

    // player 2
    it('should return player1 1', () => {
        expect(set1.getPlayer2()).to.deep.equal(testData.p2)
    })
    it('should return player1 2', () => {
        expect(set2.getPlayer2()).to.deep.equal(testData.p4)
    })

    // player 2 playerId
    it('should return player1 1 playerId', () => {
        expect(set1.getPlayer2PlayerId()).to.be.equal(testData.p2.entrantId)
    })
    it('should return player1 2 playerId', () => {
        expect(set2.getPlayer2PlayerId()).to.be.equal(testData.p4.entrantId)
    })

    // player 2 attendee id
    it('should return player1 1 attendeeId', () => {
        expect(set1.getPlayer2AttendeeIds()).to.have.members(testData.p2.attendeeIds)
    })
    it('should return player1 2 attendeeId', () => {
        expect(set2.getPlayer2AttendeeIds()).to.have.members(testData.p4.attendeeIds)
    })

    // getting winner id
    describe('getWinnerId() unit tests', function() {
        it('should give the correct Winner ID 1', () => {
            expect(set1.getWinnerId()).to.deep.equal(testData.set1.winnerId)
        })

        it('should return player 1 when winner id is player 1`s entrant id', async () => {
            let currSet = testData.set1GGSet
            currSet.winnerId = currSet.player1.entrantId

            const res = currSet.getWinnerId();
            expect(res).to.deep.equal(currSet.player1.entrantId)
        })

        it('should return player 2 when winner id is null', async () => {
            let currSet = testData.set1GGSet
            currSet.winnerId = null;

            const res = currSet.getWinnerId();
            expect(res).to.deep.equal(null)
        })
    })

    // getting loser id
    describe('getLoserId() unit tests', function() {
        it('should give the correct Loser ID 1', () => {
            expect(set1.getLoserId()).to.deep.equal(testData.p2.entrantId)
        })

        it('should return player 1 when winner id is player 2`s entrant id', async () => {
            let currSet = testData.set1GGSet;
            currSet.winnerId = currSet.player2.entrantId;

            const res = currSet.getLoserId();
            expect(res).to.deep.equal(currSet.player1.entrantId)
        })

        it('should return player 2 when winner id is player 1`s entrant id', async () => {
            let currSet = testData.set1GGSet
            currSet.winnerId = currSet.player1.entrantId;

            const res = currSet.getLoserId();
            expect(res).to.deep.equal(currSet.player2.entrantId)
        })

        it('should return null when winner id is neither of the two player`s entrant id', async () => {
            let currSet = testData.set1GGSet
            currSet.winnerId = 101;

            const res = currSet.getLoserId();
            expect(res).to.deep.equal(null)
        })
    })

    // getting winner
    describe('getWinner() unit tests', function() {
        it('should give the correct Winner 1', () => {
            expect(set1.getWinner()).to.deep.equal(testData.p1)
        })

        it('should return player 1 when winner id is player 1`s entrant id', async () => {
            let currSet = testData.set1GGSet
            currSet.winnerId = currSet.player1.entrantId

            const res = currSet.getWinner();
            expect(res).to.deep.equal(currSet.player1)
        })

        it('should return player 2 when winner id is player 2`s entrant id', async () => {
            let currSet = testData.set1GGSet
            currSet.winnerId = currSet.player2.entrantId

            const res = currSet.getWinner();
            expect(res).to.deep.equal(currSet.player2)
        })

        it('should return error with specific error message when loser id doesn`t match either player`s entrant ids', async () => {
            let currSet = testData.set1GGSet
            currSet.winnerId = 101;
            let res = null;
            const errorMsg = `Winner ID ${currSet.winnerId} does not match either player ID: [${[currSet.player1.entrantId, currSet.player2.entrantId].join(',')}]`;

            try  {
                currSet.getWinner();
            }
            catch(err) {
                res = err.message
            }
            expect(res).to.deep.equal(errorMsg);
        })

        it('should return error with specific error message when either the winner id or either player`s entrant ids are missing', async () => {
            let currSet = testData.set1GGSet
            currSet.winnerId = null;
            let res = null;
            const errorMsg = `Set (${currSet.id}) must be complete to get the Winning Player`;

            try  {
                currSet.getWinner();
            }
            catch(err) {
                res = err.message
            }
            expect(res).to.deep.equal(errorMsg);
        })
    })

    // getting loser
    describe('getLoser() unit tests', function() {
        it('should give the correct Loser 1 by calls', () => {
            expect(set1.getLoser()).to.deep.equal(testData.p2)
        })

        it('should return player 2 when winner id is player 1`s entrant id', async () => {
            let currSet = testData.set1GGSet
            currSet.winnerId = currSet.player1.entrantId

            const res = currSet.getLoser();
            expect(res).to.deep.equal(currSet.player2)
        })

        it('should return player 1 when winner id is player 2`s entrant id', async () => {
            let currSet = testData.set1GGSet
            currSet.winnerId = currSet.player2.entrantId

            const res = currSet.getLoser();
            expect(res).to.deep.equal(currSet.player1)
        })

        it('should return error with specific error message when loser id doesn`t match either player`s entrant ids', async () => {
            let currSet = testData.set1GGSet
            currSet.winnerId = 101;
            let res = null;
            const errorMsg = `Loser ID does not match either player ID: [${[currSet.player1.entrantId, currSet.player2.entrantId].join(',')}]`;

            try  {
                currSet.getLoser();
            }
            catch(err) {
                res = err.message
            }
            expect(res).to.deep.equal(errorMsg);
        })

        it('should return error with specific error message when either the winner id or either player`s entrant ids are missing', async () => {
            let currSet = testData.set1GGSet
            currSet.winnerId = null;
            let res = null;
            const errorMsg = `Set (${currSet.id}) must be complete to get the Losing Player`;

            try  {
                currSet.getLoser();
            }
            catch(err) {
                res = err.message
            }
            expect(res).to.deep.equal(errorMsg);
        })
    })

    // total games
    it('should give the correct bestOf count 1', () => {
        expect(set1.getBestOfCount()).to.be.equal(5)
    })
    it('should give the correct bestOf count 2', () => {
        expect(set2.getBestOfCount()).to.be.equal(5)
    })

    // Winner score
    describe('getWinnerScore() unit tests', function() {
        it('should give the correct Winner score 1 by calls', () => {
            expect(set1.getWinnerScore()).to.be.equal(3)
        })

        it('should return score 1 when score 1 is winner', async () => {
            let currSet = testData.set1GGSet
            currSet.score1 = 3;
            currSet.score2 = 0;

            const res = currSet.getWinnerScore();
            expect(res).to.be.equal(currSet.score1)
        })

        it('should return score 2 when score 2 is winners', async () => {
            let currSet = testData.set1GGSet
            currSet.score1 = 0;
            currSet.score2 = 3;

            const res = currSet.getWinnerScore();
            expect(res).to.be.equal(currSet.score2)
        })

        it('should return error with error message when set is not completed', async () => {
            let currSet = testData.set1GGSet
            currSet.completedAt = null;
            let res = null;
            const errorMsg = "Cannot get winner score of incomplete set";

            try  {
                currSet.getWinnerScore();
            }
            catch(err) {
                res = err.message
            }
            expect(res).to.be.equal(errorMsg);
        })

        it('should return score 2 when score 1 is null and when score 2 is not null', async () => {
            let currSet = testData.set1GGSet;
            //score1 is null
            currSet.score1 = null;
            currSet.score2 = 2;
            currSet.completedAt = 10000;

            let res = currSet.getWinnerScore();
            expect(res).to.be.equal(currSet.score2);
        })

        it('should return score 1 when score 1 is not null and when score 2 is null', async () => {
            let currSet = testData.set1GGSet;
            //score1 is null
            currSet.score1 = 2;
            currSet.score2 = null;
            currSet.completedAt = 10000;

            let res = currSet.getWinnerScore();
            expect(res).to.be.equal(currSet.score1);
        })
    })

    // Loser score
    describe('getLoserScore() unit tests', function() {
        it('should give the correct Loser score 1 by calls', () => {
            expect(set1.getLoserScore()).to.be.equal(2)
        })

        it('should return score 1 when score 1 is loser', async () => {
            let currSet = testData.set1GGSet
            currSet.score1 = 0;
            currSet.score2 = 3;

            const res = currSet.getLoserScore();
            expect(res).to.be.equal(currSet.score1)
        })

        it('should return score 2 when score 2 is loser', async () => {
            let currSet = testData.set1GGSet
            currSet.score1 = 3;
            currSet.score2 = 0;

            const res = currSet.getLoserScore();
            expect(currSet.getLoserScore()).to.be.equal(currSet.score2)
        })

        it('should return error with error message when set is not completed', async () => {
            let currSet = testData.set1GGSet
            currSet.completedAt = null;
            let res = null;
            const errorMsg = "Cannot get loser score of incomplete set";

            try  {
                currSet.getLoserScore();
            }
            catch(err) {
                res = err.message
            }
            expect(res).to.be.equal(errorMsg);
        })

        it('should return 0 when score 1 is null', async () => {
            let currSet = testData.set1GGSet;
            //score1 is null
            currSet.score1 = null;
            currSet.score2 = 0;
            currSet.completedAt = 10000;

            let res = currSet.getLoserScore();
            expect(res).to.be.equal(0);
        })

        it('should return 0 when score 2 is null', async () => {
            let currSet = testData.set1GGSet;
            //score2 is null
            currSet.score1 = 0;
            currSet.score2 = null;
            currSet.completedAt = 10000;

            let res = currSet.getLoserScore();
            expect(res).to.be.equal(0);
        })
    })

    // games
    it('should get the list of games played in the set 1', async () => {
        const expected = gameData.games1.map(data => Game.parse(data))
        expect(await set1.getGames()).to.have.deep.members(expected)
        return true
    })
    it('should get the list of games played in the set 2', async () => {
        const expected = gameData.games2.map(data => Game.parse(data))
        expect(await set2.getGames()).to.have.deep.members(expected)
        return true
    })
//
//     // entrants
    it('should get the correct entrants who played in the set 1', async () => {
        await testGetEntrants(set1)
    })
    it('should get the correct entrants who played in the set 2', async () => {
        await testGetEntrants(set2)
    })

    // participants
    it('should get the correct attendees who played in the set 1', async () => {
        await testGetAttendees(set1)
    })
    it('should get the correct attendees who played in the set 2', async () => {
        await testGetAttendees(set2)
    })

    describe('mocked sophisticated functions unit tests', function() {
        // getGames()
        it('getGames(), should return the correct mapping for stubbed value for single bracket', async () => {
            const mySet = testData.set1GGSet;
            const niStub = sinon.mock(NI).expects('query').once().returns(gameData.games1Full);

            const res = mySet.getGames();
            sinon.assert.calledOnce(niStub);
            const expected = gameData.games1.map(data => Game.parse(data));
            expect(await res).to.deep.equal(expected)
            niStub.restore();
        })

        // getAttendees(), TODO: Implement function and fix the attendees query to match site schema
//         it('getAttendees(), should return the correct mapping for stubbed value for single bracket', async () => {
//             const mySet = testData.set1GGSet;
//             const niStub = sinon.mock(NI).expects('query').once().returns(testData.set1GGSetSlotAttendeeData);
//
//             const res = mySet.getAttendees();
//             sinon.assert.calledOnce(niStub);
//             expect(JSON.stringify(await res)).to.be.equal(JSON.stringify([]))
//             niStub.restore();
//         })
//
//         // getEntrants(), TODO: Implement function and fix the entrants query to match site schema
//         it('getPhaseGroups(), should return the correct mapping for stubbed value for single bracket', async () => {
//             const myEvent = new Event(822160, 'Get Phase Groups Single', 'gps', null, null, null, null, null, null, null, null, null);
//             const niStub = sinon.mock(NI).expects('query').once().returns(testData.mockedGetPhaseGroupsQueryResponseOfSingleBracket);
//
//             const res = myEvent.getPhaseGroups();
//             sinon.assert.calledOnce(niStub);
//             expect(JSON.stringify(await res)).to.be.equal(JSON.stringify(testData.expectedGetPhaseGroupsReturnValueOfSingleBracket))
//             niStub.restore();
//         })
    })

// 	xit('should give the correct Bracket ID', (done) => {
// 		// expect(set1.getBracketId()).to.be.equal('58df119c60fbb')
// 		// expect(set2.getBracketId()).to.be.equal('58df119c60fbb')
// 		done()
// 	})

// 	xit('should give the correct Winners Tournament Placement', (done) => {
// 		/*
// 		let winner1 = set1.getWinner() as Player
// 		let data1 = winner1.data as IPlayer.Entity
// 		expect(set1.getWinnersTournamentPlacement()).to.be.equal(data1.finalPlacement)
//
// 		done()
// 		*/
// 	})

// 	xit('should give the correct Winners Tournament Placement 2', (done) => {
// 		/*
// 		let winner2 = set2.getWinner() as Player
// 		let data2 = winner2.data as IPlayer.Entity
// 		expect(set2.getWinnersTournamentPlacement()).to.be.equal(data2.finalPlacement)
//
// 		done()
// 		*/
// 	})

// 	xit('should give the correct Losers Tournament Placement', (done) => {
// 		/*
// 		let loser1 = set1.getLoser() as Player
// 		let data1 = loser1.data as IPlayer.Entity
// 		expect(set1.getLosersTournamentPlacement()).to.be.equal(data1.finalPlacement)
//
// 		done()
// 		*/
// 	})

// 	xit('should give the correct Losers Tournament Placement 2', (done) => {
// 		/*
// 		let loser2 = set2.getLoser() as Player
// 		let data2 = loser2.data as IPlayer.Entity
// 		expect(set2.getLosersTournamentPlacement()).to.be.equal(data2.finalPlacement)
//
// 		done()
// 		*/
// 	})

// 	xit('should give the correct Midsize Round Text', (done) => {
// 		/*
// 		expect(set1.getMidsizeRoundText()).to.be.equal('Winners 1')
// 		expect(set2.getMidsizeRoundText()).to.be.equal('Winners Quarters')
// 		done()
// 		*/
// 	})
})

async function testGetEntrants(set: IGGSet){
    const arr: IEntrant[] = await set.getEntrants()

    arr.forEach(entrant => {
        expect(entrant).to.be.an.instanceof(Entrant)
        expect(
            arr.filter(x => x.getId() === entrant.getId()).length,
            'Phase Group array must not have duplicates! Found: ' + entrant.getId()
        ).to.be.equal(1)
    })
    expect(arr.length).to.be.equal(2)
    return true
}

async function testGetAttendees(set: IGGSet){
    const arr: IAttendee[] = await set.getAttendees()

    arr.forEach(attendee => {
        expect(attendee).to.be.an.instanceof(Attendee)
        expect(
            arr.filter(x => x.getId() === attendee.getId()).length,
            'Phase Group array must not have duplicates! Found: ' + attendee.getId()
        ).to.be.equal(1)
    })
    expect(arr.length).to.be.equal(2)
    return true
}
