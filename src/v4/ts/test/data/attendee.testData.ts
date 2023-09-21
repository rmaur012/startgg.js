import {
    IAttendeeData,
    IAttendeeDataFull
} from '../../lib/interfaces/IAttendee'

export const participant1Data: IAttendeeData = {
    id: 1148324,
    gamerTag: 'Mew2King',
    prefix: 'MVG FOX',
    createdAt: 1507144428,
    claimed: true,
    verified: true,
    playerId: 1003,
    phoneNumber: null,
    contactInfo: {
        id: 'participants_1148324',
        city: 'Orlando',
        state: 'FL',
        stateId: null,
        country: 'United States',
        countryId: null,
        name: 'Jason Zimmerman',
        nameFirst: 'Jason',
        nameLast: 'Zimmerman',
        zipcode: null
    },
    connectedAccounts: null,
    events: [
        {
            id: 23596
        },
        {
            id: 23597
        },
        {
            id: 23598
        },
        {
            id: 23599
        },
        {
            id: 23600
        }
    ]
}

export const participant2Data: IAttendeeData = {
    id: 928500,
    gamerTag: 'NIX',
    prefix: 'OeS',
    createdAt: 1499705847,
    claimed: true,
    verified: true,
    playerId: 137417,
    phoneNumber: null,
    contactInfo: {
        id: 'participants_928500',
        city: 'Powdersville',
        state: 'SC',
        stateId: null,
        country: 'United States',
        countryId: null,
        name: 'Davis Robertson',
        nameFirst: 'Davis',
        nameLast: 'Robertson',
        zipcode: null
    },
    connectedAccounts: null,
    events: [
        {
        id: 23596
        },
        {
        id: 23597
        }
    ]
}

export const attendee1Data: IAttendeeDataFull = {
    participant: participant1Data
}

export const attendee2Data: IAttendeeDataFull = {
    participant: participant2Data
}

