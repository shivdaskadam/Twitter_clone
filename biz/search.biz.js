const queryRepo = require('../constants/queryRepo');
const EventEmitterBiz = require('./helpers/eventEmitter.biz');
const QueryRepository = require('../repositories/query.repository');

class SearchBiz {
	constructor() {
		this.eventEmitter = new EventEmitterBiz();
	}

    fetch(data) {
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


module.exports = SearchBiz;
