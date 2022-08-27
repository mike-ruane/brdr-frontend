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

export const get: RequestHandler = async ({ url }) => {
	if (!url.searchParams.has('username')) {
		return {
			status: 400
		};
	}
	const username = url.searchParams.get('username');
	const response = await fetch(`${base}/sightings?username=${username}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
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
