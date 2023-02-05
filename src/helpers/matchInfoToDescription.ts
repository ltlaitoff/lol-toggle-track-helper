import { MathInfo } from '../types/types'

export const matchInfoToDescription = (match: MathInfo) => {
	const position =
		match.teamPosition.charAt(0) + match.teamPosition.toLowerCase().slice(1)

	return `[${match.win ? 'W' : 'L'}] ${match.championName} | ${match.kills} / ${
		match.deaths
	} / ${match.assists} | ${position}`
}
