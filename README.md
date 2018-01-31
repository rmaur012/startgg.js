# smashgg.js
## Author: Brandon Cooke

smashgg.js is a Node.js wrapper for the public Smash.gg API, which is rich
with data about tournament brackets that have occurred on their platform.

# Requirements
* Node.js 7+
* ecmascript 6

```javascript
var smashgg = require('smashgg.js');
var tournament = new smashgg.Tournament('ceo-2016');

tournament.on('ready', async function(){
    var players = await tournament.getAllPlayers();
    var sets = await tournament.getAllSets();

    console.log(players.length + ' players entered ' + tournament.getName() +  ' overall');
    players.forEach(player => {
        console.log(
            'Tag: ' + player.getTag() + '\n',
            'Name: ' + player.getName() + '\n',
            'State: ' + player.getState() + '\n'
        )
    });

    console.log(sets.length + ' sets were played at ' + tournament.getName());
    sets.forEach(set => {
            console.log(
                '[%s: %s %s - %s %s]',
            set.getRound(),
            set.getWinner().getTag(), //Player object
            set.getWinnerScore(),
            set.getLoserScore(),
            set.getLoser().getTag()
        );
        console.log(
            '%s placed %s at the tournament \n%s placed %s at the tournament\n',
            set.getWinner().getTag(),
            set.getWinnersTournamentPlacement(),
            set.getLoser().getTag(),
            set.getLosersTournamentPlacement()
        )
    })

    console.log('Done!');
    return process.exit(0);
});
```

##### Output
```
2592 players entered CEO 2016 overall
Tag: Gwabs
 Name: Ian Chiong
 State: FL

Tag: Benteezy
 Name: Benny Frias
 State: NY

Tag: Jinzo
 Name: Gene Zhou
 State: FL

.... continues ....

8150 sets were played at CEO 2016
[Losers Semi-Final: Haus 2 - 1 Benteezy]
Haus placed 33 at the tournament
Benteezy placed 97 at the tournament

[Winners Round 2: Benteezy 2 - 0 Sabelan]
Benteezy placed 97 at the tournament
Sabelan placed 257 at the tournament

[Losers Quarter-Final: Benteezy 2 - 0 NIX]
Benteezy placed 97 at the tournament
NIX placed 129 at the tournament

.... continues ....

```

## Tournament
A Tournament in smash.gg is a collection of Events, Phases, and Phases Groups that
categorize different games played, game types within those games, and the matches that
make up those games.

```javascript
var to12 = new smashgg.Tournament('to12');
to12.on('ready', function(){
    //tournament is populated with data
    console.log('Got tournament ' + tournament.getName();
});

var ceo2016 = new smashgg.Tournament(
    'ceo-2016',
    {
        event: true,
        phase: false,
        groups: false,
        stations: false
    },
    false
);
ceo2016.on('ready'
```

### Constructor
* **Tournament(tournamentName [,expands, isCached]);**

    * **tournamentName** [required] - name slug or short tournament name
        * a slug is a string that uniquely identifies a tournament on the platform
            * ex: ceo-2016
        * a shortened name is a set abbreviation for a slug
            * ex: to12
    * **expands** - an object that defines which additional data is sent back. By default all values are marked true.
        * event - boolean - condensed data for the events that comprise this tournament
        * phase - boolean -condensed data for the phases that comprise the events
        * groups - boolean -condensed data for the groups that comprise the phases
        * stations - boolean -condensed data for the stations for each group
    * **isCached** - boolean parameter for if the api should cache the resulting object

### Events
* **'ready'**
    * indicates when the Tournament object is populated with data

### Methods
#### Promises
* **getAllPlayers([fromCacheTF])**
    * Returns a Promise that resolves an array of all `Player` objects that partook in the Tournament
    * **fromCacheTF** - boolean value for if the value should be retrieved from cache. Defaults to true

* **getAllSets([fromCacheTF])**
    * Returns a Promise that resolves an array of all `Set` objects that took place in the Tournament
    * **fromCacheTF** - boolean value for if the value should be retrieved from cache. Defaults to true


* **getAllEvents([fromCacheTF])**
    * Returns a Promise that resolves an array of all `Events` objects that are part of the Tournament.
    * **fromCacheTF** - boolean value for if the value should be retrieved from cache. Defaults to true

#### Getters
* **getId()**
    * returns the id of the tournament
* **getName()**
    * returns the name of the tournament
* **getSlug()**
    * returns the slug for the tournament
* **getTimezone()**
    * returns the string timezone the tournament occurred in
* **getStartTime()**
    * returns a string 'MM-DD-YYYY HH:mm:ss tz' for the start time of the tournament
