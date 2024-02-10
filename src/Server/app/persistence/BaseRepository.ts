import { IBaseRepository } from './IBaseRepository';
import { logger } from '../infrastructure/logger';
import { DBContext } from './DBContext';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
	private _model: any;
	private connection: any;
	private dbContext: DBContext;

	constructor(model: any) {
		this.dbContext =  DBContext.getInstance();
		this._model = model;
	}

	async GetById(identifier: number): Promise<T> {
		return this._model
			.findOne({ where: { id: identifier } })
			.then((entity: any) => {
				if (entity) {
					logger.info(`Retrieved entity with Id ${identifier}.`);
					return entity.dataValues;
				} else {
					logger.info(`Retrieved entity with Id ${identifier} does not exist.`);
					return entity;
				}
			});
	}

	async ListAll(): Promise<T[]> {
		return this._model.findAll().then((entities: Array<any>) => {
			logger.info("Retrieved all Entitites.");
			return entities.map((y) => y.dataValues);
		});
	}



	async Delete(identifier: number): Promise<Boolean> {
		return this._model
			.destroy({ where: { id: identifier } })
			.then((afffectedRows: number) => {
				if (afffectedRows > 0) {
					logger.info(`Deleted Model with Id ${identifier}`);
					return true;
				} else {
					logger.info(`Model with Id ${name} does not exist.`);
				}
				return false;
			});
	}


}
