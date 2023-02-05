import { MathInfo } from '../types/types'
const API_TOKEN = process.env.LOL_API_TOKEN
const HOST = process.env.LOL_HOST_BASE
const PUUID = process.env.LOL_PUUID

export const getAllUserMatches = () => {
	console.log('PUUID: ', PUUID)

	return fetch(
		`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?start=0&count=30`,
		{
			headers: {
				'X-Riot-Token': API_TOKEN
			}
		}
	).then(response => response.json() as Promise<string[]>)
}

/* 
	gameStart | gameEnd | teamPosition | kills | deaths | assists | championName
	data.info.gameCreation | data.info.gameEndTimestamp | summoner.teamPosition | summoner.kills | summoner.deaths | summoner.assists | summoner.championName

	*/

export const getMatchInfo = (mathId: string): Promise<MathInfo> => {
	return fetch(
		`https://europe.api.riotgames.com/lol/match/v5/matches/${mathId}`,
		{
			headers: {
				'X-Riot-Token': API_TOKEN
			}
		}
	)
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
