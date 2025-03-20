import { Request, Response } from "express";
import * as eventsService from "../services/eventsService";
import { EventPropertiesReqBody } from "../types/event.types";
import { Event } from "../types/event.types";
import { IEvent } from "../types/dbModels.types";

export async function getEvents(_req: Request, res: Response): Promise<void> {
	try {
		const events: Event[] = await eventsService.getEvents();
		res.status(200).send({
			events: events,
		});
		return;
	} catch (err) {
		res.status(500).send({
			error: "Error getting properties",
		});
		return;
	}
}

export async function postEvent(req: Request, res: Response): Promise<void> {
	const {name, type, description, additional_properties} = req.body;

	if(!name || !type || !description) {
		res.status(400).send({
			error: "Name,type or description should not be empty"
		});
		return;
	}

	if(!["track", "identify", "alias", "screen", "page"].includes(type)) {
		res.status(400).send({
			error: "Type should be one of 'track', 'identify', 'alias', 'screen','page'"
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
		const result = await eventsService.postEvent(name, type, description, additional_properties);
		res.status(201).send({
			success: result ? true : false,
		});
	} catch(err: any) {
		console.error(err);
		res.status(500).json({
			error: "Error creating event",
		});
	}
}

export async function updateEvent(req: Request, res: Response): Promise<void> {
	const id = req.params.eid;

	const { name, type, description, additional_properties}: IEvent = req.body;
	if(!name || !type || !description) {
		res.status(400).send({
			error: "Name, type, description should not be empty."
		});
		return;
	}

	if(!["track", "identify", "alias", "screen", "page"].includes(type)) {
		res.status(400).send({
			error: "Type should be one of 'track', 'identify', 'alias', 'screen','page'"
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
		const result = await eventsService.updateEvent(parseInt(id), name, type, description, additional_properties);
		
		if (!result) {
			res.status(404).json({ error: "Event not found" });
			return;
		}
		
		res.status(201).send({
			success: true,
		});
	} catch(err: any) {
		console.error(err);
		res.status(500).json({
			error: "Error updating event",
		});
	}
}

export async function deleteEvent(req: Request, res: Response): Promise<void> {
	const eventId = req.params.eid;

	try {
		const result = await eventsService.deleteEvent(parseInt(eventId));
		
		if (!result) {
			res.status(404).json({ error: "Event not found" });
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

export async function addPropertiesToEvent(req: Request, res: Response): Promise<void> {
	const eventId = req.params.eid;
	const properties: EventPropertiesReqBody[] = req.body.properties;

	if (!Array.isArray(properties) || properties.length === 0) {
		res.status(400).json({ error: "Properties array is required" });
		return;
	}
	
	try {
		await eventsService.addPropertiesToEvent(parseInt(eventId), properties);
		res.status(201).send({
			success: true,
		});
		return;
	} catch(err: any) {
		console.error(err);
		res.status(500).json({
			error: "Error on adding properties to event",
		});
		return;
	}
}

export async function removePropertyFromEvent(req: Request, res: Response): Promise<void> {
	const {eid, pid} = req.params;

	try {
		const result = await eventsService.removePropertyFromEvent(parseInt(eid), parseInt(pid));
		res.status(200).send({
			success: result ? true : false,
		});
		return;
	} catch(err: any) {
		console.error(err);
		res.status(500).json({
			error: "Error on removing property from event",
		});
		return;
	}
}
