import type { RequestHandler } from './__types';
import { parse } from 'cookie';

const base = import.meta.env.VITE_BRDR_API_BASE_URL;

export const get: RequestHandler = async ({ request, url, params }) => {
	const cookies = parse(request.headers.get('cookie') || '');
	const jwt = cookies && cookies.jwt && cookies.jwt;
	if (!jwt) {
		return {
			status: 303,
			headers: {
				location: '/login'
			}
		};
	}

	const query = url.searchParams || ({} as any);
	const path = query.has('username') ? `sightings?username=${query.get('username')}` : 'sightings';
	const response = await fetch(`${base}/${path}`, {
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
				sightings: responseBody
			}
		};
	}

	return {
		status: response.status
	};
};
