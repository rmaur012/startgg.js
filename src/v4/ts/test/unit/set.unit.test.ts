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

import { IGGSet } from '../../lib/interfaces/IGGSet'

import {Game} from '../../lib/models/Game'
import NI from '../../lib/util/NetworkInterface'
import * as gameData from '../data/games.testData'
import * as testData from '../data/sets.testData'

let set1: IGGSet, set2: IGGSet
const SET_ID_1 = +'54170233'
const SET_ID_2 = +'51002303'

describe('startgg Set (has still pending)', function() {
    // getting winner id
    describe('getWinnerId() unit tests', () => {
        it('should return player 1 when winner id is player 1`s entrant id', async () => {
            const currSet = testData.set1GGSet
            currSet.winnerId = currSet.player1.entrantId

            const res = currSet.getWinnerId()
            expect(res).to.deep.equal(currSet.player1.entrantId)
        })

        it('should return player 2 when winner id is null', async () => {
            const currSet = testData.set1GGSet
            currSet.winnerId = null

            const res = currSet.getWinnerId()
            expect(res).to.deep.equal(null)
        })
    })

    // getting loser id
    describe('getLoserId() unit tests', () => {
        it('should return player 1 when winner id is player 2`s entrant id', async () => {
            const currSet = testData.set1GGSet
            currSet.winnerId = currSet.player2.entrantId

            const res = currSet.getLoserId()
            expect(res).to.deep.equal(currSet.player1.entrantId)
        })

        it('should return player 2 when winner id is player 1`s entrant id', async () => {
            const currSet = testData.set1GGSet
            currSet.winnerId = currSet.player1.entrantId

            const res = currSet.getLoserId()
            expect(res).to.deep.equal(currSet.player2.entrantId)
        })

        it('should return null when winner id is neither of the two player`s entrant id', async () => {
            const currSet = testData.set1GGSet
            currSet.winnerId = 101

            const res = currSet.getLoserId()
            expect(res).to.deep.equal(null)
        })
    })

    // getting winner
    describe('getWinner() unit tests', () => {
        it('should return player 1 when winner id is player 1`s entrant id', async () => {
            const currSet = testData.set1GGSet
            currSet.winnerId = currSet.player1.entrantId

            const res = currSet.getWinner()
            expect(res).to.deep.equal(currSet.player1)
        })

        it('should return player 2 when winner id is player 2`s entrant id', async () => {
            const currSet = testData.set1GGSet
            currSet.winnerId = currSet.player2.entrantId

            const res = currSet.getWinner()
            expect(res).to.deep.equal(currSet.player2)
        })

        it('should return error with specific error message when loser id doesn`t match either player`s entrant ids', async () => {
            const currSet = testData.set1GGSet
            currSet.winnerId = 101
            let res = null
            const errorMsg = `Winner ID ${currSet.winnerId} does not match either player ID: [${[currSet.player1.entrantId, currSet.player2.entrantId].join(',')}]`

            try  {
                currSet.getWinner()
            }
            catch(err) {
                res = err.message
            }
            expect(res).to.deep.equal(errorMsg)
        })

        it('should return error with specific error message when either the winner id or either player`s entrant ids are missing', async () => {
            const currSet = testData.set1GGSet
            currSet.winnerId = null
            let res = null
            const errorMsg = `Set (${currSet.id}) must be complete to get the Winning Player`

            try  {
                currSet.getWinner()
            }
            catch(err) {
                res = err.message
            }
            expect(res).to.deep.equal(errorMsg)
        })
    })

    // getting loser
    describe('getLoser() unit tests', () => {
        it('should return player 2 when winner id is player 1`s entrant id', async () => {
            const currSet = testData.set1GGSet
            currSet.winnerId = currSet.player1.entrantId

            const res = currSet.getLoser()
            expect(res).to.deep.equal(currSet.player2)
        })

        it('should return player 1 when winner id is player 2`s entrant id', async () => {
            const currSet = testData.set1GGSet
            currSet.winnerId = currSet.player2.entrantId

            const res = currSet.getLoser()
            expect(res).to.deep.equal(currSet.player1)
        })

        it('should return error with specific error message when loser id doesn`t match either player`s entrant ids', async () => {
            const currSet = testData.set1GGSet
            currSet.winnerId = 101
            let res = null
            const errorMsg = `Loser ID does not match either player ID: [${[currSet.player1.entrantId, currSet.player2.entrantId].join(',')}]`

            try  {
                currSet.getLoser()
            }
            catch(err) {
                res = err.message
            }
            expect(res).to.deep.equal(errorMsg)
        })

        it('should return error with specific error message when either the winner id or either player`s entrant ids are missing', async () => {
            const currSet = testData.set1GGSet
            currSet.winnerId = null
            let res = null
            const errorMsg = `Set (${currSet.id}) must be complete to get the Losing Player`

            try  {
                currSet.getLoser()
            }
            catch(err) {
                res = err.message
            }
            expect(res).to.deep.equal(errorMsg)
        })
    })

    // Winner score
    describe('getWinnerScore() unit tests', () => {
        it('should return score 1 when score 1 is winner', async () => {
            const currSet = testData.set1GGSet
            currSet.score1 = 3
            currSet.score2 = 0

            const res = currSet.getWinnerScore()
            expect(res).to.be.equal(currSet.score1)
        })

        it('should return score 2 when score 2 is winners', async () => {
            const currSet = testData.set1GGSet
            currSet.score1 = 0
            currSet.score2 = 3

            const res = currSet.getWinnerScore()
            expect(res).to.be.equal(currSet.score2)
        })

        it('should return error with error message when set is not completed', async () => {
            const currSet = testData.set1GGSet
            currSet.completedAt = null
            let res = null
            const errorMsg = 'Cannot get winner score of incomplete set'

            try  {
                currSet.getWinnerScore()
            }
            catch(err) {
                res = err.message
            }
            expect(res).to.be.equal(errorMsg)
        })

        it('should return score 2 when score 1 is null and when score 2 is not null', async () => {
            const currSet = testData.set1GGSet
            // score1 is null
            currSet.score1 = null
            currSet.score2 = 2
            currSet.completedAt = 10000

            const res = currSet.getWinnerScore()
            expect(res).to.be.equal(currSet.score2)
        })

        it('should return score 1 when score 1 is not null and when score 2 is null', async () => {
            const currSet = testData.set1GGSet
            // score1 is null
            currSet.score1 = 2
            currSet.score2 = null
            currSet.completedAt = 10000

            const res = currSet.getWinnerScore()
            expect(res).to.be.equal(currSet.score1)
        })
    })

    // Loser score
    describe('getLoserScore() unit tests', () => {
        it('should return score 1 when score 1 is loser', async () => {
            const currSet = testData.set1GGSet
            currSet.score1 = 0
            currSet.score2 = 3

            const res = currSet.getLoserScore()
            expect(res).to.be.equal(currSet.score1)
        })

        it('should return score 2 when score 2 is loser', async () => {
            const currSet = testData.set1GGSet
            currSet.score1 = 3
            currSet.score2 = 0

            const res = currSet.getLoserScore()
            expect(currSet.getLoserScore()).to.be.equal(currSet.score2)
        })

        it('should return error with error message when set is not completed', async () => {
            const currSet = testData.set1GGSet
            currSet.completedAt = null
            let res = null
            const errorMsg = 'Cannot get loser score of incomplete set'

            try  {
                currSet.getLoserScore()
            }
            catch(err) {
                res = err.message
            }
            expect(res).to.be.equal(errorMsg)
        })

        it('should return 0 when score 1 is null', async () => {
            const currSet = testData.set1GGSet
            // score1 is null
            currSet.score1 = null
            currSet.score2 = 0
            currSet.completedAt = 10000

            const res = currSet.getLoserScore()
            expect(res).to.be.equal(0)
        })

        it('should return 0 when score 2 is null', async () => {
            const currSet = testData.set1GGSet
            // score2 is null
            currSet.score1 = 0
            currSet.score2 = null
            currSet.completedAt = 10000

            const res = currSet.getLoserScore()
            expect(res).to.be.equal(0)
        })
    })

    describe('mocked sophisticated functions unit tests', () => {
        // getGames()
        it('getGames(), should return the correct mapping for stubbed value for single bracket', async () => {
            const mySet = testData.set1GGSet
            const niStub = sinon.mock(NI).expects('query').once().returns(gameData.games1Full)

            const res = mySet.getGames()
            sinon.assert.calledOnce(niStub)
            const expected = gameData.games1.map(data => Game.parse(data))
            expect(await res).to.deep.equal(expected)
            niStub.restore()
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