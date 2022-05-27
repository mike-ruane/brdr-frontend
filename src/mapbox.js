import mapbox from 'mapbox-gl';

// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken =
	'pk.eyJ1IjoibWlrZS1qcnVhbmUiLCJhIjoiY2wwMjljbWk2MDA1ZjNrbmUyZDRzeDJzNSJ9.HP03FxHHHiqqH4LW4ZnxfA';

const key = Symbol();

export { mapbox, key };
