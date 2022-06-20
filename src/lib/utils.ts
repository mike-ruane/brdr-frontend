import type { AddSightingData, Geo, Species } from './model';
import { getResources } from '../components/_api';

export async function addSightingMetadata(): Promise<AddSightingData | undefined> {
	const speciesResponse = await getResources(`species`);
	const geosResponse = await getResources(`geos`);

	const speciesResponseBody: Species[] = await speciesResponse.json();
	const geosResponseBody: Geo[] = await geosResponse.json();
	if (speciesResponse.status === 200 && geosResponse.status === 200) {
		console.log(geosResponseBody);
		return {
			species: speciesResponseBody,
			geos: geosResponseBody
		};
	}
}
