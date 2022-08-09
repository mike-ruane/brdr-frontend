<script>
	import { goto } from '$app/navigation';

	import { welcome } from '../../lib/stores/welcome';
	import { onMount } from "svelte";

	onMount(() => welcome.set(true));
	function handleOnClick() {
		goto('/');
	}
</script>

<div class="welcome">
	<h2>Welcome to brdr</h2>
	<p>
		We <strong>brdrs</strong> like to keep lists. I've got a few, my brother's got a few - it's
		<strong> good family fun</strong>. We write these down on sheets of A4, full of spelling misstakes
		and <del>deletions</del>, for posterity. But maybe it's time for a digitised approach. Yeh?
		<br />
		<br />

		<strong>brdr</strong> is designed to do just this. It's <strong>just the British Isles</strong>
		currently, which has been <strong>carved up into counties</strong>. You can
		<strong>add sightings</strong> from your day in the field and you'll get these presented to you,
		alongside all your other sightings, on an <strong>interactive map</strong>.
		<br />
	</p>
</div>



<button type="button" class="btn btn-dark" on:click={handleOnClick}>So let's get started!</button>

<style>

	.welcome {
		padding: 0 10px 10px 10px;
	}
	h2 {
		text-align: center;
	}

	button {
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
</style>
