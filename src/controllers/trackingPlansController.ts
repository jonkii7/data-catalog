import { Request, Response } from "express";
import * as trackingPlansService from "../services/trackingPlansService";
import { addPropertiesToEvent, postEvent } from "../services/eventsService";
import { postProperty } from "../services/propertiesService";

export async function postTrackingPlan(req: Request, res: Response): Promise<void> {
	const {name, description, events} = req.body;

	if(!name || !description) {
		res.status(400).send({
			error: "Name and description should not be empty"
		});
		return;
	}

	if(typeof name !== "string") {
		console.log(typeof name);
		res.status(400).send({
			error: "Name type should be string"
		});
		return;
	}

	if(typeof description !== "string") {
		res.status(400).send({
			error: "Description type should be string"
		});
		return;
	}

	try {
		const result = await trackingPlansService.postTrackingPlan(name, description);

		const trackingPlanId = result;

		for (const event of events) {
			if(!event.name || !event.type || !event.description) {
				res.status(400).send({
					error: "Event's columns name,type and description should not be empty"
				});
				return;
			}
		
			if(!["track", "identify", "alias", "screen", "page"].includes(event.type)) {
				res.status(400).send({
					error: "Event's column type should be one of 'track', 'identify', 'alias', 'screen','page'"
				});
				return;
			}
		
			if(typeof event.name !== "string") {
				console.log(typeof event.name);
				res.status(400).send({
					error: "Event's column name type should be string"
				});
				return;
			}
		
			if(typeof event.description !== "string") {
				res.status(400).send({
					error: "Event's column description type should be string"
				});
				return;
			}
			const eventId = await postEvent(event.name, event.type, event.description, event.additional_properties);

			if(eventId)
				await trackingPlansService.addEventsToTrackingPlan(trackingPlanId, [eventId]);

			for (const property of event.properties) {
				if(!property.name || !property.type || !property.description) {
					res.status(400).send({
						error: "Property's columns name,type or description should not be empty."
					});
					return;
				}
			
				if(!["string", "number", "boolean"].includes(property.type)) {
					res.status(400).send({
						error: "Property's columns type should be one of 'string', 'number', 'boolean'"
					});
					return;
				}
			
				if(typeof property.name !== property.type) {
					res.status(400).send({
						error: "Property's columns name type should be the same as type property."
					});
					return;
				}
			
				if(typeof property.description !== "string") {
					res.status(400).send({
						error: "Description type should be string"
					});
					return;
				}

				const propertyId = await postProperty(property.name, property.type, property.description);
				if(eventId && propertyId)
					await addPropertiesToEvent(eventId, [{id:propertyId, required:property.required}]);
			}

		}

		res.status(201).send({
			success: result ? true : false,
		});
	} catch(err: any) {
		console.error(err);
		res.status(500).json({
			error: "Error creating tracking plan",
		});
	}
}

export async function deleteTrackingPlan(req: Request, res: Response): Promise<void> {
	const trackingPlanId = req.params.tid;

	try {
		const result = await trackingPlansService.deleteTrackingPlan(parseInt(trackingPlanId));
		
		if (!result) {
			res.status(404).json({ error: "Tracking Plan not found" });
			return;
		}

		res.status(200).send({
			success: true,
		});
		return;
	} catch (err) {
		res.status(500).send({
			error: err,
		});
		return;
	} 
}

export async function addEventsToTrackingPlan(req: Request, res: Response): Promise<void> {
	const trackingPlanId = req.params.tid;
	const events: number[] = req.body.events;

	if (!Array.isArray(events) || events.length === 0) {
		res.status(400).json({ error: "Events array is required" });
		return;
	}
	
	try {
		await trackingPlansService.addEventsToTrackingPlan(parseInt(trackingPlanId), events);
		res.status(201).send({
			success: true,
		});
		return;
	} catch(err: any) {
		console.error(err);
		res.status(500).json({
			error: "Error on adding events to tracking plan",
		});
		return;
	}
}

export async function removeEventFromTrackingPlan(req: Request, res: Response): Promise<void> {
	const {tid, eid} = req.params;

	try {
		const result = await trackingPlansService.removeEventFromTrackingPlan(parseInt(tid), parseInt(eid));
		res.status(200).send({
			success: result ? true : false,
		});
		return;
	} catch(err: any) {
		console.error(err);
		res.status(500).json({
			error: "Error on removing event from tracking plan",
		});
		return;
	}
}
