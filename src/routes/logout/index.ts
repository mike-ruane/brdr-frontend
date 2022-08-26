import type { RequestHandler } from './__types';
import { serialize } from 'cookie';

export const get: RequestHandler = async ({ request }) => {
	console.log("hello!!!!")
	console.log(request);
	return {
		status: 303,
		headers: {
			'set-cookie': [
				serialize('jwt', '', {
					expires: new Date(0)
				}),
				serialize('brdr', '', {
					expires: new Date(0)
				})
			],
			location: '/login'
		}
	};
};
