const queryRepo = require('../constants/queryRepo');
const EventEmitterBiz = require('./helpers/eventEmitter.biz');
const QueryRepository = require('../repositories/query.repository');
const moment = require('moment');
const crypto = require('crypto')

class RegisterBiz {
	constructor() {
		this.eventEmitter = new EventEmitterBiz();
	}

	create(data) {
		return new Promise(async (resolve, reject) => {
			try {
                const query = queryRepo.sql.INSERT.REGISTER;
				let cur_date = moment().format('YYYY-MM-DD HH:mm:ss')
				console.log(cur_date);
				let password = await this.encryptPassword(data.password,cur_date.toString());
				data.password = password;
				data.cur_date = cur_date;
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

	encryptPassword(password,cur_date) {
		return new Promise(async (resolve, reject) => {
			try {
				let hash = crypto.pbkdf2Sync(password,cur_date,  
				50, 15, `sha256`).toString(`hex`); 
				resolve(hash);
			} catch(error){
				return reject(error);
			}
		});
	}
}


module.exports = RegisterBiz;
