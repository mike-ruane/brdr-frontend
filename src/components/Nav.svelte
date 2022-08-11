<script lang="ts">
	import { page } from '$app/stores';

	export let username: string;
</script>

<nav class="navbar navbar-expand-md navbar-dark bg-dark">
	<div class="container-fluid">
		{#if username}
			<span class="navbar-brand">Hi, {username}!</span>
			<div class="dropdown">
				<button
					class="btn btn-dark"
					type="button"
					id="dropdownMenuButton1"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<i class="bi bi-list" />
				</button>
				<ul
					class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
					aria-labelledby="dropdownMenuButton1"
				>
					<li>
						<a href="/" class="dropdown-item" class:active={$page.url.pathname === '/'}>Home</a>
					</li>
					<li>
						<a href="/about" class="dropdown-item" class:active={$page.url.pathname === '/about'}
							>About</a
						>
					</li>
					<li><a href="/logout" class="dropdown-item">Logout</a></li>
				</ul>
			</div>
		{:else}
			<span class="navbar-brand">Welcome!</span>
			<div class="dropdown">
				<button
					class="btn btn-dark"
					type="button"
					id="plainView"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<i class="bi bi-list" />
				</button>
				<ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="plainView">
					<li class="nav-item">
						<a href="/login" class="dropdown-item" class:active={$page.url.pathname === '/login'}
							>Login</a
						>
					</li>
					<li class="nav-item">
						<a
							href="/register"
							class="dropdown-item"
							class:active={$page.url.pathname === '/register'}>Register</a
						>
					</li>
				</ul>
			</div>
		{/if}
	</div>
</nav>
