import type { AddSightingData, Geo, Species } from './model';
import { getResources } from '../components/_api';

export async function addSightingMetadata(): Promise<AddSightingData | undefined> {
	const speciesResponse = await getResources(`species/all`);
	const geosResponse = await getResources(`geos/all`);

	const geosResponseBody: Geo[] = await geosResponse.json();
	const speciesResponseBody: Species[] = await speciesResponse.json();
	if (speciesResponse.status === 200 && geosResponse.status === 200) {
		return {
			species: speciesResponseBody,
			geos: geosResponseBody
		};
	}
}
