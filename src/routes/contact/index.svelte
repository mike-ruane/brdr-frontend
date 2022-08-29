<script lang="ts">
	import { page } from '$app/stores';
	import ContactForm from '../../components/contact/ContactForm.svelte';
</script>

<div class="contact">
	<h1>Please get in touch!</h1>
	<br />
	<p>brdr is only really as powerful as the dataset that's behind it. At present, we only have basic
		information like the name of the species and which family it belongs to. What brdr could do with
		is a little help from the community to enrich this dataset. Think Collins Bird Guide, but digitised.
		If you think you could help gather this information, then please get in touch via the form below.
		This message will go directly to the creator of brdr, who will be in touch!</p>

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
