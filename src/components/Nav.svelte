<script lang="ts">
	import { page } from '$app/stores';

	export let username: string;
</script>

<nav class="navbar navbar-expand-md navbar-dark bg-dark">
	<div class="container-fluid" >
		<span class="navbar-brand">{username}</span>
		<div>
			{#if username}
				<div class="dropdown" >
					<button class="btn btn-dark" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
						<i class="bi bi-list"></i>
					</button>
					<ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
						<li><a href="/" class="dropdown-item" class:active={$page.url.pathname === '/'}>Home</a></li>
						<li><a href="/about" class="dropdown-item" class:active={$page.url.pathname === '/about'}>About</a></li>
						<li><a href="/logout" class="dropdown-item">Logout</a></li>
					</ul>
				</div>
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
