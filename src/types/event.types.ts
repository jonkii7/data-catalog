import { Property } from "./property.types";

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export interface EventPropertiesReqBody {
	id: number,
	required: boolean
}

export type Event = {
	id: number,
	name: string,
	type: "track" | "identify" | "alias" | "screen" | "page";
	description: string,
	create_time: Date;
	update_time: Date;
	properties: Property[],
	additionalProperties: boolean,
}