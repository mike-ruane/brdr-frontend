/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		userid: string;
		username: string | undefined;
	}

	// interface Platform {}

	interface Session {
		username: string | undefined;
	}

	// interface Stuff {}
}
