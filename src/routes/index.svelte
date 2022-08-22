<script lang="ts" context="module">
	export async function load({ session, props, url }) {
		return {
			props: {
				...props,
				username: session.username,
				url: url.href
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
	import Twitter from '../components/sharebuttons/Twitter.svelte';

	let hasSeenWelcome = false;
	welcome.subscribe((w) => (hasSeenWelcome = w));
	export let username: string;
	export let url: string;
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
			<Map
				lat={55}
				lon={-2.7885207382742863}
				zoom={4.5}
				{sightings}
				{reload}
				username={undefined}
			/>
		</Modal>
	</div>

	<div class="add-sighting">
		<div class="dropdown">
			<button
				class="btn btn-dark btn-icon"
				type="button"
				id="dropdownMenuButton1"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<i class="bi bi-caret-up-fill" />
			</button>
			<ul
				class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
				aria-labelledby="dropdownMenuButton1"
			>
				<li>
					<button class="addSighting dropdown-item" on:click={getSightings}
						><span>Add sightings</span></button
					>
				</li>
				<li>
					<Twitter url={`${url}${username}`} title={'Check out my sightings on brdr!'} />
				</li>
			</ul>
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

	.addSighting {
		background: transparent;
		border-style: none;
		transition: all 0.2s ease-in-out;
	}
	@media (prefers-reduced-motion: reduce) {
		.addSighting {
			transition: all 2s ease-in-out;
		}
	}

	.addSighting:focus,
	.addSighting:hover {
		transform: scale(1.1);
	}
	@media screen and (max-width: 42rem) {
		.addSighting {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
	}

	.btn.btn-rounded {
		border-radius: 50px;
		height: 50px;
		width: 50px;
	}

	@media screen and (max-width: 767px) {
		.add-sighting {
			position: absolute;
			bottom: 80px;
			right: 15px;
		}
	}

	@media screen and (min-width: 768px) {
		.add-sighting {
			margin-left: 95%;
			margin-top: 47%;
			position: absolute;
		}
	}
</style>
