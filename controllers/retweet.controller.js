const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { reTweetSchema } = require('../schema/schema-suit');
const ReTweetBiz = require('../biz/retweet.biz');

class ReTweetController {
	register(app) {
		app.route('/:userId/tweet/:tweetId/retweet')
		.post(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;
                //console.log(typeof(request.params.userId));
				const validator = new RequestValidator(reTweetSchema);
				validator.create({...request.params,...request.body});
                
				const reTweetBiz = new ReTweetBiz();
				const _result = await reTweetBiz.create({...request.params,...request.body});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,client_code});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `ReTweeted sucessfully`, {
					services: [
						// CONSTANTS.LOGGING,
						// CONSTANTS.EVENT_EMIT
					],
					data: { 
							action : CONSTANTS.ACTION.SOME_CREATED,
							headers : { ...request.headers},
		 					request: {...request.params,...request.body},
							response: result
				}
				});
			} catch (error) {
				next(error);
			}
		}) 

        app.route('/:userId/tweet/:tweetId/undoRetweet')
        .post(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;

				const reTweetBiz = new ReTweetBiz();
				const _result = await reTweetBiz.update({...request.params,...request.body});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,client_code});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `deleted Retweet sucessfully`, {
					services: [
						// CONSTANTS.LOGGING,
						// CONSTANTS.EVENT_EMIT
					],
					data: { 
							action : CONSTANTS.ACTION.SOME_CREATED,
							headers : { ...request.headers},
							request: {...request.params,...request.body},
							response: result
				}
				});
			} catch (error) {
				next(error);
			}
		})
		
	}
}

module.exports = ReTweetController;
