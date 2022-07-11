import type { RequestHandler } from './__types';
import { parse } from 'cookie';

const base = import.meta.env.VITE_BRDR_API_BASE_URL;

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

	const response = await fetch(`${base}/user/validate`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			cookie: `jwt=${cookies.jwt}`
		},
		credentials: 'include'
	});

	if (response.status === 200) {
		const username: string = await response.text();
		return {
			body: {
				username: username
			}
		};
	}

	return {
		status: response.status
	};
};
