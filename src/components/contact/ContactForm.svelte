<script lang="ts">
	export let endpoint: string;
</script>

<div class="message-brdr-form">
	<form action={endpoint} method="POST">
		<div class="grid-container-two">
			<div class="form-header">
				<h3 class="h3 mb-3 fw-normal">Please get in touch with brdr</h3>
			</div>
			<div class="username-input">
				<input name="username" class="form-control" placeholder="username" required />
			</div>

			<div class="email-input">
				<input type="email" name="email" class="form-control" placeholder="email" required />
			</div>
			<div class="message-type">
				<input name="type" class="form-control" required placeholder="Subject" />
			</div>
			<div class="message-body">
				<textarea
					name="body"
					class="form-control"
					id="messageBrdr"
					rows="3"
					placeholder="Your message here..."
				/>
			</div>
			<div class="send-message">
				<button class="w-100 btn btn-lg btn-dark" type="submit">Send</button>
			</div>
		</div>
	</form>
</div>

<style>
	.message-brdr-form {
		max-width: 700px;
		max-height: 400px;
		padding: 15px;
		margin: auto;
	}

	.send-message {
		grid-area: button;
	}
	.username-input {
		grid-area: username;
	}

	.email-input {
		grid-area: email;
	}

	.message-type {
		grid-area: type;
	}

	.message-body {
		grid-area: body;
	}

	.form-header {
		grid-area: header;
		text-align: center;
	}

	.grid-container-two {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: auto;
		grid-template-areas:
			'header header header header'
			'username username email email'
			'type type type type'
			'body body body body'
			'. . . button';
		column-gap: 10px;
		row-gap: 15px;
	}
</style>
