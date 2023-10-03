import '../lib/util/ErrorHandler'

import chai from 'chai'
const { expect } = chai

import {IVideoGame, IVideoGameData} from '../lib/interfaces/IVideoGame'

import { VideoGame } from '../lib/models/VideoGame'
import Cache from '../lib/util/Cache'

const expected = {
    Melee: {
        id: 1,
        data: {
            abbrev: 'Melee',
            approved: true,
            characterTerm: [null],
            displayName: 'Melee',
            enabled: '1',
            expand: [],
            gameTerm: [null],
            id: 1,
            images: [
                {
                    createdAt: [null],
                    entity: [null],
                    entityId: [null],
                    height: 190,
                    id: 6180,
                    isOriginal: true,
                    ratio: 0.73,
                    type: 'primary',
                    updatedAt: [null],
                    uploadedBy: [null],
                    url: 'https://images.smash.gg/images/videogame/1/image-f26ab87b8de31d78597a664d225e1c71.jpg',
                    width: 138
                },
            ],
            initialStocks: [null],
            isCardGame: [null],
            maxPerEntry: 2,
            minPerEntry: 1,
            name: 'Super Smash Bros. Melee',
            slug: 'melee',
            stageTerm: [null]
        },
        name: 'Super Smash Bros. Melee',
        displayName: 'Melee',
        slug: 'game/melee',
        rawEncoding: 'json'
    },
    PM: {
        id: 2,
        data: {
            abbrev: 'pm',
            approved: true,
            characterTerm: [null],
            displayName: 'PM',
            enabled: '1',
            expand: [],
            gameTerm: [null],
            id: 2,
            images: [
                {
                    createdAt: [null],
                    entity: [null],
                    entityId: [null],
                    height: 512,
                    id: 1330116,
                    isOriginal: true,
                    ratio: 0.73,
                    type: 'primary',
                    updatedAt: [null],
                    uploadedBy: [null],
                    url: 'https://images.smash.gg/images/videogame/2/image-11a8d11dbd2af24429b41b7e6a166f42.png',
                    width: 372,
                },
            ],
            initialStocks: [null],
            isCardGame: [null],
            maxPerEntry: [null],
            minPerEntry: [null],
            name: 'Project M',
            slug: 'project-m-remix-edition',
            stageTerm: [null],
        },
        name: 'Project M',
        displayName: 'PM',
        slug: 'game/pm',
        rawEncoding: 'json'
    }
}

function eq(original: any, other: IVideoGame): boolean {
//     console.log("OK: " + other.getId() + ", " +
//             other.getName() + ", " +
//             other.getDisplayName() + ", " +
//             other.getSlug())
//
//     console.log("NO: " + original.id + ", " +
//             original.name + ", " +
//             original.displayName + ", " +
//             original.slug)

    return other.getId() === original.id &&
        other.getName() === original.name &&
        other.getDisplayName() === original.displayName &&
        other.getSlug() === original.slug
}

describe('startgg VideoGame', () => {

    before(async () => {
        Cache.flush()
    })

    it('should get all video games from api', async () => {
        const videoGames = await VideoGame.getAll()
        videoGames.forEach(e => {
            expect(e).to.be.instanceof(VideoGame)
        })
        return true
    })

    it('should get correct video game by id', async () => {
        const vg1 = await VideoGame.getById(1)

        expect(eq(expected.Melee, vg1)).to.be.true

        return true
    })

    it('should get correct video game by id 2', async () => {
        const vg2 = await VideoGame.getById(2)

        expect(eq(expected.PM, vg2)).to.be.true

        return true
    })

    it('should get correct video game by name', async () => {
        const melee1 = await VideoGame.getByName('Super Smash Bros. Melee', { isCached: false })
        const melee2 = await VideoGame.getByName('melee', { isCached: false })
        const pm1 = await VideoGame.getByName('pm')
        const pm2 = await VideoGame.getByName('Project M')

        expect(eq(expected.Melee, melee1)).to.be.true
        expect(eq(expected.Melee, melee2)).to.be.true
        expect(eq(expected.PM, pm1)).to.be.true
        expect(eq(expected.PM, pm2)).to.be.true

        return true
    })

    describe('functions testing', () => {
        const jsonEncodingUTF8 : IVideoGameData = {
            id: 12345,
            name: 'GameName',
            displayName: 'Game Name',
            slug: 'game-name'
        }
        const jsonEncodingUTF16 = '007b 000a 0020 0020 0020 0020 0069 0064 003a 0020 0031 0032 0033 0034 0035 002c 000a 0020 0020 0020 0020 006e 0061 006d 0065 003a 0020 0027 0047 0061 006d 0065 004e 0061 006d 0065 0027 002c 000a 0020 0020 0020 0020 0064 0069 0073 0070 006c 0061 0079 004e 0061 006d 0065 003a 0020 0022 0047 0061 006d 0065 0020 004e 0061 006d 0065 0022 002c 000a 0020 0020 0020 0020 0073 006c 0075 0067 003a 0020 0022 0067 0061 006d 0065 002d 006e 0061 006d 0065 0022 000a 007d'
        it('loadData() in utf8, should return json encoding', async () => {
            const vg = new VideoGame(jsonEncodingUTF8.id, jsonEncodingUTF8.name, jsonEncodingUTF8.displayName, jsonEncodingUTF8.slug)
            const result = vg.loadData(jsonEncodingUTF8, 'json')
            expect(result).to.deep.equal(jsonEncodingUTF8.toString())
        })

        it('loadData() in hex, should return json encoding', async () => {
            const vg = new VideoGame(jsonEncodingUTF8.id, jsonEncodingUTF8.name, jsonEncodingUTF8.displayName, jsonEncodingUTF8.slug)
            const result = vg.loadData(jsonEncodingUTF8, 'ascii')
            expect(result).to.equal(JSON.stringify(jsonEncodingUTF8))
        })

        it('getData() in utf8, should return json encoding', async () => {
            const vg = new VideoGame(jsonEncodingUTF8.id, jsonEncodingUTF8.name, jsonEncodingUTF8.displayName, jsonEncodingUTF8.slug)
            const result = vg.getData(jsonEncodingUTF8, 'json')
            expect(result).to.equal(jsonEncodingUTF8)
        })
    })
})
