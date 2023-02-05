export interface MathInfo {
	id: string
	gameStart: number
	gameEnd: number
	teamPosition: string
	kills: number
	deaths: number
	assists: number
	championName: string
	win: boolean
}

export interface StoreData {
	lastMatch: null | MathInfo
	history: Array<MathInfo>
}
