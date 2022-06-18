<script lang="ts">
	import type { SightingDetail } from '../../lib/model';
	import dayjs from 'dayjs';

	export let details: SightingDetail;
	export let geo: string;
</script>

<h2>{geo}</h2>
<br />
{#each Object.entries(details) as [date, species], index (date)}
	<h4>{dayjs(dayjs(date, 'YYYY-MM-DD')).format('D MMM, YY')}</h4>
	<ul>
		{#each species as s}
			<li>{s.preferredCommonName}</li>
		{/each}
	</ul>
{/each}
