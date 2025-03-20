export interface IProperty {
	id: number;
	name: string;
	type: "string" | "number" | "boolean";
	description: string;
	create_time: Date;
	update_time: Date;
}

export interface IEvent {
	id: number;
	name: string;
	type: "track" | "identify" | "alias" | "screen" | "page";
	description: string;
	additional_properties: boolean;
	create_time: Date;
	update_time: Date;
}

export interface IEventProperties {
	event_id: number;
	property_id: number;
	required?: boolean;
}

export interface ITrackingPlan {
	id: number;
	name: string;
	description: string;
	create_time: Date;
	update_time: Date;
}

export interface ITrackingPlanEvents {
	tracking_plan_id: number;
	event_id: number;
}