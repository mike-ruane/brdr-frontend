import type { RequestHandler } from './__types';
import { postData } from '../components/_api';
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
