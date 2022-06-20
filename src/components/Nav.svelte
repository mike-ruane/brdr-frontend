<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import Popup from './addsightings/Popup.svelte';

	const { open } = getContext('simple-modal');

	async function showAddSighting() {
		open(
			Popup,
			{},
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
		<a href="/" class="navbar-brand" class:active={$page.url.pathname === '/'}>Home</a>

		<div>
			<ul class="navbar-nav me-auto mb-2 mb-md-0">
				<li class="nav-item">
					<a href="/#" class="nav-link" on:click={showAddSighting}>Add Sighting</a>
				</li>
				<li class="nav-item">
					<a href="/logout" class="nav-link">Logout</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
