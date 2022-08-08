<script lang="ts">
	import { getContext, onMount, setContext } from 'svelte';
	import { key, mapbox } from '../../mapbox.js';
	import Summary from './Summary.svelte';
	import type { SightingDetail } from '../../lib/model';
	import Welcome from '../welcome/Welcome.svelte';
	import { welcome } from '../../lib/stores/welcome';

	setContext(key, {
		getMap: () => map
	});

	export let lat;
	export let lon;
	export let zoom;
	export let sightings;
	export let username;

	let container;
	let map;
	let hasSeenWelcome: boolean;
	welcome.subscribe((welcome) => (hasSeenWelcome = welcome));

	const { open } = getContext('simple-modal');

	onMount(async () => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css';
		link.onload = () => {
			map = new mapbox.Map({
				container,
				style: 'mapbox://styles/mike-jruane/cl2oxip1l005m15rxu9vddw8s',
				center: [lon, lat],
				zoom
			});

			if (sightings['features'].length > 0) {
				map.on('load', function () {
					map.addSource('lad', {
						type: 'geojson',
						data: sightings
					});

					map.addLayer({
						id: 'lad-layer',
						type: 'fill',
						source: 'lad',
						paint: {
							'fill-color': '#eeae4e',
							'fill-outline-color': 'black'
						}
					});

					map.addLayer({
						id: 'lad-layer-label',
						type: 'symbol',
						source: 'lad',
						layout: {
							'text-field': '{speciesCount}'
						}
					});
				});

				map.on('click', 'lad-layer', async (e) => {
					const geoId = e.features[0].properties.geometryId;
					const geo = e.features[0].properties.geometry;
					const speciesResponse = await fetch(`summary?geoId=${geoId}`);
					const details: SightingDetail = await speciesResponse.json();
					open(Summary, { details: details, geo: geo });
				});
			} else {
				if (!hasSeenWelcome) {
					open(Welcome, { username: username }, { closeButton: false });
				}
			}
		};
		document.head.appendChild(link);
		return () => {
			map.remove();
			link.parentNode.removeChild(link);
		};
	});
</script>

<div bind:this={container}>
	{#if map}
		<slot />
	{/if}
</div>

<style>
	div {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
	}
</style>
