const queryRepo = require('../constants/queryRepo');
const EventEmitterBiz = require('./helpers/eventEmitter.biz');
const QueryRepository = require('../repositories/query.repository');

class RegisterBiz {
	constructor() {
		this.eventEmitter = new EventEmitterBiz();
	}

	create(data) {
		return new Promise(async (resolve, reject) => {
			try {
                const query = queryRepo.sql.INSERT.REGISTER;
                const queryRepository = new QueryRepository();
				const result = await queryRepository.create(query,data);
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}
	update(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = {};
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}

}


module.exports = RegisterBiz;
