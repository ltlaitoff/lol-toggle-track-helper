import fs from 'fs/promises'
import { storeLog } from '../helpers/logs'
import { StoreData, MathInfo } from '../types/types'

const FILE = './store.json'

const BASE_TEMPLATE: StoreData = {
	lastMatch: null,
	history: []
}

export const initialize = async () => {
	storeLog('initialize')
	const filehandle = await fs.open(FILE, 'a+')

	try {
		const data = await filehandle.readFile({ encoding: 'utf8' })

		if (data.length === 0) {
			await filehandle.write(JSON.stringify(BASE_TEMPLATE, null, 2))
		}
	} finally {
		if (filehandle) await filehandle.close()
	}
}

export const getDataFromFile = async () => {
	storeLog('getData')
	const filehandle = await fs.open(FILE, 'r')

	try {
		const data = await filehandle.readFile({ encoding: 'utf8' })

		return JSON.parse(data) as StoreData
	} finally {
		if (filehandle) await filehandle.close()
	}
}

export const getLastMatch = async () => {
	storeLog('getLastMatch')

	const data = await getDataFromFile()

	return data.lastMatch
}

export const getHistory = async () => {
	storeLog('getHistory')

	const data = await getDataFromFile()

	return data.history
}

export const addMatch = async (match: MathInfo) => {
	storeLog('addMatch')
	const filehandle = await fs.open(FILE, 'a+')

	try {
		const data = await filehandle.readFile({ encoding: 'utf8' })
		const objectData = JSON.parse(data) as StoreData

		objectData.history.push(match)
		objectData.lastMatch = match

		await filehandle.truncate()
		await filehandle.writeFile(JSON.stringify(objectData, null, 2))
	} finally {
		if (filehandle) await filehandle.close()
	}
}