* **getEndTime()**
    * returns a string 'MM-DD-YYYY HH:mm:ss tz' for the end time of the tournament
* **getWhenRegistrationCloses()**
    * returns a string 'MM-DD-YYYY HH:mm:ss tz' for the time registration is set to close
* **getCity()**
    * returns the city where the tournament occurred
* **getState()**
    * returns the state where the tournament occurred
* **getZipCode()**
    * returns the zip code where the tournament occurred
* **getContactEmail()**
    * return the email address listed for contacting
* **getContactTwitter()**
    * return the twitter handle listed for contacting
* **getOwnerId()**
    * return the id of the tournament owner
* **getVenueFee()**
    * return the cost of the venue fee for the tournament
* **getProcessingFee()**
    * return the cost of the processing fee to register for the tournament

## Event
An Event in smash.gg is a broad collection of matches for a single game and game type.
For instance, Melee Singles is an Event while Melee Doubles is another Event. Events
are comprised of optional Phases and Phases Groups.

```javascript
var event1 = new smashgg.Event('to12', 'melee-singles');
event1.on('ready', function(){
    //do stuff with event1
})

var event2 = new smashgg.Event(
    'ceo-2106',
    'melee-singles',
    {
        phase: true,
        groups: false
    },
    false
);
event2.on('ready', function(){
    //do stuff with event2
}
```

### Constructor
* **Event(tournamentName, eventName [, expands, isCached])**
    * **tournamentName** [required] - tournament slug or shorthand name of the tournament
        * slug: ceo-2016
        * shorthand: to12 (for tipped-off-12-presented-by-the-lab-gaming-center)
    * **eventName** [required] - event slug
        * ex: melee-singles or bracket-pools
    * **expands** - an object that defines which additional data is sent back. By default all values are marked true.
        * phase - boolean -condensed data for the phases that comprises the event
        * groups - boolean -condensed data for the groups that comprise the phases
    * **isCached** - boolean value for if the resulting object should be cached

### Events
* **'ready'**
    * indicates when the Event object is populated with data

### Methods
#### Promises
* **getEventPhases([fromCacheTF])**
    * Returns a Promise resolving an array of `Phase` objects for this Event
    * **fromCacheTF** - boolean value for if the value should be retrieved from cache. Defaults to true
* **getEventPhaseGroups([fromCacheTF])**
    * Returns a Promise resolving an array of `PhaseGroup` objects for this Event
    * **fromCacheTF** - boolean value for if the value should be retrieved from cache. Defaults to true

#### Getters
* **getName()**
    * returns the name of the event
* **getSlug()**
    * returns the slug for the event
* **getStartTime()**
    * returns a date string (MM-DD-YYYY HH:mm:ss tz) for when the event is set to begin
* **getEndTime()**
    * returns a date string (MM-DD-YYYY HH:mm:ss tz) for when the event is set to end

## Phase
A phase in smash.gg is a subset of matches and brackets inside an Event. For example,
a wave in pools is a Phase. Everything in that Phase is a Group (or Phase Group).

```javascript
var phase1 = new smashgg.Phase(111483);
phase1.on('ready', function(){
    //do stuff with phase1
})

var phase2 = new smashgg.Phase(
    45262,
    {
        groups: false
    },
    false
)
phase2.on('ready', function(){
    //do stuff with phase2
})
```

### Constructor
* **Phase(id [,expands, isCached])**
    * **id** [required] - unique identifier for the Phase
    * **expands** - an object that defines which additional data is sent back. By default all values are marked true.
        * groups - boolean -condensed data for the groups that comprise the phases
    * **isCached** - boolean parameter for if the api should cache the resulting object

### Events
* **'ready'**
    * indicates when the Phase object is populated with data

### Methods
#### Promises
* **getPhaseGroups([fromCacheTF])**
    * Returns a Promise resolving an array of `PhaseGroup` objects belonging to this Phase
    * **fromCacheTF** - boolean value for if the value should be retrieved from cache. Defaults to true

#### Getters
* **getName()**
    * returns the name of the Phase
* **getEventId()**
    * returns the id of the Event this Phase belongs to

## PhaseGroup
A Phase Group is the lowest unit on smash.gg. It is a bracket of some sort that belongs to a Phase.

```javascript
var phaseGroup1 = new smashgg.PhaseGroup(44445);
phaseGroup1.on('ready', function(){
    //do stuff with phaseGroup1
})

var phaseGroup2 = new smashgg.PhaseGroup(
    301994,
    {
        sets: true,
        entrants: true,
        standings: true,
        seeds: false
    },
    false
);
phaseGroup2.on('ready', function(){
    //do stuff with phaseGroup2
})
```

