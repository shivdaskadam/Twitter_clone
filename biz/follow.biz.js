const queryRepo = require('../constants/queryRepo');
const EventEmitterBiz = require('./helpers/eventEmitter.biz');
const QueryRepository = require('../repositories/query.repository');

class FollowBiz {
	constructor() {
		this.eventEmitter = new EventEmitterBiz();
	}

	create(data) {
		return new Promise(async (resolve, reject) => {
			try {
                const query = queryRepo.sql.INSERT.FOLLOW;
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
				const query = queryRepo.sql.UPDATE.FOLLOW;
                const queryRepository = new QueryRepository();
				const result = await queryRepository.create(query,data);
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}

	getFollowers(data) {
		return new Promise(async (resolve, reject) => {
			try {
                const query = queryRepo.sql.SELECT.FOLLOWERS;
                const queryRepository = new QueryRepository();
				const result = await queryRepository.create(query,data);
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}

	getFollowing(data) {
		return new Promise(async (resolve, reject) => {
			try {
                const query = queryRepo.sql.SELECT.FOLLOWING;
                const queryRepository = new QueryRepository();
				const result = await queryRepository.create(query,data);
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}

}


module.exports = FollowBiz;
