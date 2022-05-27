<script lang="ts">
	import { getContext } from 'svelte';
	import AddSightingPopup from './AddSightingPopup.svelte';
	import { getResources } from './_api';
	import { invalidate } from '$app/navigation';

	const { open } = getContext('simple-modal');

	export type Species = {
		id: number;
		preferredCommonName: string;
	};

	type Geo = {
		id: number;
		name: string;
	};

	type AddSightingData = {
		species: Species[];
		geos: Geo[];
	};

	async function addSightingMetadata(): Promise<AddSightingData> {
		const speciesResponse = await getResources(`species`);
		const geosResponse = await getResources(`geos`);

		const speciesResponseBody: Species[] = await speciesResponse.json();
		const geosResponseBody: Geo[] = await geosResponse.json();
		if (speciesResponse.status === 200 && geosResponse.status === 200) {
			return {
				species: speciesResponseBody,
				geos: geosResponseBody
			};
		}
	}

	async function showAddSighting() {
		const metadata: AddSightingData = await addSightingMetadata();
		open(
			AddSightingPopup,
			{ geos: metadata.geos, species: metadata.species },
			{ closeButton: true },
			{
				onClosed: () => {
					invalidate('/');
				}
			}
		);
	}
</script>

<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
	<div class="container-fluid">
		<a href="/" class="navbar-brand">Home</a>

		<div>
			<ul class="navbar-nav me-auto mb-2 mb-md-0">
				<li class="nav-item">
					<a href="/#" class="nav-link" on:click={showAddSighting}>Add Sighting</a>
				</li>
				<li class="nav-item">
					<a href="/#" class="nav-link">Logout</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
