<script lang="ts">
	import Select from 'svelte-select';
	import { DateInput } from 'date-picker-svelte';
	import dayjs from 'dayjs';

	import AddSightingResponse from './Response.svelte';
	import type { Form, Geo, Species } from '../../lib/model';

	export let species: Species[];
	export let geos: Geo[];
	export let date = new Date();
	let selectedSpecies: string[];
	let selectedGeo: string;
	let formData: Form = {} as Form;
	let showResponse = false;
	let success: boolean;
	formData.date = dayjs(date).format('YYYY-MM-DD');

	function selectSpecies(event) {
		if (event.detail) {
			formData.species = event.detail.map((item) => item.id);
			selectedSpecies = event.detail.map((item) => item.preferredCommonName);
		}
	}

	function selectGeo(event) {
		formData.geoId = event.detail.id;
		selectedGeo = event.detail.name;
	}

	async function handleSubmit() {
		const settings = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		};
		const response = await fetch('sightings', settings);
		if (response.status === 201) {
			showResponse = true;
			success = true;
		} else if (response.status === 409) {
			showResponse = true;
			success = false;
		}
	}
</script>

{#if showResponse}
	<AddSightingResponse species={selectedSpecies} location={selectedGeo} {date} {success} />
{:else}
	<div class="addSighting">
		<div class="select">
			<Select
				items={species}
				optionIdentifier="id"
				labelIdentifier="preferredCommonName"
				placeholder="enter species..."
				isMulti="true"
				on:select={selectSpecies}
			/>
		</div>
		<div class="select">
			<Select
				items={geos}
				optionIdentifier="id"
				labelIdentifier="name"
				placeholder="enter county..."
				on:select={selectGeo}
			/>
		</div>
		<div class="lastRow">
			<div class="dateInput">
				<DateInput
					bind:value={date}
					format="dd/MM/yyyy"
					closeOnSelection="true"
					on:select={() => (formData.date = dayjs(date).format('YYYY-MM-DD'))}
				/>
			</div>
			<button on:click={handleSubmit}>Submit</button>
		</div>
	</div>
{/if}

<style>
	.addSighting {
		flex: 1;
		padding: 30px 30px;
	}

	.select {
		padding: 10px 0 10px;
	}

	.lastRow {
		display: flex;
		column-gap: 30px;
	}

	.dateInput {
		flex: 4;
	}

	button {
		flex: 1;
	}
</style>
