import * as dotenv from 'dotenv'
dotenv.config()

import { timeEntries } from './api/toggleTrack'
import { getAllUserMatches, getMatchInfo } from './api/lol'
import * as store from './controllers/store'
import { matchInfoToDescription } from './helpers'
import { time } from 'console'
import { MathInfo } from './types/types'

const newGamesByCount = (games: string[], count: number) => {
	return games.slice(0, count)
}

// async function runPromisesInSequence<T>(promises: Promise<T>[]) {
// 	const result: T[] = []

// 	for (const promise of promises) {
// 		result.push(await promise)
// 		await sleep(500)
// 	}
// }

function sleep(ms: number) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}

const main = async (
	type: 'normal' | 'findMatch' = 'normal',
	lastMathBinded: string | null = null
) => {
	store.initialize()

	const lastMatchStore = store.getLastMatch()

	let lastMathStoreIndex = -1
	let lastMathBindedIndex = -1

	const lolPlayerGames = await getAllUserMatches()

	if (lastMatchStore !== null) {
		lastMathStoreIndex = lolPlayerGames.findIndex(
			item => item === lastMatchStore.id
		)
	}

	if (lastMathBinded !== null) {
		lastMathBindedIndex = lolPlayerGames.findIndex(
			item => item === lastMathBinded
		)
	}

	let lastMathIndexForFind = lastMathStoreIndex

	if (lastMathBindedIndex !== -1) {
		lastMathIndexForFind = lastMathBindedIndex

		console.log(
			lastMathBindedIndex,
			lastMathStoreIndex,
			lastMathBindedIndex > lastMathStoreIndex
		)

		if (lastMathStoreIndex !== -1 && lastMathBindedIndex > lastMathStoreIndex) {
			console.log('Binded item index than older then last match in store')
			return
		}
	}

	const newGames = newGamesByCount(lolPlayerGames, lastMathIndexForFind)

	const gameInfos: MathInfo[] = []

	for (const game of newGames) {
		gameInfos.push(await getMatchInfo(game))
		await sleep(500)
	}

	if (type === 'findMatch') {
		gameInfos.map(game => {
			console.log(`${game.id} | ${matchInfoToDescription(game)}`)
		})
		return
	}

	for (const gameInfo of gameInfos.reverse()) {
		await timeEntries({
			description: matchInfoToDescription(gameInfo),
			start: new Date(gameInfo.gameStart).toISOString(),
			stop: new Date(gameInfo.gameEnd).toISOString()
		}).then(value => {
			store.addMatch(gameInfo)
			console.log('toggleTrack: ', value)
		})

		await sleep(500)
	}
}

main()