### Constructor
* **PhaseGroup(id [, expands, isCached])**
    * **id** [required] - unique identifier for this Phase Group
    * **expands** - an object that defines which additional data is sent back. By default all values are marked true.
        * sets - boolean - data for the sets that comprises the phase group
        * entrants - boolean - data for the entrants that comprise the phase group
        * standings - boolean - data for the standings of the entrants for the phase group
        * seeds - boolean - data for the seeding of entrants for the for the phase group
    * **isCached** - boolean value for if the resulting object should be cached

### Events
* **'ready'**
    * indicates when the PhaseGroup object is populated with data

### Methods
#### Promises
* **getPlayers([fromCacheTF])**
    * Returns a Promise that resolves an array of `Player` objects for the Phase Group.
    * **fromCacheTF** - boolean value for if the value should be retrieved from cache. Defaults to true
* **getSets([fromCacheTF])**
    * Return a Promise that resolves an array of `Set` objects for the Phase Group.
    * **fromCacheTF** - boolean value for if the value should be retrieved from cache. Defaults to true

#### Getters
* **getPhaseId()**
    * returns the Phase Id that owns this Phase Group

## Player
A Player is a data object that holds information about players who
went to a tournament using smash.gg.
```javascript
var player = new smashgg.Player(000000, 'cookiE', 'Brandon Cooke', 'US', 'GA', 'Recursion');

var tournament = smashgg.Tournament('to12');
tournament.on('ready', async function(){
    var players = await tournament.getAllPlayers();
    //returns all players in a tournament as Player objects
});
```

### Constructor
* **Player(id [, tag, name, country, state/region, sponsor/prefix, participantId, data])**
    * **id** [required] - the global id for the player in smash.gg
    * **tag** - smash tag of the player
    * **name** - real name of the player
    * **country** - country the player hails from
    * **state/region** - state or region the player is from in the country
    * **sponsor/prefix** - the sponsor (or user selected prefix) of the player
    * **participantId** - the participant id the player was assigned upon registering for a tournament
    * **data** - the raw player data from smash.gg

### Methods
#### Statics
* **resolve(data)**
    * **data** - the raw player data from smash.gg
    * this method takes the raw json payload of a single player in the system and returns a player object

#### Getters
* **getId**
    * return the id of the Player
* **getTag**
    * return the tag of the Player
* **getName**
    * return the name of the Player
* **getCountry**
    * return the country of the Player
* **getState**
    * return the state of the Player
* **getSponsor**
    * return the Sponsor of the Player
* **getParticipantId**
    * return the participant id of the Player
* **getFinalPlacement**
    * requires **data** property
    * return the final placement of the Player

## Set
A Set is a data object that holds information about a tournament set
that took place at a tournament.

```javascript
var Winner = new smashgg.Player(000000, 'BootyBlastWarrior', 'Andy', 'US', 'GA', null);
var Loser = new smashgg.Player(000000, 'cookiE', 'Brandon Cooke', 'US', 'GA', 'Recursion');

var set = new smashgg.Set(000001, 000002, 'Losers Semis', Winner, Loser);

var tournament = new smashgg.Tournament('to12');
tournament.on('ready', async function(){
    var sets = await tournament.getAllSets();
    //returns a list of Set objects from the tournament
})
```

### Constructor
* **Set(id, round, WinnerPlayer, LoserPlayer [, eventId, data])**
    * **id** [required] - unique identifier of the Set object
    * **eventId** [required] - id of the event this Set belongs to
    * **round** [required] - round name of the Set
    * **WinnerPlayer** [required] - Player object of the winner of the Set
    * **LoserPlayer** [required] - Player object of the loser of the Set

### Methods
#### Getters
* **getRound**
    * return the round name for the Set
* **getWinner**
    * return the Winner Player object for the Set
* **getLoser**
    * return the Loser Player object for the Set
* **getGames**
    * return the list of Games for the Set if available
* **getBestOfCount**
    * return the best-of count for the Set
* **getWinnerScore**
    * return the winner's score for the Set
* **getLoserScore**
    * return the loser's score for the Set
* **getBracketId**
    * return the bracket id for the Set
* **getMidsizeRoundText**
    * return the midsize round text for the Set
* **getPhaseGroupId**
    * return the phase id for the Phase which this Set belongs to
* **getWinnersTournamentPlacement**
    * return the Set winner's final tournament placing
* **getLosersTournamentPlacement**
    * return the Set loser's final tournament placing