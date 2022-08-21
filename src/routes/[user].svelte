<script lang="ts">
  import Map from '../components/sightings/Map.svelte';
  import Modal from 'svelte-simple-modal';

  export let sightings;

</script>

<div class="grid-container">
  <div class="map-container">
    <Modal>
      <Map lat={55} lon={-2.7885207382742863} zoom={4.5} sightings={sightings} reload={false} />
    </Modal>
  </div>
</div>

<style>
  .grid-container {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    height: 100vh;
  }
  .map-container {
    position: relative;
    height: inherit;
    width: inherit;
  }
</style>
