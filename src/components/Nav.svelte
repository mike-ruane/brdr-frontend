<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import Popup from './addsightings/Popup.svelte';

	export let username: string;
	const { open } = getContext('simple-modal');

	async function showAddSighting() {
		open(
			Popup,
			{ username: username },
			{ closeButton: true },
			{
				onClosed: () => {
					invalidate('/');
				}
			}
		);
	}
</script>

<nav class="navbar navbar-expand-md navbar-dark bg-dark">
	<div class="container-fluid">
		<a href="/" class="navbar-brand" class:active={$page.url.pathname === '/'}>Home</a>
		<div>
			{#if username}
				<ul class="navbar-nav me-auto mb-2 mb-md-0">
					<li class="nav-item">
						<a href="/about" class="nav-link" class:active={$page.url.pathname === '/about'}
							>About</a
						>
					</li>
					{#if $page.url.pathname !== '/about'}
						<li class="nav-item">
							<a href="/#" class="nav-link" on:click={showAddSighting}>Add Sighting</a>
						</li>
					{/if}
					<li class="nav-item">
						<a href="/logout" class="nav-link">Logout</a>
					</li>
				</ul>
			{:else}
				<ul class="navbar-nav me-auto mb-2 mb-md-0">
					<li class="nav-item">
						<a href="/login" class="nav-link">Login</a>
					</li>
					<li class="nav-item">
						<a href="/register" class="nav-link">Register</a>
					</li>
				</ul>
			{/if}
		</div>
	</div>
</nav>
