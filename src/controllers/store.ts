import fs from 'fs'
import { storeLog } from '../helpers/logs'
import { StoreData, MathInfo } from '../types/types'

const FILE = './store.json'

const BASE_TEMPLATE: StoreData = {
	lastMatch: null,
	history: []
}

const openFile = (type = 'a+') => {
	return fs.openSync(FILE, type)
}

const closeFile = (file: number) => {
	fs.closeSync(file)
}

export const initialize = () => {
	storeLog('Initialize')
	const file = openFile()

	const data = fs.readFileSync(file, { encoding: 'utf8' })

	if (data.length === 0) {
		fs.writeFileSync(file, JSON.stringify(BASE_TEMPLATE, null, 2))
	}

	closeFile(file)
}

export const getDataFromFile = () => {
	storeLog('Get data from file')
	const file = openFile()

	const data = fs.readFileSync(file, { encoding: 'utf8' })

	closeFile(file)
	return JSON.parse(data) as StoreData
}

export const getLastMatch = () => {
	storeLog('Get last match')
	const file = openFile()

	const data = getDataFromFile()
	if (data === null) return null

	closeFile(file)
	return data.lastMatch
}

export const getHistory = () => {
	storeLog('getHistory')
	const file = openFile()

	const data = getDataFromFile()
	if (data === null) return null

	closeFile(file)
	return data.history
}

export const addMatch = (match: MathInfo) => {
	storeLog(`Add match ${match.id}`)

	const data = getDataFromFile()

	let isLast = false
	let isInHistory = false

	if (data.lastMatch?.id === match.id) {
		storeLog(`Match already is last`)
		isLast = true
	}

	if (data.history.find(item => item.id === match.id)) {
		storeLog(`Match already in history`)
		isInHistory = true
	}

	if (!isLast) data.lastMatch = match
	if (!isInHistory) data.history.push(match)

	const file = openFile('w')

	fs.writeFileSync(file, JSON.stringify(data, null, 2))

	closeFile(file)
}
