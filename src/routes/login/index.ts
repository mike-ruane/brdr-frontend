import type { RequestHandler } from './__types';
import { parse } from 'cookie';

const base = 'http://localhost:8000/api';

export const post: RequestHandler = async ({ request }) => {
	const data = await request.formData();
	const response = await fetch(`${base}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*'
		},
		credentials: 'include',
		body: JSON.stringify({
			email: data.has('email') ? data.get('email') : undefined,
			password: data.has('password') ? data.get('password') : undefined
		})
	});

	const status: number = response.status;

	if (status == 401) {
		return {
			status: status,
			body: {
				message: 'Invalid credentials'
			}
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
