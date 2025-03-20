/* eslint-disable @typescript-eslint/consistent-type-definitions */

export type Property = {
	name: string,
	type: "string" | "number" | "boolean";
	required: boolean,
	description: string
}