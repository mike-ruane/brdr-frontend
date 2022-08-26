import type { RequestHandler } from './__types';

const base = import.meta.env.VITE_BRDR_API_BASE_URL;
const protocol = import.meta.env.VITE_BRDR_PROTOCOL;

export const post: RequestHandler = async ({ request, url }) => {
	const formData = await request.formData();
	const password = formData.has('password') ? formData.get('password') : undefined;
	const confirmPassword = formData.has('confirm-password')
		? formData.get('confirm-password')
		: undefined;

	if (password && confirmPassword && password !== confirmPassword) {
		const endpoint = new URL(`${protocol}://${url.host}${url.pathname}`);
		endpoint.searchParams.append('error', true);
		return {
			headers: { Location: endpoint.toString() },
			status: 302
		};
	}

	const response = await fetch(`${base}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*'
		},
		credentials: 'include',
		body: JSON.stringify({
			username: formData.has('username') ? formData.get('username') : undefined,
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
