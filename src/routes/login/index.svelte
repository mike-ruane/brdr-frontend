<div class="form-signin">
	<form action="/login" method="POST">
		<h1 class="h3 mb-3 fw-normal">Please sign in</h1>

		<input type="email" name="email" class="form-control" placeholder="Email" required />

		<input type="password" name="password" class="form-control" placeholder="Password" required />

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
