import mapbox from 'mapbox-gl';

mapbox.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

const key = Symbol();

export { mapbox, key };
