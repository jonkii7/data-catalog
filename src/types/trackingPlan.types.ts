/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Event } from "../types/event.types";
export interface TrackingPlanEventsReqBody {
	id: number
}

export type TrackingPlan = {
	id: number,
	name: string,
	description: string,
	create_time: Date;
	update_time: Date;
	events: Event[]
}