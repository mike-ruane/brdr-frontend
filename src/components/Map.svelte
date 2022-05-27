<script>
	import { onMount, setContext } from 'svelte';
	import { mapbox, key } from '../mapbox.js';

	setContext(key, {
		getMap: () => map
	});

	export let lat;
	export let lon;
	export let zoom;
	export let sightings;

	let container;
	let map;

	function mapSightingsToGeoJson(sightings) {
		return {
			type: 'FeatureCollection',
			features: sightings.map((sighting) => {
				return {
					type: 'Feature',
					properties: {
						name: sighting.name,
						species: sighting.species,
						speciesCount: sighting.species.length
					},
					geometry: {
						type: 'Polygon',
						coordinates: [sighting.geo]
					}
				};
			})
		};
	}

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

			if (sightings.length > 0) {
				map.on('load', function () {
					const geoJson = mapSightingsToGeoJson(sightings);
					map.addSource('lad', {
						type: 'geojson',
						data: geoJson
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
