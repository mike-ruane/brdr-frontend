import type { RequestHandler } from './__types';
import { parse } from 'cookie';

const base = import.meta.env.VITE_BRDR_API_BASE_URL;
const protocol = import.meta.env.VITE_BRDR_PROTOCOL;

export const post: RequestHandler = async ({ request, url }) => {
	const data = await request.formData();
	const username = data.has('username') ? data.get('username') : undefined;
	const password = data.has('password') ? data.get('password') : undefined;
	const response = await fetch(`${base}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*'
		},
		credentials: 'include',
		body: JSON.stringify({
			username: username,
			password: password
		})
	});

	const status: number = response.status;
	const endpoint = new URL(`${protocol}://${url.host}${url.pathname}`);

	if (status == 401) {
		endpoint.searchParams.append('error', true);
		return {
			headers: { Location: endpoint.toString() },
			status: 302
		};
	} else if (status == 200) {
		const username = await response.text();
		const cookies = parse(response.headers.get('set-cookie') || '');
		const jwt = cookies && cookies.jwt && cookies.jwt;
		if (!jwt) {
			return {
				status: 401
			};
		}
		return {
			status: 303,
			headers: {
				'Set-Cookie': [`jwt=${jwt}`, `brdr=${username}`],
				location: '/'
			}
		};
	} else {
		return {
			status: 500,
			body: {
				message: 'Internal Error'
			}
		};
	}
};
