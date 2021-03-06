import type { RequestHandler } from './__types';
import type { SightingDetail } from '../lib/model';

const base = import.meta.env.VITE_BRDR_API_BASE_URL;

export const get: RequestHandler = async ({ request }) => {
	const cookie: string | null = request.headers.get('cookie');
	if (cookie == null) {
		return {
			status: 401
		};
	}

	const url = new URL(request.url);
	const geoId = url.searchParams.get('geoId');
	const response = await fetch(`${base}/sightings/${geoId}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			cookie: cookie
		},
		credentials: 'include'
	});

	const responseBody: SightingDetail = await response.json();

	return {
		status: 200,
		body: responseBody
	};
};
