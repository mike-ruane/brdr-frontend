<script lang="ts" context="module">
	export async function load({ session, props }) {
		return {
			props: {
				...props,
				username: session.username
			}
		};
	}
</script>

<script lang="ts">
	import Map from '../components/sightings/Map.svelte';
	import Modal from 'svelte-simple-modal';
	import { getContext, onMount } from 'svelte';
	import { welcome } from '../lib/stores/welcome';
	import { goto } from '$app/navigation';
	import Popup from '../components/addsightings/Popup.svelte';

	let hasSeenWelcome = false;
	welcome.subscribe((w) => (hasSeenWelcome = w));
	export let username: string;
	export let sightings;

	const { open } = getContext('simple-modal');
	let reload = false;

	onMount(() => {
		if ((!hasSeenWelcome && sightings['features'].length == 0) || !username) {
			goto('/about');
		}
	});
	const getSightings = () => {
		reload = true;
		open(
			Popup,
			{ username: username },
			{ closeButton: true },
			{
				onClosed: async () => {
					const settings = {
						method: 'GET',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						}
					};
					const response = await fetch('sightings', settings);
					if (response.status === 200) {
						const json = await response.json();
						sightings = json.sightings;
					}
				}
			}
		);
	};
</script>

<div class="grid-container">
	<div class="map-container">
		<Modal>
			<Map lat={55} lon={-2.7885207382742863} zoom={4.5} {sightings} {reload} />
		</Modal>
	</div>
	<div class="button-grid">
		<div class="add-sighting">
			<button type="button" class="btn btn-dark btn-rounded btn-icon" on:click={getSightings}>
				<i class="bi bi-plus-lg" />
			</button>
		</div>
	</div>
</div>

<style>
	.grid-container {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		height: 100vh;
	}
	.map-container {
		position: relative;
		height: inherit;
		width: inherit;
	}

	.btn.btn-rounded {
		border-radius: 50px;
		height: 50px;
		width: 50px;
	}

	.button-grid {
		position: absolute;
		display: grid;
		height: 100%;
		width: 100%;
		grid-template-columns: 10fr 1fr;
		grid-template-rows: 6fr 1fr;
		grid-template-areas:
			'. .'
			'. add-sighting';
	}

	.add-sighting {
		grid-area: add-sighting;
	}
</style>
