<script lang="ts">
	import Map from '../components/sightings/Map.svelte';
	import Modal from 'svelte-simple-modal';
	import type { Sighting } from '../lib/model';
	import { user } from '../lib/stores/user';
	import {onMount} from "svelte";
	import {authenticated} from "../lib/stores/authenticated";

	export let username: string;
	export let sightings: Sighting[];

	user.set(username);

	onMount(() => authenticated.set(true));

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
