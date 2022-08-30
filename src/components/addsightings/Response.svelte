<script lang="ts">
	import moment from 'moment';

	export let species: string[];
	export let location: string;
	export let date: Date;
	export let success;

	function buildSuccessMessage() {
		if (species.length === 1) {
			return `Added your sighting of ${species} in ${location} on ${moment(date).format(
				'ddd MMM D, YYYY'
			)}`;
		} else {
			return `Added the following sightings in ${location} on ${moment(date).format(
				'ddd MMM D, YYYY'
			)}:\n${species.join('\n')}`;
		}
	}

	function buildDuplicateMessage() {
		return `You've already tracked a sighting of ${species} in ${location}!`;
	}
</script>

{#if success}
	<div>
		<p>
			<span>🪶 🪶 🪶</span>
			<span
				>Added the following sightings in {location} on {moment(date).format('ddd MMM D, YYYY')}
			</span>
		</p>
		<br />
		<br />
		<ul>
			{#each species as s}
				<li>{s}</li>
			{/each}
		</ul>
	</div>
{:else}
	<p><span>❌ ❌ ❌</span><span> {buildDuplicateMessage()} </span></p>
{/if}

<style>
	p {
		display: inline-grid;
		margin: auto;
		text-align: center;
	}

	ul {
		columns: 2;
		list-style-type: none;
	}
</style>
