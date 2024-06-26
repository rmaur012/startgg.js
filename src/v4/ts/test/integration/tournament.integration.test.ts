import path from 'path'
const ROOT = path.join(__dirname, '..', '..', '..', '..', '.env')
import {config} from 'dotenv'
config({path: ROOT})

import _ from 'lodash'
import '../../lib/util/ErrorHandler'

import chai from 'chai'
import cap from 'chai-as-promised'
import moment from 'moment'
chai.use(cap)
const {expect} = chai

import {IAttendee} from '../../lib/interfaces/IAttendee'
import {IEntrant} from '../../lib/interfaces/IEntrant'
import {IEvent} from '../../lib/interfaces/IEvent'
import {IGGSet} from '../../lib/interfaces/IGGSet'
import {IPhase} from '../../lib/interfaces/IPhase'
import {IPhaseGroup} from '../../lib/interfaces/IPhaseGroup'
import {ITournament} from '../../lib/interfaces/ITournament'

import {Attendee} from '../../lib/models/Attendee'
import {Entrant} from '../../lib/models/Entrant'
import {Event} from '../../lib/models/Event'
import {GGSet} from '../../lib/models/GGSet'
import {Phase} from '../../lib/models/Phase'
import {PhaseGroup} from '../../lib/models/PhaseGroup'
import {Tournament} from '../../lib/models/Tournament'
import Initializer from '../../lib/util/Initializer'
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
    this.timeout(10000)

    before(async function() {
        this.timeout(20000)

        Initializer(process.env.API_TOKEN!)
        console.log('Getting tourneys by id...')
        const ti1 = await Tournament.getById(TOURNAMENT_ID_1)
        const ti2 = await Tournament.getById(TOURNAMENT_ID_2)
        const ti4 = await Tournament.getById(TOURNAMENT_ID_4)
        console.log('Getting tourneys by slug...')
        const ts1 = await Tournament.get(TOURNAMENT_SLUG_1)
        const ts2 = await Tournament.get(TOURNAMENT_SLUG_2)
        const ts4 = await Tournament.get(TOURNAMENT_SLUG_4)

        expect(ti1).to.deep.equal(ts1)
        expect(ti2).to.deep.equal(ts2)
        expect(ti4).to.deep.equal(ts4)

        tournament1 = ti1
        tournament2 = ti2
        tournament4 = ti4

        return true
    })

    // id
    it('should get the correct tournament id 1', () => {
        expect(tournament1.getId()).to.be.equal(testData.tournament1.id)
    })
    it('should get the correct tournament id 2', () => {
        expect(tournament2.getId()).to.be.equal(testData.tournament2.id)
    })

    // name
    it('should get the correct tournament name 1', () => {
        expect(tournament1.getName()).to.be.equal(testData.tournament1.name)
    })
    it('should get the correct tournament name 2', () => {
        expect(tournament2.getName()).to.be.equal(testData.tournament2.name)
    })

    // slug
    it('should get the correct tournament slug 1', () => {
        expect(tournament1.getSlug()).to.be.equal(testData.tournament1.slug)
    })
    it('should get the correct tournament slug 2', () => {
        expect(tournament2.getSlug()).to.be.equal(testData.tournament2.slug)
    })

    // timezone
    it('should get the correct tournament timezone 1', () => {
        expect(tournament1.getTimezone()).to.be.equal(testData.tournament1.timezone)
    })
    it('should get the correct tournament timezone 2', () => {
        expect(tournament2.getTimezone()).to.be.equal(testData.tournament2.timezone)
    })

    // start time
    it('should get the correct tournament end time 1', () => {
        expect(moment(tournament1.getStartTime()).isSame(moment.unix(testData.tournament1.startAt!).toDate())).to.be.true
    })
    it('should get the correct tournament end time 2', () => {
        expect(moment(tournament2.getStartTime()).isSame(moment.unix(testData.tournament2.startAt!).toDate())).to.be.true
    })

    // start time string
    it('should get the correct tournament start time 1', () => {
        expect(tournament1.getStartTimeString()).to.be.equal(String(moment.unix(testData.tournament1.startAt!).toDate()))
    })
    it('should get the correct tournament start time 2', () => {
        expect(tournament2.getStartTimeString()).to.be.equal(String(moment.unix(testData.tournament2.startAt!).toDate()))
    })

    // end time
    it('should get the correct tournament end time 1', () => {
        expect(moment(tournament1.getEndTime()).isSame(moment.unix(testData.tournament1.endAt!).toDate())).to.be.true
    })
    it('should get the correct tournament end time 2', () => {
        expect(moment(tournament2.getEndTime()).isSame(moment.unix(testData.tournament2.endAt!).toDate())).to.be.true
    })

    // end time string
    it('should get the correct tournament end time 1', () => {
        expect(tournament1.getEndTimeString()).to.be.equal(String(moment.unix(testData.tournament1.endAt!).toDate()))
    })
    it('should get the correct tournament end time 2', () => {
        expect(tournament2.getEndTimeString()).to.be.equal(String(moment.unix(testData.tournament2.endAt!).toDate()))
    })

    // venue
    it('should get the correct tournament venue 1', () => {
        expect(tournament1.getVenue()).to.deep.equal(testData.venue1)
    })
    it('should get the correct tournament venue 2', () => {
        expect(tournament2.getVenue()).to.deep.equal(testData.venue2)
    })

    // venue name
    it('should get the correct tournament venue name 1', () => {
        expect(tournament1.getVenueName()).to.be.equal(testData.tournament1.venueName)
        expect(tournament1.getVenueName()).to.be.equal(testData.venue1.getName())
    })
    it('should get the correct tournament venue name 2', () => {
        expect(tournament2.getVenueName()).to.be.equal(testData.tournament2.venueName)
        expect(tournament2.getVenueName()).to.be.equal(testData.venue2.getName())
    })

    // venue city
    it('should get the correct tournament venue city 1', () => {
        expect(tournament1.getCity()).to.be.equal(testData.tournament1.city)
        expect(tournament1.getCity()).to.be.equal(testData.venue1.getCity())
    })
    it('should get the correct tournament venue city 2', () => {
        expect(tournament2.getCity()).to.be.equal(testData.tournament2.city)
        expect(tournament2.getCity()).to.be.equal(testData.venue2.getCity())
    })

    // address
    it('should get the correct tournament venue address 1', () => {
        expect(tournament1.getAddress()).to.be.equal(testData.tournament1.venueAddress)
        expect(tournament1.getAddress()).to.be.equal(testData.venue1.getAddress())
    })
    it('should get the correct tournament venue address 2', () => {
        expect(tournament2.getAddress()).to.be.equal(testData.tournament2.venueAddress)
        expect(tournament2.getAddress()).to.be.equal(testData.venue2.getAddress())
    })

    // state
    it('should get the correct tournament venue state 1', () => {
        expect(tournament1.getState()).to.be.equal(testData.tournament1.addrState)
        expect(tournament1.getState()).to.be.equal(testData.venue1.getState())
    })
    it('should get the correct tournament venue state 2', () => {
        expect(tournament2.getState()).to.be.equal(testData.tournament2.addrState)
        expect(tournament2.getState()).to.be.equal(testData.venue2.getState())
    })

    // zip code
    it('should get the correct tournament venue zip code 1', () => {
        expect(tournament1.getZipCode()).to.be.equal(testData.tournament1.postalCode)
        expect(tournament1.getZipCode()).to.be.equal(testData.venue1.getPostalCode())
    })
    it('should get the correct tournament venue zip code 2', () => {
        expect(tournament2.getZipCode()).to.be.equal(testData.tournament2.postalCode)
        expect(tournament2.getZipCode()).to.be.equal(testData.venue2.getPostalCode())
    })

    /*attendee search*/
    it('should correctly search attendees and find a match', async () => {
        const searched: IAttendee[] | null = await tournament1.searchAttendees('Tweek')
        expect(searched).to.not.be.null
        expect(searched!.length).to.be.greaterThan(0)
        expect(searched![0].getGamerTag()).to.be.equal('Tweek')
    })

    it('should correctly search attendees and find no match', async () => {
        const searched: IAttendee[] | null = await tournament1.searchAttendees('GAwes2')
        expect(searched).to.be.null
    })

    it('should correctly search attendees and find multiple matches', async () => {
        const searched: IAttendee[] | null = await tournament1.searchAttendees('GA')
        expect(searched).to.not.be.null
        expect(searched!.length).to.be.greaterThan(0)
        expect(searched![0].getGamerTag()).to.be.equal('GatoDelFuego')
        expect(searched![1].getGamerTag()).to.be.equal('Gackt')
        expect(searched![2].getGamerTag()).to.be.equal('Game 3')
    })

