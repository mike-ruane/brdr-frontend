<script lang="ts">
	import Select from 'svelte-select';
	import { DateInput } from 'date-picker-svelte';
	import moment from 'moment';

	import AddSightingResponse from './Response.svelte';
	import type { AddSightingData, Form } from '../../lib/model';
	import { addSightingMetadata } from '../../lib/utils';
	import { onMount } from 'svelte';

	export let date = new Date();
	export let username: string;
	let metadata: AddSightingData;
	let selectedSpecies: string[];
	let selectedGeo: string;
	let formData: Form = {} as Form;
	let showResponse = false;
	let success: boolean;
	formData.date = moment(date).format('YYYY-MM-DD');

	onMount(async () => {
		metadata = await addSightingMetadata();
	});

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
		<h3>What species have you seen, {username}?</h3>
		<div class="select">
			<Select
				items={metadata && metadata.species}
				optionIdentifier="id"
				labelIdentifier="preferredCommonName"
				placeholder="enter species..."
				isMulti="true"
				on:select={selectSpecies}
			/>
		</div>
		<div class="select">
			<Select
				items={metadata && metadata.geos}
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
					on:select={() => (formData.date = moment(date).format('YYYY-MM-DD'))}
				/>
			</div>
			<button type="button" class="btn btn-dark" on:click={handleSubmit}>Submit</button>
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
