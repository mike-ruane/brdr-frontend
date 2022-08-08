import type { RequestHandler } from "./__types";

const base = import.meta.env.VITE_BRDR_API_BASE_URL;

export const post: RequestHandler = async ({ request, params, url }) => {
  const data = await request.formData();
  console.log(data.get('username'));
  const username = data.has('username') ? data.get('username') : undefined;
  const body = data.has('body') ? data.get('body') : undefined;


  const response = await fetch(`${base}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'
    },
    credentials: 'include',
    body: JSON.stringify({
      username: username,
      body: body
    })
  });
  //
  const status: number = response.status;
  const endpoint = new URL(`http://${url.host}${url.pathname}`);

  if (status == 200) {
    endpoint.searchParams.append('success', true);
  } else {
    endpoint.searchParams.append('error', true);
  }
  return {
    headers: { Location: endpoint.toString() },
    status: 302
  }

}
