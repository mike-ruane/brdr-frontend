import type { RequestHandler } from './__types';
import { parse } from 'cookie';

const base = import.meta.env.VITE_BRDR_API_BASE_URL;
const protocol = import.meta.env.VITE_BRDR_PROTOCOL;

export const post: RequestHandler = async ({ request, url }) => {
	const cookies = parse(request.headers.get('cookie') || '');
	const jwt = cookies && cookies.jwt && cookies.jwt;
	const data = await request.formData();
	const username = data.has('username') ? data.get('username') : undefined;
	const email = data.has('email') ? data.get('email') : undefined;
	const type = data.has('type') ? data.get('type') : undefined;
	const body = data.has('body') ? data.get('body') : undefined;

	const response = await fetch(`${base}/message`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*',
			cookie: `jwt=${jwt}`
		},
		credentials: 'include',
		body: JSON.stringify({
			username: username,
			email: email,
			type: type,
			body: body
		})
	});

	const endpoint = new URL(`${protocol}://${url.host}${url.pathname}`);

	if (response.status == 200) {
		endpoint.searchParams.append('success', true);
	} else {
		endpoint.searchParams.append('error', true);
	}
	return {
		headers: { Location: endpoint.toString() },
		status: 302
	};
};
