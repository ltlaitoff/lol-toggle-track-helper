import { lolApiLog } from '../helpers'
import { MathInfo } from '../types/types'
const API_TOKEN = 'RGAPI-bdcf43d9-54a1-48a9-86a1-d9e8fcb9d02b'
const HOST = 'https://europe.api.riotgames.com/lol/match/v5/matches'
const PUUID = process.env.LOL_PUUID

export const getAllUserMatches = () => {
	lolApiLog(`Get all matches`)

	return fetch(`${HOST}/by-puuid/${PUUID}/ids?start=0&count=60`, {
		headers: {
			'X-Riot-Token': API_TOKEN
		}
	}).then(response => response.json() as Promise<string[]>)
}

/* 
	gameStart | gameEnd | teamPosition | kills | deaths | assists | championName
	data.info.gameCreation | data.info.gameEndTimestamp | summoner.teamPosition | summoner.kills | summoner.deaths | summoner.assists | summoner.championName

	*/

export const getMatchInfo = (mathId: string): Promise<MathInfo> => {
	lolApiLog(`Get math info ${mathId}`)

	return fetch(`${HOST}/${mathId}`, {
		headers: {
			'X-Riot-Token': API_TOKEN
		}
	})
		.then(response => response.json())
		.then(data => {
			const summoner = data.info.participants.find(
				(summoner: any) => summoner.puuid === PUUID
			)

			return {
				id: mathId,
				gameStart: data.info.gameCreation,
				gameEnd: data.info.gameEndTimestamp,
				teamPosition: summoner.teamPosition,
				kills: summoner.kills,
				deaths: summoner.deaths,
				assists: summoner.assists,
				championName: summoner.championName,
				win: summoner.win
			}
		})
}
