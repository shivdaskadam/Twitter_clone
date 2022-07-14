const queryRepo = require('../constants/queryRepo');
const EventEmitterBiz = require('./helpers/eventEmitter.biz');
const QueryRepository = require('../repositories/query.repository');

class LoginBiz {
	constructor() {
		this.eventEmitter = new EventEmitterBiz();
	}

	validate(data) {
		return new Promise(async (resolve, reject) => {
			try {
                let loggedIn = true;
                const query = queryRepo.sql.SELECT.LOGIN;
                const queryRepository = new QueryRepository();
				const response = await queryRepository.get_sql_data(query,{...data.body});
                if(response==null){
                    loggedIn = false;
                }
                let result = {response,loggedIn} 
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


module.exports = LoginBiz;
