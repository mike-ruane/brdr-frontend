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
	import { page } from '$app/stores';
	import ContactForm from '../../components/contact/ContactForm.svelte';

	export let error;
	export let success;
</script>

{#if success}
	<div class="alert alert-success" role="alert">Thanks for the message!</div>
{/if}

{#if error}
	<div class="alert alert-danger" role="alert">An error has occurred. Please try again.</div>
{/if}
<div class="contact">
	<h1>Please get in touch!</h1>
	<br />
	<p>
		brdr is only really as powerful as the dataset that's behind it. At present, we only have basic
		information like the name of the species and which family it belongs to. What brdr could do with
		is a little help from the community to enrich this dataset. Think Collins Bird Guide, but
		digitised. If you think you could help gather this information, then please get in touch via the
		form below. This message will go directly to the creator of brdr, who will be in touch!
	</p>

	<br />
</div>
<ContactForm endpoint={$page.url.pathname} />

<style>
	.contact {
		padding: 20px 10px 10px 10px;
	}
	h1 {
		text-align: center;
	}
</style>
