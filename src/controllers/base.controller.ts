import { DataSource } from 'typeorm';

export class BaseController{

	protected database: DataSource;

	constructor(source: DataSource){
		this.database = source
	}

}