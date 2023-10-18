import * as Schema from './schema'
// ---Queries---
export const set = `query SetQuery($id: ID!){
	set(id:$id){
		${Schema.set}
	}
}
`

export const games = `query SetQuery($id: ID!){
	set(id:$id){
		games{
			${Schema.game}
		}
	}
}
`

export const entrants = `query SetParticipants($id: ID!){
	set(id: $id){
		slots{
			entrant{
				${Schema.entrant}
			}
		}
	}
}
`

export const attendees = `query SetParticipants($id: ID!){
	set(id: $id){
		slots{
			entrant{
				participants{
					${Schema.attendee}
				}
			}
		}
	}
}`

// ---Mutations---
export const reportingSetMutation = `mutation reportSet($setId: ID!, $winnerId: ID!) {
    reportBracketSet(setId: $setId, winnerId: $winnerId) {
        id
        state
    }
}
`

export const reportingFullSetWithDataMutation = `mutation reportSet($setId: ID!, $winnerId: ID!, $gameData: [BracketSetGameDataInput]) {
    reportBracketSet(setId: $setId, winnerId: $winnerId, gameData: $gameData) {
        id
        state
    }
}
`
