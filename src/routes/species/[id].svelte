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

		if (query.has('success')) {
			return {
				props: {
					...props,
					success: query.get('success') === 'true'
				}
			};
		}
		return {
			props: { ...props }
		};
	}
</script>

<script lang="ts">
	import type { Species } from '../../lib/model';
	import { page } from '$app/stores';
	import ContactForm from '../../components/contact/ContactForm.svelte';

	export let error;
	export let success;
	export let species: Species;
</script>

{#if success}
	<div class="alert alert-success" role="alert">Thanks for the message!</div>
{/if}

{#if error}
	<div class="alert alert-danger" role="alert">An error has occurred. Please try again.</div>
{/if}
<h1><strong>Help! Missing data for {species.preferredCommonName}</strong></h1>
<p>In order to make this page more valuable, brdr requires a really rich dataset</p>

<br />
<br />
<br />

<h2>brdr needs you!</h2>

<br />
<br />
<p>
	<strong>Do you know/have</strong> access to some
	<strong>rich datasets of resident/migratory bird species</strong>
	in the <strong>British Isles?</strong>
</p>
<br />
<br />

<ContactForm endpoint={$page.url.pathname} />
<!--<div class="message-brdr-form">-->
<!--	<form action="/species/{$page.params.id}" method="POST">-->
<!--		<h3 class="h3 mb-3 fw-normal">Please get in touch with brdr</h3>-->
<!--		<input name="username" class="form-control" placeholder="username" required />-->
<!--		<textarea name="body" class="form-control" id="messageBrdr" rows="3" />-->
<!--		<button class="w-100 btn btn-lg btn-dark" type="submit">Send to brdr</button>-->
<!--	</form>-->

<!--</div>-->
<style>
	h1 {
		text-align: center;
	}

	h2 {
		text-align: center;
	}

	p {
		text-align: center;
	}

	.message-brdr-form {
		max-width: 520px;
		padding: 15px;
		margin: auto;
	}

	.message-brdr-form input {
		text-align: center;
		margin-bottom: 10px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	.message-brdr-form textarea {
		margin-bottom: 10px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	.message-brdr-form h3 {
		text-align: center;
	}

	.message-brdr-form button {
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
</style>
