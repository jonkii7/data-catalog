import { Request, Response } from "express";
import { IProperty } from "../types/dbModels.types";
import * as propertiesService from "../services/propertiesService";

export async function getProperties(_req: Request, res: Response): Promise<void> {
	try {
		const properties: IProperty[] = await propertiesService.getProperties();
		res.status(200).send({
			properties: properties,
		});
		return;
	} catch (err) {
		res.status(500).send({
			error: "Error getting properties",
		});
		return;
	}
}

export async function getPropertyById(req: Request, res: Response): Promise<void> {
	const id = req.params.pid;

	try {
		const property: IProperty = await propertiesService.getPropertyById(parseInt(id));
		if (!property) {
			res.status(404).send({ error: "Property not found" });
			return;
		  }
		res.status(200).send({
			property: property,
		});
		return;
	} catch (err) {
		res.status(500).send({
			error: "Error getting property",
		});
		return;
	}
}

export async function postProperty(req: Request, res: Response): Promise<void> {
	const { name, type, description}: IProperty = req.body;

	// Request Body validations
	if(!name || !type || !description) {
		res.status(400).send({
			error: "Name,type or description should not be empty."
		});
		return;
	}

	if(!["string", "number", "boolean"].includes(type)) {
		res.status(400).send({
			error: "Type should be one of 'string', 'number', 'boolean'"
		});
		return;
	}

	if(typeof name !== type) {
		res.status(400).send({
			error: "Name type should be the same as type property."
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
		const result = await propertiesService.postProperty(name, type, description);
		res.status(201).send({
			success: result ? true : false,
		});
	} catch(err: any) {
		console.error(err);
		res.status(500).json({
			error: "Error creating property",
		});
	}
}

export async function updateProperty(req: Request, res: Response): Promise<void> {
	const id = req.params.pid;

	const { name, type, description}: IProperty = req.body;

	// Request Body validations
	if(!name || !type || !description) {
		res.status(400).send({
			error: "Name,type or description should not be empty."
		});
		return;
	}

	if(!["string", "number", "boolean"].includes(type)) {
		res.status(400).send({
			error: "Type should be one of 'string', 'number', 'boolean'"
		});
		return;
	}

	if(typeof name !== type) {
		res.status(400).send({
			error: "Name type should be the same as type property."
		});
		return;
	}

	try {
		const result = await propertiesService.updateProperty(parseInt(id), name, type, description);

		if (!result) {
			res.status(404).json({ error: "Property not found" });
			return;
		}

		res.status(200).send({
			success: true,
		});
	} catch(err: any) {
		console.error(err);
		res.status(500).json({
			error: "Error updating property",
		});
	}
}

export async function deleteProperty(req: Request, res: Response): Promise<void> {
	const id = req.params.pid;

	try {
		const result = await propertiesService.deleteProperty(parseInt(id));
		
		if (!result) {
			res.status(404).json({ error: "Property not found" });
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