import type { RequestHandler } from './__types';
import type { SightingDetail } from '../lib/model';
import { parse } from 'cookie';

const base = import.meta.env.VITE_BRDR_API_BASE_URL;

export const get: RequestHandler = async ({ request }) => {
	const cookies = parse(request.headers.get('cookie') || '');
	const jwt = cookies && cookies.jwt && cookies.jwt;
	const jwtCookie = jwt ? `jwt=${jwt}` : '';

	const url = new URL(request.url);
	const searchParams = url.searchParams || ({} as any);
	const geoId = url.searchParams.get('geoId');
	const apiEndpoint = searchParams.has('username')
		? `${base}/sightings/${geoId}?username=${searchParams.get('username')}`
		: `${base}/sightings/${geoId}`;
	const response = await fetch(apiEndpoint, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			cookie: jwtCookie
		},
		credentials: 'include'
	});

	const responseBody: SightingDetail = await response.json();

	return {
		status: 200,
		body: responseBody
	};
};
