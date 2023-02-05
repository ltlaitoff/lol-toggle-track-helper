import * as dotenv from 'dotenv'
dotenv.config()

import { timeEntries } from './api/toggleTrack'
import { getAllUserMatches, getMatchInfo } from './api/lol'
import * as store from './controllers/store'
import { matchInfoToDescription } from './helpers'

const main = async () => {
	await store.initialize()

	const lastMatch = await store.getLastMatch()

	if (lastMatch === null) {
		console.log('Last match null. Not supported')
		return
	}

	const lolPlayerGames = await getAllUserMatches()
	const lastWritedGameIndex = lolPlayerGames.findIndex(gameId => {
		return gameId === lastMatch.id
	})

	const newGames = lolPlayerGames.slice(0, lastWritedGameIndex)

	const gameInfos = await Promise.all(
		newGames.map(async game => {
			return await getMatchInfo(game)
		})
	)

	gameInfos.map(game => {
		timeEntries({
			description: matchInfoToDescription(game),
			start: new Date(game.gameStart).toISOString(),
			stop: new Date(game.gameEnd).toISOString()
		}).then(value => {
			store.addMatch(game)
			console.log('toggleTrack: ', value)
		})
	})
}

main()
