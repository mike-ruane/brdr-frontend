import type { RequestHandler } from './__types';

const base = import.meta.env.VITE_BRDR_API_BASE_URL;

export const get: RequestHandler = async ({ request, params }) => {
	const response = await fetch(`${base}/sightings?username=${params.user}`, {
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

	return {
		status: response.status
	};
};
