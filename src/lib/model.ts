export type Species = {
	id: number;
	scientificName: string;
	preferredCommonName: string;
	habitat?: string;
	genus?: string;
	family?: string;
	familyOrder?: string;
	breedingPopulation?: string;
	winterVisitorPopulation?: string;
};

export type Geo = {
	id: number;
	name: string;
};

export type AddSightingData = {
	species: Species[];
	geos: Geo[];
};

export type Sighting = {
	name: string;
	geoId: number;
	geo: number[][];
	species: number[];
};

export type Form = {
	userId: number;
	species: number[];
	geoId: number;
	date: string;
};

export type SightingDetail = {
	genus: string;
	species: Species;
};
