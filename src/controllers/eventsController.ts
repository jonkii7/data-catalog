import { Request, Response } from "express";
import Pool from "../database/db";
import { IEvent } from "../types/dbModels.types";

export async function getEvents(_req: Request, res: Response): Promise<void> {
	try {
		const result = await Pool.query(`SELECT * FROM events;`);
		
		res.status(200).send({
			events: result.rows as IEvent[],
		});
		return;
	} catch (err) {
		res.status(500).send({
			error: err,
		});
		return;
	}
}
