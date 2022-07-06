import type { RequestHandler } from './__types';
import { parse } from 'cookie';

const base = 'http://localhost:8000/api';

export const get: RequestHandler = async ({ request }) => {
	const cookies = parse(request.headers.get('cookie') || '');
	if (!cookies.jwt) {
		return {
			status: 303,
			headers: {
				location: '/login'
			}
		};
	}

	const response = await fetch(`${base}/sightings`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			cookie: `jwt=${cookies.jwt}`
		},
		credentials: 'include'
	});

	if (response.status === 200) {
		const responseBody: string = await response.json();
		return {
			body: {
				username: cookies.brdr,
				sightings: responseBody
			}
		};
	}

	return {
		status: response.status
	};
};
