import Pool from "../database/db";
import { ITrackingPlan } from "../types/dbModels.types";
import { TrackingPlan } from "../types/trackingPlan.types";
import { getEventById } from "./eventsService";

export async function getTrackingPlanById(id: number): Promise<TrackingPlan> {
	try {
		// Get tracking plan's info
		const result = await Pool.query(`SELECT * FROM tracking_plans WHERE id = $1;`, [id]);
		const trackingPlanInfo: ITrackingPlan = result.rows[0];

		// Create tracking plan response object
		const trackingPlan: TrackingPlan = {
			id: trackingPlanInfo.id,
			name: trackingPlanInfo.name,
			description: trackingPlanInfo.description,
			create_time: trackingPlanInfo.create_time,
			update_time: trackingPlanInfo.create_time,
			events: []
		};

		// Get associated events with the tracking plan
		const trackingPlanEvents = await Pool.query(`SELECT * FROM tracking_plan_events WHERE tracking_plan_id = $1;`, [id]);

		// Parse events and push them to tracking plan response object
		const events = await Promise.all(
			trackingPlanEvents.rows.map(async (row) => {
				const event = await getEventById(parseInt(row.event_id));
		
				return {
					id: event.id,
					name: event.name,
					type: event.type,
					description: event.description,
					create_time: event.create_time,
					update_time: event.update_time,
					properties: event.properties,
					additionalProperties: event.additionalProperties,
				};
			})
		);

		trackingPlan.events = events;

		return trackingPlan;
	} catch(error: any) {
		throw new Error(error.message);
	}
}

export async function postTrackingPlan(name: string, description: string): Promise<number> {
	try {
		const result = await Pool.query(
			`INSERT INTO tracking_plans (name, description)
			 VALUES ($1, $2) RETURNING id;`,
			[name, description]
		  );
		return result.rows[0].id;
	} catch(error: any) {
		throw new Error(error.message);
	}
}

export async function deleteTrackingPlan(id: number): Promise<number |null> {
	try {
		const result = await Pool.query(`DELETE FROM tracking_plans WHERE id = $1`, [id]);
		return result.rowCount;
	} catch(error: any) {
		throw new Error(error.message);
	}
}

export async function addEventsToTrackingPlan(trackingPlanId: number, events: number[]): Promise<void> {
	//TODO: make it run faster(in parallel)
	try {
		for (const event of events) {
			await Pool.query(
			  `INSERT INTO tracking_plan_events (tracking_plan_id, event_id) 
			   VALUES ($1, $2);`,
			  [trackingPlanId, event]
			);
		  }
		return;
	} catch(error: any) {
		throw new Error(error.message);
	}
}

export async function removeEventFromTrackingPlan(trackingPlanId: number, eventId: number): Promise<number | null> {
	try {
		const result = await Pool.query(`DELETE FROM tracking_plan_events WHERE tracking_plan_id = $1 AND event_id = $2;`, [trackingPlanId, eventId]);
		return result.rowCount;
	} catch(error: any) {
		throw new Error(error.message);
	}
}