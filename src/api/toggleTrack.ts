const API_TOKEN = process.env.TOGGLE_TRACK_API_TOKEN
const HOST = process.env.TOGGLE_TRACK_HOST_BASE

const APP_NAME = 'lol-toggle-track-helper'
const WORKSPACE_ID = 6741502

interface TimeEntriesType {
	description: string
	start: string
	stop: string
}

export const timeEntries = async (data: TimeEntriesType) => {
	const body = {
		...data,
		workspace_id: WORKSPACE_ID,
		created_with: APP_NAME,
		project_id: 186489886
	}

	return fetch(`${HOST}/workspaces/${WORKSPACE_ID}/time_entries`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${Buffer.from(`${API_TOKEN}:api_token`).toString(
				'base64'
			)}`
		}
	}).then(response => response.json())
}
