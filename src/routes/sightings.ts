import type { RequestHandler } from './__types';
import { postData } from '../components/_api';
import { parse } from 'cookie';

const base = import.meta.env.VITE_BRDR_API_BASE_URL;

export const post: RequestHandler = async ({ request }) => {
	const cookie: string | null = request.headers.get('cookie');
	if (cookie == null) {
		return {
			status: 401
		};
	}
	const form = await request.json();
	const response = await postData('sightings', cookie, form);

	return {
		status: response.status
	};
};

export const get: RequestHandler = async ({ request }) => {
	const cookies = parse(request.headers.get('cookie') || '');
	const jwt = cookies && cookies.jwt && cookies.jwt;

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
				sightings: responseBody
			}
		};
	}
};