// getEnteredPhases()
export const mockedAttendeePhasesQueryResponse = {"participant":{"entrants":[{"seeds":[{"id":5981209,"phase":{"id":100046,"event":{"id":23596,"name":"Melee Singles","slug":"tournament/tipped-off-12-presented-by-the-lab-gaming-center/event/melee-singles"},"groupCount":16,"name":"Bracket Pools","numSeeds":249,"waves":[{"id":17271,"identifier":"A","startAt":1510416000},{"id":17271,"identifier":"A","startAt":1510416000},{"id":17271,"identifier":"A","startAt":1510416000},{"id":17271,"identifier":"A","startAt":1510416000},{"id":17272,"identifier":"B","startAt":1510423200},{"id":17272,"identifier":"B","startAt":1510423200},{"id":17272,"identifier":"B","startAt":1510423200},{"id":17272,"identifier":"B","startAt":1510423200},{"id":17273,"identifier":"C","startAt":1510430400},{"id":17273,"identifier":"C","startAt":1510430400},{"id":17273,"identifier":"C","startAt":1510430400},{"id":17273,"identifier":"C","startAt":1510430400},{"id":17274,"identifier":"D","startAt":1510437600},{"id":17274,"identifier":"D","startAt":1510437600},{"id":17274,"identifier":"D","startAt":1510437600},{"id":17274,"identifier":"D","startAt":1510437600}]}},{"id":6241470,"phase":{"id":132397,"event":{"id":23596,"name":"Melee Singles","slug":"tournament/tipped-off-12-presented-by-the-lab-gaming-center/event/melee-singles"},"groupCount":1,"name":"Top 48","numSeeds":48,"waves":[{"id":21062,"identifier":"J","startAt":1510520400}]}},{"id":6254816,"phase":{"id":172834,"event":{"id":23596,"name":"Melee Singles","slug":"tournament/tipped-off-12-presented-by-the-lab-gaming-center/event/melee-singles"},"groupCount":1,"name":"Top 8","numSeeds":8,"waves":null}}]},{"seeds":[{"id":6241588,"phase":{"id":132405,"event":{"id":23597,"name":"Melee Doubles","slug":"tournament/tipped-off-12-presented-by-the-lab-gaming-center/event/melee-doubles"},"groupCount":1,"name":"Top 24","numSeeds":24,"waves":null}},{"id":6245738,"phase":{"id":100047,"event":{"id":23597,"name":"Melee Doubles","slug":"tournament/tipped-off-12-presented-by-the-lab-gaming-center/event/melee-doubles"},"groupCount":8,"name":"Bracket Pools","numSeeds":61,"waves":[{"id":17279,"identifier":"E","startAt":1510441200},{"id":17279,"identifier":"E","startAt":1510441200},{"id":17279,"identifier":"E","startAt":1510441200},{"id":17279,"identifier":"E","startAt":1510441200},{"id":17280,"identifier":"F","startAt":1510444800},{"id":17280,"identifier":"F","startAt":1510444800},{"id":17280,"identifier":"F","startAt":1510444800},{"id":17280,"identifier":"F","startAt":1510444800}]}}]},{"seeds":[{"id":5981208,"phase":{"id":100048,"event":{"id":23598,"name":"Wii U Singles","slug":"tournament/tipped-off-12-presented-by-the-lab-gaming-center/event/wii-u-singles"},"groupCount":8,"name":"Bracket","numSeeds":70,"waves":[{"id":17271,"identifier":"A","startAt":1510416000},{"id":17272,"identifier":"B","startAt":1510423200},{"id":17272,"identifier":"B","startAt":1510423200},{"id":17274,"identifier":"D","startAt":1510437600},{"id":17273,"identifier":"C","startAt":1510430400},{"id":17273,"identifier":"C","startAt":1510430400},{"id":17271,"identifier":"A","startAt":1510416000},{"id":17274,"identifier":"D","startAt":1510437600}]}},{"id":6279525,"phase":{"id":173658,"event":{"id":23598,"name":"Wii U Singles","slug":"tournament/tipped-off-12-presented-by-the-lab-gaming-center/event/wii-u-singles"},"groupCount":1,"name":"Top 24","numSeeds":24,"waves":null}},{"id":6279556,"phase":{"id":132417,"event":{"id":23598,"name":"Wii U Singles","slug":"tournament/tipped-off-12-presented-by-the-lab-gaming-center/event/wii-u-singles"},"groupCount":1,"name":"Top 8","numSeeds":8,"waves":null}}]},{"seeds":[{"id":6246825,"phase":{"id":100049,"event":{"id":23599,"name":"Wii U Doubles","slug":"tournament/tipped-off-12-presented-by-the-lab-gaming-center/event/wii-u-doubles"},"groupCount":1,"name":"Bracket","numSeeds":16,"waves":null}}]},{"seeds":[{"id":6270131,"phase":{"id":100050,"event":{"id":23600,"name":"PM Singles","slug":"tournament/tipped-off-12-presented-by-the-lab-gaming-center/event/pm-singles"},"groupCount":16,"name":"Round Robin Pools","numSeeds":98,"waves":[{"id":17271,"identifier":"A","startAt":1510416000},{"id":17271,"identifier":"A","startAt":1510416000},{"id":17272,"identifier":"B","startAt":1510423200},{"id":17272,"identifier":"B","startAt":1510423200},{"id":17273,"identifier":"C","startAt":1510430400},{"id":17273,"identifier":"C","startAt":1510430400},{"id":17274,"identifier":"D","startAt":1510437600},{"id":17274,"identifier":"D","startAt":1510437600},{"id":17274,"identifier":"D","startAt":1510437600},{"id":17272,"identifier":"B","startAt":1510423200},{"id":17271,"identifier":"A","startAt":1510416000},{"id":17273,"identifier":"C","startAt":1510430400},{"id":17272,"identifier":"B","startAt":1510423200},{"id":17273,"identifier":"C","startAt":1510430400},{"id":17271,"identifier":"A","startAt":1510416000},{"id":17274,"identifier":"D","startAt":1510437600}]}}]}]}}
export const mockedGetEnteredPhasesReturnValue = [{"id":100046,"eventId":-1,"name":"Bracket Pools","numSeeds":249,"groupCount":16},{"id":132397,"eventId":-1,"name":"Top 48","numSeeds":48,"groupCount":1},{"id":172834,"eventId":-1,"name":"Top 8","numSeeds":8,"groupCount":1},{"id":132405,"eventId":-1,"name":"Top 24","numSeeds":24,"groupCount":1},{"id":100047,"eventId":-1,"name":"Bracket Pools","numSeeds":61,"groupCount":8},{"id":100048,"eventId":-1,"name":"Bracket","numSeeds":70,"groupCount":8},{"id":173658,"eventId":-1,"name":"Top 24","numSeeds":24,"groupCount":1},{"id":132417,"eventId":-1,"name":"Top 8","numSeeds":8,"groupCount":1},{"id":100049,"eventId":-1,"name":"Bracket","numSeeds":16,"groupCount":1},{"id":100050,"eventId":-1,"name":"Round Robin Pools","numSeeds":98,"groupCount":16}]

