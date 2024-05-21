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
                const searchTweet = queryRepo.sql.SELECT.SEARCHTWEET;
                const searchResult = queryRepo.sql.SELECT.SEARCHUSER;
                const queryRepository = new QueryRepository();
				const tweetResponse = await queryRepository.get_all_data(searchTweet,data);
                console.log(tweetResponse);
                const userResponse = await queryRepository.get_all_data(searchResult,data);
                console.log(userResponse);
                const tweetMap = new Map();
				if(tweetResponse){
                	tweetResponse.forEach((val) => tweetMap.set(val.created_at, { ...val }));
				}
				const tweetResult = [...tweetMap.values()].sort((x, y) => y.created_at - x.created_at);
				const userMap = new Map();
				if(userResponse){
                	userResponse.forEach((val) => userMap.set(val.created_at, { ...val }));
				}
				const userResult = [...userMap.values()].sort((x, y) => y.created_at - x.created_at);
				const result = {user:userResult, tweet:tweetResult};
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}

}


module.exports = SearchBiz;
