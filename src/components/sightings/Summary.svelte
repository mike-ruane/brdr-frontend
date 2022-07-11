<script lang="ts">
	import type { SightingDetail } from '../../lib/model';
	import dayjs from 'dayjs';

	export let details: SightingDetail;
	export let geo: string;
</script>

<h1 style="text-align: center">{geo}</h1>
<br />
{#each Object.entries(details) as [genus, species], index (genus)}
	<h4><i>{genus}</i></h4>
	<ul style="list-style-type:none">
		{#each species as s}
			<li><a href="species/{s.id}">{s.preferredCommonName}</a></li>
		{/each}
	</ul>
{/each}

<style>
	ul {
		-webkit-column-count: 3;
		-moz-column-count: 3;
		column-count: 3;
	}

	a:link {
		color: black;
		background-color: transparent;
	}
</style>
