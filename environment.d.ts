declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOGGLE_TRACK_API_TOKEN: string
			TOGGLE_TRACK_HOST_BASE: string
			LOL_API_TOKEN: string
			LOL_HOST_BASE: string
			LOL_PUUID: string
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
