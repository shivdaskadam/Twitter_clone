const queryRepo = require('../constants/queryRepo');
const EventEmitterBiz = require('./helpers/eventEmitter.biz');
const QueryRepository = require('../repositories/query.repository');
const RegisterBiz = require('./register.biz');
const moment = require('moment');
class LoginBiz {
	constructor() {
		this.eventEmitter = new EventEmitterBiz();
	}

	validate(data) {
		return new Promise(async (resolve, reject) => {
			try {
                let loggedIn = true;
                const query = queryRepo.sql.SELECT.LOGIN;
				const queryTime = queryRepo.sql.SELECT.TIME;
                const queryRepository = new QueryRepository();
				let cur_date = await queryRepository.get_sql_data(queryTime,data);
				cur_date = moment(cur_date.created_at).format('YYYY-MM-DD HH:mm:ss');
				data.password = await new RegisterBiz().encryptPassword(data.password, cur_date.toString());
				console.log(data.password)
				const response = await queryRepository.get_sql_data(query,data);
				console.log(response)
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
				const queryUser = queryRepo.sql.UPDATE.USER;
                const queryTweet = queryRepo.sql.UPDATE.TWEETUSER;
                const queryRetweet = queryRepo.sql.UPDATE.RETWEETUSER;
                const queryFollow = queryRepo.sql.UPDATE.FOLLOWUSER;
                const queryRepository = new QueryRepository();
				const resultUser = await queryRepository.create(queryUser,data);
                const resultTweet = await queryRepository.create(queryTweet,data);
                const resultReTweet = await queryRepository.create(queryRetweet,data);
                const resultFollow = await queryRepository.create(queryFollow,data);
                const result = {resultUser,resultTweet,resultReTweet,resultFollow}
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}

}


module.exports = LoginBiz;
