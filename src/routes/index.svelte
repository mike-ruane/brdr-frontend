<script lang="ts">
	import Map from '../components/sightings/Map.svelte';
	import Modal from 'svelte-simple-modal';
	import type { Sighting } from '../lib/model';
	import { onMount } from 'svelte';
	import { authenticated } from '../lib/stores/authenticated';
	import {welcome} from "../lib/stores/welcome";
	import { goto } from '$app/navigation';

	let hasSeenWelcome = false
	welcome.subscribe((w) => (hasSeenWelcome = w))
	export let username: string;
	export let sightings: Sighting[];

	onMount(() => {
		console.log(sightings);
		if (!hasSeenWelcome && sightings['features'].length == 0) {
			goto('/about')
		}
		authenticated.set(true)
	});

</script>

<div class="map-container">
	<Modal>
		<Map lat={55} lon={-2.7885207382742863} zoom={5} {sightings} {username} />
	</Modal>
</div>

<style>
	.map-container {
		position: relative;
		top: 0;
		bottom: 40px;
		width: 100%;
		height: 100vh;
	}
</style>
