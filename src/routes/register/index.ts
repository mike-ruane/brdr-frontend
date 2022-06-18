import type { RequestHandler } from './__types';

const base = 'http://localhost:8000/api';

export const post: RequestHandler = async ({ request }) => {
	const formData = await request.formData();

	const response = await fetch(`${base}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*'
		},
		credentials: 'include',
		body: JSON.stringify({
			username: formData.has('username') ? formData.get('username') : undefined,
			email: formData.has('email') ? formData.get('email') : undefined,
			password: formData.has('password') ? formData.get('password') : undefined
		})
	});

	if (response.status === 201) {
		return redirect;
	} else {
		return {
			status: response.status
		};
	}
};

const redirect = {
	status: 303,
	headers: {
		location: '/login'
	}
};
