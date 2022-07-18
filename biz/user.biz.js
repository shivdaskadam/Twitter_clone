const queryRepo = require('../constants/queryRepo');
const EventEmitterBiz = require('./helpers/eventEmitter.biz');
const QueryRepository = require('../repositories/query.repository');

class UserBiz {
	constructor() {
		this.eventEmitter = new EventEmitterBiz();
	}

    fetchHomedata(data) {
		return new Promise(async (resolve, reject) => {
			try {
                const queryTweet = queryRepo.sql.SELECT.TWEET;
                const queryReTweet = queryRepo.sql.SELECT.RETWEET;
                const queryRepository = new QueryRepository();
				const tweetResult = await queryRepository.get_all_data(queryTweet,data);
                console.log(tweetResult);
                const reTweetResult = await queryRepository.get_all_data(queryReTweet,data);
                console.log(reTweetResult);
                const map = new Map();
				if(tweetResult){
                	tweetResult.forEach((val) => map.set(val.created_at, { ...val }));
				}
				if(reTweetResult){
                	reTweetResult.forEach((val) => map.set(val.created_at, { ...val }));
				}
                const result = [...map.values()].sort((x, y) => y.created_at - x.created_at);
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}

	fetchUserInfo(data) {
		return new Promise(async (resolve, reject) => {
			try {
                const queryTweet = queryRepo.sql.SELECT.USERTWEET;
                const queryReTweet = queryRepo.sql.SELECT.USERRETWEET;
                const queryRepository = new QueryRepository();
				const tweetResult = await queryRepository.get_all_data(queryTweet,data);
                console.log(tweetResult);
                const reTweetResult = await queryRepository.get_all_data(queryReTweet,data);
                console.log(reTweetResult);
                const map = new Map();
				if(tweetResult){
                	tweetResult.forEach((val) => map.set(val.created_at, { ...val }));
				}
				if(reTweetResult){
                	reTweetResult.forEach((val) => map.set(val.created_at, { ...val }));
				}
                const result = [...map.values()].sort((x, y) => y.created_at - x.created_at);
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}

}

module.exports = UserBiz;
