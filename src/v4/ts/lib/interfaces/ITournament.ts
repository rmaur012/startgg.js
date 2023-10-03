
import {IAttendee, IAttendeeOptions, IAttendeePaginatedData} from './IAttendee'
import {IEntrant, IEntrantData, IEntrantOptions} from './IEntrant'
import {IEvent, IEventData} from './IEvent'
import {IGGSet, IGGSetData, IGGSetOptions} from './IGGSet'
import {IPhase, IPhaseData} from './IPhase'
import {IPhaseGroup, IPhaseGroupData} from './IPhaseGroup'
import {IVenue} from './IVenue'

export interface ITournament{
    // id: number
    // name: string
    // slug: string
    // startTime: Date | null
    // endTime: Date | null
    // timezone: string | null
    // venue: Venue

    getId(): number,
    getName(): string ,
    getSlug(): string,
    getTimezone(): string | null,
    getStartTime(): Date | null,
    getStartTimeString(): string | null,
    getEndTime(): Date | null,
    getEndTimeString(): string | null,
    getVenue(): IVenue,
    getVenueName(): string | null,
    getCity(): string | null,
    getState(): string | null,
    getAddress(): string | null,
    getZipCode(): string | null,

    getEvents(): Promise<IEvent[]>,
    getPhases(): Promise<IPhase[]>,
    getPhaseGroups(): Promise<IPhaseGroup[]>,
    searchAttendees(smashtag: string): Promise<IAttendee[] | null>,

    // Currently not available since it does not work in start.gg
    // searchAttendeesBySponsorTag(sponsorTag: string): Promise<IAttendee[] | null>


	getSets(options?: IGGSetOptions) : Promise<IGGSet[]>
	getEntrants(options?: IEntrantOptions) : Promise<IEntrant[]>
	getAttendees(options?: IAttendeeOptions) : Promise<IAttendee[]>
	/*
	getIncompleteSets(options: IGGSet.SetOptions) : Promise<GGSet[]>
	getCompletedSets(options: IGGSet.SetOptions) : Promise<GGSet[]>
	getSetsXMinutesBack(minutesBack: number, options: IGGSet.SetOptions) : Promise<GGSet[]>
	*/
}

export interface ITournamentDataFull{
    tournament: ITournamentData
}

export interface ITournamentData{
    id: number
    name: string
    slug: string
    city: string | null
    postalCode: string | null
    addrState: string | null
    countryCode: string | null
    venueAddress: string | null
    venueName: string | null
    lat: number | null
    lng: number | null
    timezone: string | null
    startAt: number | null
    endAt: number | null
}

export interface ITournamentEventData{
    tournament: {
        events: IEventData[]
    }
}

export interface ITournamentPhaseData{
    tournament: {
        events: {
            id: number,
            phases: IPhaseData[]
        }[]
    }
}

export interface ITournamentPhaseGroupData{
    tournament: {
        events: {
            id: number,
            phaseGroups: IPhaseGroupData[]
        }[]
    }
}

export interface ITournamentAttendeeData{
    tournament: {
        participants: IAttendeePaginatedData[]
    }
}

export interface ITournamentEntrantData{
    tournament: {
        events: {
            entrant: IEntrantData[]
        }[]
    }
}

export interface ITournamentSetData{
    tournament: {
        events: {
            phaseGroups: {
                paginatedSets: {
                    pageInfo?: {
                        totalPages: number
                    },
                    nodes: IGGSetData[]
                }
            }[]
        }[]
    }
}