// getEnteredPhaseGroups()
export const mockedAttendeePhaseGroupsQueryResponse = {"participant":{"entrants":[{"seeds":[{"id":5981209,"phaseGroup":{"id":301994,"displayIdentifier":"A1","firstRoundTime":null,"phase":{"id":100046,"name":"Bracket Pools"},"state":3,"tiebreakOrder":null,"wave":{"id":17271,"identifier":"A","startAt":1510416000}}},{"id":6241470,"phaseGroup":{"id":374033,"displayIdentifier":"J1","firstRoundTime":null,"phase":{"id":132397,"name":"Top 48"},"state":3,"tiebreakOrder":null,"wave":{"id":21062,"identifier":"J","startAt":1510520400}}},{"id":6254816,"phaseGroup":{"id":453051,"displayIdentifier":"1","firstRoundTime":null,"phase":{"id":172834,"name":"Top 8"},"state":3,"tiebreakOrder":[],"wave":null}}]},{"seeds":[{"id":6241588,"phaseGroup":{"id":374104,"displayIdentifier":"1","firstRoundTime":null,"phase":{"id":132405,"name":"Top 24"},"state":3,"tiebreakOrder":null,"wave":null}},{"id":6245738,"phaseGroup":{"id":374069,"displayIdentifier":"E2","firstRoundTime":null,"phase":{"id":100047,"name":"Bracket Pools"},"state":3,"tiebreakOrder":null,"wave":{"id":17279,"identifier":"E","startAt":1510441200}}}]},{"seeds":[{"id":5981208,"phaseGroup":{"id":453187,"displayIdentifier":"C1","firstRoundTime":null,"phase":{"id":100048,"name":"Bracket"},"state":3,"tiebreakOrder":null,"wave":{"id":17273,"identifier":"C","startAt":1510430400}}},{"id":6279525,"phaseGroup":{"id":454460,"displayIdentifier":"1","firstRoundTime":null,"phase":{"id":173658,"name":"Top 24"},"state":3,"tiebreakOrder":[],"wave":null}},{"id":6279556,"phaseGroup":{"id":374205,"displayIdentifier":"1","firstRoundTime":null,"phase":{"id":132417,"name":"Top 8"},"state":3,"tiebreakOrder":null,"wave":null}}]},{"seeds":[{"id":6246825,"phaseGroup":{"id":301997,"displayIdentifier":"1","firstRoundTime":null,"phase":{"id":100049,"name":"Bracket"},"state":3,"tiebreakOrder":null,"wave":null}}]},{"seeds":[{"id":6270131,"phaseGroup":{"id":374265,"displayIdentifier":"A2","firstRoundTime":null,"phase":{"id":100050,"name":"Round Robin Pools"},"state":3,"tiebreakOrder":[{"type":"wins","inputs":[]},{"type":"game_ratio","inputs":[]},{"type":"head_to_head","inputs":[]}],"wave":{"id":17271,"identifier":"A","startAt":1510416000}}}]}]}}
export const mockedGetEnteredPhaseGroupsReturnValue = [{"id":301994,"phaseId":100046,"phaseName":"Bracket Pools","displayIdentifier":"A1","firstRoundTime":null,"state":3,"waveId":17271,"waveIdentifier":"A","waveStartAt":1510416000,"tiebreakOrder":null},{"id":374033,"phaseId":132397,"phaseName":"Top 48","displayIdentifier":"J1","firstRoundTime":null,"state":3,"waveId":21062,"waveIdentifier":"J","waveStartAt":1510520400,"tiebreakOrder":null},{"id":453051,"phaseId":172834,"phaseName":"Top 8","displayIdentifier":"1","firstRoundTime":null,"state":3,"waveId":null,"waveIdentifier":null,"waveStartAt":null,"tiebreakOrder":[]},{"id":374104,"phaseId":132405,"phaseName":"Top 24","displayIdentifier":"1","firstRoundTime":null,"state":3,"waveId":null,"waveIdentifier":null,"waveStartAt":null,"tiebreakOrder":null},{"id":374069,"phaseId":100047,"phaseName":"Bracket Pools","displayIdentifier":"E2","firstRoundTime":null,"state":3,"waveId":17279,"waveIdentifier":"E","waveStartAt":1510441200,"tiebreakOrder":null},{"id":453187,"phaseId":100048,"phaseName":"Bracket","displayIdentifier":"C1","firstRoundTime":null,"state":3,"waveId":17273,"waveIdentifier":"C","waveStartAt":1510430400,"tiebreakOrder":null},{"id":454460,"phaseId":173658,"phaseName":"Top 24","displayIdentifier":"1","firstRoundTime":null,"state":3,"waveId":null,"waveIdentifier":null,"waveStartAt":null,"tiebreakOrder":[]},{"id":374205,"phaseId":132417,"phaseName":"Top 8","displayIdentifier":"1","firstRoundTime":null,"state":3,"waveId":null,"waveIdentifier":null,"waveStartAt":null,"tiebreakOrder":null},{"id":301997,"phaseId":100049,"phaseName":"Bracket","displayIdentifier":"1","firstRoundTime":null,"state":3,"waveId":null,"waveIdentifier":null,"waveStartAt":null,"tiebreakOrder":null},{"id":374265,"phaseId":100050,"phaseName":"Round Robin Pools","displayIdentifier":"A2","firstRoundTime":null,"state":3,"waveId":17271,"waveIdentifier":"A","waveStartAt":1510416000,"tiebreakOrder":[{"type":"wins","inputs":[]},{"type":"game_ratio","inputs":[]},{"type":"head_to_head","inputs":[]}]}]