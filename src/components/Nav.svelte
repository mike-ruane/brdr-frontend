<script lang="ts">
	import {getContext, onMount} from 'svelte';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import Popup from './addsightings/Popup.svelte';
	import {authenticated} from "../lib/stores/authenticated";

	const { open } = getContext('simple-modal');

	let auth = false;
	authenticated.subscribe(a => auth = a);

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

	const logout = () => authenticated.set(false);
</script>

<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
	<div class="container-fluid">
		<a href="/" class="navbar-brand" class:active={$page.url.pathname === '/'}>Home</a>
		<div>
			{#if auth}
			<ul class="navbar-nav me-auto mb-2 mb-md-0">
				<li class="nav-item">
					<a href="/#" class="nav-link" on:click={showAddSighting}>Add Sighting</a>
				</li>
				<li class="nav-item">
					<a href="/logout" class="nav-link" on:click={logout}>Logout</a>
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
