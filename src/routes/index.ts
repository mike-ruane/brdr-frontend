import type { RequestHandler } from './__types';

const base = 'http://localhost:8000/api';

export const get: RequestHandler = async ({ request }) => {
	const cookie: string | null = request.headers.get('cookie');
	if (cookie == null) {
		return {
			status: 401
		};
	}
	const response = await fetch(`${base}/sightings`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			cookie: cookie
		},
		credentials: 'include'
	});

	const responseBody = await response.json();
	if (response.status === 200) {
		return {
			body: {
				sightings: responseBody
			}
		};
	}

	return {
		status: response.status
	};
};
