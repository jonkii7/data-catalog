import Pool from "../database/db";

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