//     Tests commented due to filtering by sponsors not working properly on start.gg
// 	it('should correctly search attendees by prefix and find no match', async () => {
// 		const searched: IAttendee[] | null = await tournament1.searchAttendeesBySponsorTag('faketaglol')
// 		expect(searched).to.be.null
// 	})
//
// 	it('should lower case an upper case prefix on sponsor tag search', async () => {
// 		const searched: IAttendee[] | null = await tournament1.searchAttendeesBySponsorTag('TSM')
// 		expect(searched).to.not.be.null
// 		expect(searched!.length).to.be.greaterThan(0)
// 		expect(searched![0].getGamerTag()).to.be.equal('Tweek')
// 	})
//
// 	it('should correctly search attendees by prefix and find a match', async () => {
// 		const searched: IAttendee[] | null = await tournament1.searchAttendeesBySponsorTag('rcs')
// 		expect(searched).to.not.be.null
// 		expect(searched!.length).to.be.greaterThan(0)
// 		expect(searched![0].getGamerTag()).to.be.equal('KPAN')
// 	})
//
// 	it('should correctly search attendees by prefix and find more than one match', async () => {
// 		const searched: IAttendee[] | null = await tournament1.searchAttendeesBySponsorTag('ss')
// 		expect(searched).to.not.be.null
// 		expect(searched!.length).to.be.greaterThan(0)
// 		expect(searched![0].getGamerTag()).to.be.equal('FullMetal')
// 		expect(searched![1].getGamerTag()).to.be.equal('Stango')
// 		expect(searched![2].getGamerTag()).to.be.equal('Colbol')
// 		expect(searched![3].getGamerTag()).to.be.equal('Flow')
// 	})

    // getEvents
    it('should return the correct list of Events in the Tournament 1', async () => {
        const events = await tournament1.getEvents()

        expect(events.length).to.be.equal(7)
        const hasDuplicates = (a: IEvent[]) => {
            return _.uniq(a).length !== a.length
        }
        expect(hasDuplicates(events)).to.be.false
        events.forEach(event => {
            expect(event).to.be.an.instanceof(Event)
        })
        return true
    }).timeout(30000)

    // getPhases
    it('should return the correct list of Phases in the Tournament 1', async () => {
        const phases = await tournament1.getPhases()

        expect(phases.length).to.be.equal(16)
        const hasDuplicates = (a: IPhase[]) => {
            return _.uniq(a).length !== a.length
        }
        expect(hasDuplicates(phases)).to.be.false
        phases.forEach(phase => {
            expect(phase).to.be.an.instanceof(Phase)
        })
        return true
    }).timeout(30000)

    // getPhaseGroups
    it('should return the correct list of Phases in the Tournament 1', async () => {
        const pgs = await tournament1.getPhaseGroups()

        expect(pgs.length).to.be.equal(52)
        const hasDuplicates = (a: IPhaseGroup[]) => {
            return _.uniq(a).length !== a.length
        }
        expect(hasDuplicates(pgs)).to.be.false
        pgs.forEach(phase => {
            expect(phase).to.be.an.instanceof(PhaseGroup)
        })
        return true
    }).timeout(30000)

    // getSets, using small bracket
    it('should return the correct list of Sets in the Tournament 1', async () => {
        const sets = await tournament4.getSets()

        expect(sets.length).to.be.equal(30)
        const hasDuplicates = (a: IGGSet[]) => {
            return _.uniq(a).length !== a.length
        }
        expect(hasDuplicates(sets)).to.be.false
        sets.forEach(set => {
            expect(set).to.be.an.instanceof(GGSet)
        })
        return true
    }).timeout(30000)

    // getEntrants, using small bracket
    it('should return the correct list of Entrants in the Tournament 1', async () => {
        const entrants = await tournament4.getEntrants()

        expect(entrants.length).to.be.equal(16)
        const hasDuplicates = (a: IEntrant[]) => {
            return _.uniq(a).length !== a.length
        }
        expect(hasDuplicates(entrants)).to.be.false
        entrants.forEach(entrant => {
            expect(entrant).to.be.an.instanceof(Entrant)
        })
        return true
    }).timeout(30000)

    // getAttendees
    it('should return the correct list of Attendees in the Tournament 1', async () => {
        const attendees = await tournament4.getAttendees()

        expect(attendees.length).to.be.equal(16)
        const hasDuplicates = (a: IAttendee[]) => {
            return _.uniq(a).length !== a.length
        }
        expect(hasDuplicates(attendees)).to.be.false
        attendees.forEach(attendee => {
            expect(attendee).to.be.an.instanceof(Attendee)
        })
        return true
    }).timeout(30000)
})
