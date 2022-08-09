<script context="module">
	/** @type {import('./__types/[slug]').Load} */
	export async function load({ params, fetch, session, stuff }) {
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

<Modal styleContent={{ display: 'flex', 'justify-content': 'center' }}>
	<Nav {username} />
</Modal>

<main>
	<slot />
</main>

<style>
	:global(body) {
		font-family: 'Courier New', monospace;
	}
</style>
