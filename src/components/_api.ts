/*
	This module is used by the /todos endpoint to
	make calls to api.svelte.dev, which stores todos
	for each user. The leading underscore indicates that this is
	a private module, _not_ an endpoint — visiting /todos/_api
	will net you a 404 response.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/

const base = import.meta.env.VITE_BRDR_API_BASE_URL;

export function getResources(resource: string) {
	return fetch(`${base}/${resource}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	});
}

export function postData(resource: string, cookie: string, data?: Record<string, unknown>) {
	return fetch(`${base}/${resource}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			cookie: cookie
		},
		credentials: 'include',
		body: data && JSON.stringify(data)
	});
}
