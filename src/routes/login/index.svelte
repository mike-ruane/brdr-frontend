<script lang="ts" context="module">
	export async function load({ url, props }) {
		const query = url.searchParams || ({} as any);

		if (query.has('error')) {
			return {
				props: {
					...props,
					error: query.get('error')
				}
			};
		}
		return {
			props: { ...props }
		};
	}
</script>

<script lang="ts">
	export let error;
</script>

<div class="form-signin">
	<form action="/login" method="POST">
		<h1 class="h3 mb-3 fw-normal">Please sign in</h1>

		<input type="email" name="email" class="form-control" placeholder="Email" required />

		<input type="password" name="password" class="form-control" placeholder="Password" required />

		{#if error}
			<div class="alert alert-danger" role="alert">
				<small>Incorrect username/password.</small>
			</div>
		{/if}

		<button class="w-100 btn btn-lg btn-dark" type="submit">Sign in</button>
	</form>
	<p><a href="/register">Create account</a></p>
</div>

<style>
	.form-signin {
		width: 100%;
		max-width: 330px;
		padding: 15px;
		margin: auto;
	}

	.form-signin input {
		margin-bottom: 10px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	p {
		text-align: center;
		padding: 5px;
	}

	a {
		color: black;
	}
</style>
