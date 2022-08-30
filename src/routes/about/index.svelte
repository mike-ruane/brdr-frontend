<script>
	import { goto } from '$app/navigation';

	import { welcome } from '../../lib/stores/welcome';
	import { onMount } from 'svelte';

	onMount(() => welcome.set(true));
	function handleOnClick() {
		goto('/');
	}
</script>

<div class="welcome">
	<h1>Welcome to brdr!</h1>
	<br />
	<p>
		We <strong>brdrs</strong> like to keep lists. I've got a few, my brother's got a few - it's
		<strong> good family fun</strong>. We write these down on sheets of A4, full of spelling
		misstakes and <del>deletions</del>, for posterity. But maybe it's time for a digitised approach.
		<br />
		<br />

		<strong>brdr</strong> is designed to do just this. It's <strong>just the British Isles</strong>
		currently, which has been <strong>carved up into geographical areas</strong>. You can
		<strong>add sightings</strong> from your day in the field and you'll get these presented to you,
		alongside all your other sightings, on an <strong>interactive map</strong>.
	</p>
</div>

<div class="container">
	<div class="row">
		<div class="col-md-4 mt-3 col-lg-6">
			<img src="sightings_1.jpg" class="img-fluid" alt="image" />
			<span>Use the button in the bottom right to add sightings</span>
		</div>
		<div class="col-md-4 mt-3 col-lg-6">
			<img src="sightings_2.jpg" class="img-fluid" alt="image" />
			<span>Input your species and select your location...</span>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4 mt-3 col-lg-6">
			<img src="sightings_3.jpg" class="img-fluid" alt="image" />
			<span>and your sightings will appear on the map</span>
		</div>
		<div class="col-md-4 mt-3 col-lg-6">
			<img src="sightings_4.jpg" class="img-fluid" alt="image" />
			<span>Click on the shaded in area to then view your sightings</span>
		</div>
	</div>
</div>
<!--<div class="storyboard">-->
<!--	<img src="brdr_storyboard_2.jpg" alt="brdr panel" width="800" height="800">-->
<!--</div>-->

<div class="lets-go">
	<button type="button" class="btn btn-dark" on:click={handleOnClick}>So let's get started!</button>
</div>

<style>
	.welcome {
		padding: 20px 10px 10px 10px;
		display: block;
	}

	h1 {
		text-align: center;
	}

	button {
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	.lets-go {
		padding: 20px 20px 20px 20px;
	}
</style>
