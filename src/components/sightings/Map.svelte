<script lang="ts">
	import { getContext, onMount, setContext } from 'svelte';
	import { key, mapbox } from '../../mapbox.js';
	import Summary from './Summary.svelte';
	import type { SightingDetail } from '../../lib/model';

	setContext(key, {
		getMap: () => map
	});

	export let lat;
	export let lon;
	export let zoom;
	export let sightings;
	export let reload: boolean;

	let container;
	let map;

	const { open } = getContext('simple-modal');

	onMount(async () => {
		console.log(sightings);
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

			map.on('load', function () {
				map.addSource('sightings-geometries', {
					type: 'geojson',
					data: sightings
				});

				map.addLayer({
					id: 'sightings-geometries-layer',
					type: 'fill',
					source: 'sightings-geometries',
					paint: {
						'fill-color': '#eeae4e',
						'fill-outline-color': 'black'
					}
				});

				map.addLayer({
					id: 'sightings-geometries-layer-label',
					type: 'symbol',
					source: 'sightings-geometries',
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
		};
		document.head.appendChild(link);
		return () => {
			map.remove();
			link.parentNode.removeChild(link);
		};
	});
</script>

{#if reload}
	{map.getSource('lad').setData(sightings)}
{/if}
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
