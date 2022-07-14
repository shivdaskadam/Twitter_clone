const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { tweetSchema } = require('../schema/schema-suit');
const TweetBiz = require('../biz/tweet.biz');

class TweetController {
	register(app) {
		app.route('/:userId/tweet')
		.post(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;
				const validator = new RequestValidator(tweetSchema);
				validator.create({...request.params,...request.body});

				const tweetBiz = new TweetBiz();
				const _result = await tweetBiz.create({...request.params,...request.body});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,client_code});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `created tweet sucessfully`, {
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
        app.route('/:userId/tweet/:tweetId')
        .put(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;
				// const validator = new RequestValidator(tweetSchema);
				// validator.create({...request.params,...request.body});

				const tweetBiz = new TweetBiz();
				const _result = await tweetBiz.update({...request.params,...request.body});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,client_code});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `deleted tweet sucessfully`, {
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

module.exports = TweetController;
