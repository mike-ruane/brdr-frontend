<script lang="ts">
	import Map from '../components/Map.svelte';

	type Sighting = {
		name: string;
		geo: number[][];
		species: number[];
	};

	export let sightings;
</script>

<div class="map-container">
	<Map lat={55} lon={-2.7885207382742863} zoom={5} {sightings} />
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
