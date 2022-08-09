import type { GetSession } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const getSession: GetSession = async (event) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.username = cookies['brdr'] || undefined;
	return {
		...event.locals
	};
};
