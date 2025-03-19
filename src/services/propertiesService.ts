import Pool from "../database/db";
import { IProperty } from "../types/dbModels.types";

export async function getProperties(): Promise<IProperty[]> {
	try {
		const result = await Pool.query(`SELECT * FROM properties;`);
		
		return result.rows as IProperty[];
	} catch(error: any) {
		throw new Error(error.message);
	}
}

export async function getPropertyById(id: number): Promise<IProperty> {
	try {
		const result = await Pool.query(`SELECT * FROM properties WHERE id = $1;`, [id]);
		
		return result.rows[0] as IProperty;
	} catch(error: any) {
		throw new Error(error.message);
	}
}

export async function postProperty(name: string, type: string, description: string): Promise<IProperty> {
	try {
		const result = await Pool.query(
			`INSERT INTO properties (name, type, description)
			 VALUES ($1, $2, $3);`,
			[name, type, description]
		  );
		return result.rows[0] as IProperty;
	} catch(error: any) {
		throw new Error(error.message);
	}
}

export async function updateProperty(id:number, name: string, type: string, description: string): Promise<number | null> {
	const date = new Date();
	try {
		const result = await Pool.query(
			`UPDATE properties 
			 SET name = $1, type = $2, description = $3, update_time = $4
			 WHERE id = $5;`,
			[name, type, description, date, id]
		  );
		return result.rowCount;
	} catch(error: any) {
		throw new Error(error.message);
	}
}

export async function deleteProperty(id: number): Promise<boolean> {
	try {
		await Pool.query(`DELETE FROM properties WHERE id = $1`, [id]);
		return true;
	} catch(error: any) {
		throw new Error(error.message);
	}
}