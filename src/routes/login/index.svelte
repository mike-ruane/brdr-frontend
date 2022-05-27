<script lang="ts">
	import { goto } from '$app/navigation';

	type LoginInfo = {
		email: string;
		password: string;
	};

	let loginInfo: LoginInfo = {} as LoginInfo;

	const submit = async () => {
		const response: Response = await fetch('login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json, text/plain, */*'
			},
			credentials: 'include',
			body: JSON.stringify({
				email: loginInfo.email,
				password: loginInfo.password
			})
		});

		if (response.status == 200) {
			await goto('/');
		}
	};
</script>

<div class="form-signin">
	<form on:submit|preventDefault={submit}>
		<h1 class="h3 mb-3 fw-normal">Please sign in</h1>

		<input
			bind:value={loginInfo.email}
			type="email"
			class="form-control"
			placeholder="Email"
			required
		/>

		<input
			bind:value={loginInfo.password}
			type="password"
			class="form-control"
			placeholder="Password"
			required
		/>

		<button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
	</form>
</div>
