<script context="module">
	/** @type {import('./__types/[slug]').Load} */
	export async function load({ session }) {
		return {
			props: {
				username: session.username
			}
		};
	}
</script>

<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import { Modal } from 'svelte-simple-modal';
	export let username: string;
</script>

<Nav {username} />
<Modal styleContent={{ display: 'flex', 'justify-content': 'center' }}>
	<main>
		<slot />
	</main>
</Modal>

<style>
	:global(body) {
		font-family: 'Courier New', monospace;
	}
</style>
