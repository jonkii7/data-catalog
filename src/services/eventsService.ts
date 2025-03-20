import Pool from "../database/db";
import { EventPropertiesReqBody } from "../types/event.types";
import { Event } from "../types/event.types";

export async function getEvents(): Promise<Event[]> {
	try {
		const result = await Pool.query(`
			SELECT
				events.id AS event_id,                 
          		events.name AS event_name, 
				events.type As event_type,
          		events.description AS event_description,
          		events.additional_properties,
          		events.create_time,
          		events.update_time,
          		properties.id AS property_id,
          		properties.name AS property_name,
          		properties.type AS property_type,
          		event_properties.required AS property_required
       		FROM events
       		LEFT JOIN event_properties ON events.id = event_properties.event_id
       		LEFT JOIN properties ON event_properties.property_id = properties.id;
			`
		);

		const eventsMap: Record<number, Event> = {};

		result.rows.forEach((row) => {
			//If an event is now in eventsMap create it
			if(!eventsMap[row.event_id]) {
				eventsMap[row.event_id]= {
					id: row.event_id,
					name: row.event_name,
					type: row.event_type,
					description: row.event_description,
					create_time: row.create_time,
					update_time: row.update_time,
					properties: [],
					additionalProperties: row.additional_properties,
				};
			}

			//Push property of event into properties[]
			if(row.property_id) {
				eventsMap[row.event_id].properties.push({
					name: row.property_name,
					type: row.property_type,
					required: row.property_required,
					description: row.property_description
				});
			}
		});

		const events = Object.values(eventsMap);

		return events;
	} catch(error: any) {
		throw new Error(error.message);
	}
}

export async function postEvent(name: string, type: string, description: string, additional_properties: boolean): Promise<number | null> {
	const existingEvent = await Pool.query(
		`SELECT id FROM events WHERE name = $1 AND type = $2;`,
		[name, type]
	);

	if (existingEvent.rows.length > 0) {
		// If event exists, return the existing event ID
		return existingEvent.rows[0].id;
	}

	try {
		const result = await Pool.query(
			`INSERT INTO events (name, type, description, additional_properties)
			 VALUES ($1, $2, $3, $4) RETURNING id;`,
			[name, type, description, additional_properties]
		  );
		return result.rows[0].id;
	} catch(error: any) {
		throw new Error(error.message);
	}
}

export async function updateEvent(id:number, name: string, type: string, description: string, additional_properties: boolean): Promise<number | null> {
	const date = new Date();
	try {
		const result = await Pool.query(
			`UPDATE events 
			 SET name = $1, type = $2, description = $3, additional_properties = $4, update_time = $5
			 WHERE id = $6;`,
			[name, type, description, additional_properties, date, id]
		  );
		return result.rowCount;
	} catch(error: any) {
		throw new Error(error.message);
	}
}

export async function deleteEvent(id: number): Promise<number |null> {
	try {
		const result = await Pool.query(`DELETE FROM events WHERE id = $1`, [id]);
		return result.rowCount;
	} catch(error: any) {
		throw new Error(error.message);
	}
}

export async function addPropertiesToEvent(eventId: number, properties: EventPropertiesReqBody[]): Promise<void> {
	/////////////////////////////////////////////
	/* for (const property of properties) {
		const existingEventProperty = await Pool.query(
			`SELECT * FROM event_properties WHERE event_id = $1 AND property_id = $2;`,
			[eventId, property.id]
		);

		if (existingEventProperty.rows.length > 0) {
			// If event_property exists
			return existingEvent.rows[0].id;
		}
	} */
	//////////////////////////////////////////
	//TODO: make it run faster(in parallel)
	try {
		for (const property of properties) {
			const existingEventProperty = await Pool.query(
				`SELECT * FROM event_properties WHERE event_id = $1 AND property_id = $2;`,
				[eventId, property.id]
			);
			if (existingEventProperty.rows.length > 0) {
				continue;
			}
			await Pool.query(
				`INSERT INTO event_properties (event_id, property_id, required) 
				 VALUES ($1, $2, $3);`,
				[eventId, property.id, property.required]
			);
		}
		return;
	} catch(error: any) {
		throw new Error(error.message);
	}
}

export async function removePropertyFromEvent(eventId: number, propertyId: number): Promise<number | null> {
	try {
		const result = await Pool.query(`DELETE FROM event_properties WHERE event_id = $1 AND property_id = $2;`, [eventId, propertyId]);
		return result.rowCount;
	} catch(error: any) {
		throw new Error(error.message);
	}
}