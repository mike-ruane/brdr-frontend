<div class="form-signin">
	<form action="/register" method="POST">
		<h1 class="h3 mb-3 fw-normal">Please register</h1>

		<input type="text" name="username" class="form-control" placeholder="Username" required />

		<input type="email" name="email" class="form-control" placeholder="Email" required />

		<input type="password" name="password" class="form-control" placeholder="Password" required />

		<button class="w-100 btn btn-lg btn-dark" type="submit">Submit</button>
	</form>
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
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	}
</style>
