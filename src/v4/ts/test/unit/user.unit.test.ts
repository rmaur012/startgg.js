import path from 'path'
const ROOT = path.join(__dirname, '..', '..', '..', '..', '.env')
import {config} from 'dotenv'
config({path: ROOT})

import '../../lib/util/ErrorHandler'

import {expect} from 'chai'
import sinon from 'sinon'
import {User} from '../../lib/models/User'
import NI from '../../lib/util/NetworkInterface'
import * as testData from '../data/user.testData'

const USER_ID_1 = 95277 // Davemon
const USER_ID_2 = 25927  // Mike G
const DAVID_MONSTER_PLACEMENTS = [
    {
        'placement': 5,
        'container': {
            'id': 590520,
            'name': 'Melee singles',
            'tournament': {
                'name': 'Phaze Kraze Smash Weekly #2 6/30'
            }
        }
    },
    {
        'placement': 4,
        'container': {
            'id': 366003,
            'name': 'Melee Singles',
            'tournament': {
              'name': 'Anchor Down Smash #13'
            }
        }
    },
    {
        'placement': 129,
        'container': {
            'id': 317251,
            'name': 'Melee - 1v1 Singles',
            'tournament': {
              'name': 'Super Smash Con 2019'
            }
        }
    }
]

const MIKE_G_PLACEMENTS = [
        {
          'placement': 25,
          'container': {
            'id': 433931,
            'name': 'Tekken 7',
            'tournament': {
              'name': '4o4 FIGHT NIGHT X'
            }
          }
        },
        {
          'placement': 65,
          'container': {
            'id': 23596,
            'name': 'Melee Singles',
            'tournament': {
              'name': 'Tipped Off 12 , Presented by The Lab Gaming Center!'
            }
          }
        },
        {
          'placement': 33,
          'container': {
            'id': 23597,
            'name': 'Melee Doubles',
            'tournament': {
              'name': 'Tipped Off 12 , Presented by The Lab Gaming Center!'
            }
          }
        }
      ]

describe('startgg User (has some pending)', () => {
    describe('mocked sophisticated functions unit tests', () => {
        // getRecentSets()
        it('getRecentSets(), should return 14 recent sets for Gluttony', async () => {
            const myUser = new User(USER_ID_1, 'Great Bio', 'DIS', 'He/Him', null, null, null, null)
            const niStub = sinon.mock(NI).expects('query').once().returns(testData.mockedGluttonyRecentSetsResponse)

            const res = await myUser.getRecentSets()
            sinon.assert.calledOnce(niStub)
            expect(res.length).to.be.equal(14)
            niStub.restore()
        })

        // getRecentStandings()
        it('getRecentStandings(), should return the correct standings for stubbed value for user', async () => {
            const myUser = new User(USER_ID_1, 'Great Bio', 'DIS', 'He/Him', null, null, null, null)
            const niStub = sinon.mock(NI).expects('query').once().returns(testData.mockedUserRecentStandingsResponse)

            const res = myUser.getRecentStandings()
            sinon.assert.calledOnce(niStub)
            expect(JSON.stringify(await res)).to.be.equal(JSON.stringify(testData.mockedUserRecentStandingsRankingsResult))
            niStub.restore()
        })
    })
})
