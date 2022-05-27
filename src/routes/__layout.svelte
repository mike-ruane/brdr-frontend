<script>
	import Nav from '../components/Nav.svelte';
	import { Modal } from 'svelte-simple-modal';
</script>

<Modal styleContent={{ display: 'flex', 'justify-content': 'center' }}>
	<Nav />
</Modal>

<main>
	<slot />
</main>

<style>
	:global(body) {
		font-family: 'Courier New', monospace;
	}
</style>
