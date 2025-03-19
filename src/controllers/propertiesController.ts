import { Request, Response } from "express";
import Pool from "../database/db";

export async function getProperties(_req: Request, res: Response): Promise<void> {
	try {
		const result = await Pool.query(`SELECT * FROM properties;`);
		
		res.status(200).send({
			properties: result.rows,
		});
		return;
	} catch (err) {
		res.status(500).send({
			error: err,
		});
		return;
	}
}