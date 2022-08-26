<script lang="ts">
	import { page } from '$app/stores';
	import ContactForm from '../../components/contact/ContactForm.svelte';
</script>

<div class="contact">
<h1>Please get in touch!</h1>
<br />
<p>
	brdr's power is in the community. In order for brdr to become more powerful, it could really do
	with a little help from its friends. If you think you could help, please get in touch using the
	form below.</p>
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
