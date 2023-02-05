import chalk from 'chalk'

export const storeLog = (string: string) => {
	console.log(chalk.cyan('[Store] '), string)
}

export const lolApiLog = (string: string) => {
	console.log(chalk.yellow('[LOL API] '), string)
}

export const toggleTrackApiLog = (string: string) => {
	console.log(chalk.green('[TOGGLE TRACK API] '), string)
}
