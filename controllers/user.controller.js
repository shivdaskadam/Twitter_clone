const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { tweetSchema } = require('../schema/schema-suit');
const UserBiz = require('../biz/user.biz');

class UserController {
	register(app) {
		app.route('/:userId/home')
		.get(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;

				const userBiz = new UserBiz();
				console.log(request.params)
				const _result = await userBiz.fetchHomedata({...request.params,...request.query});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.query});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `fetched result successfully.`, {
					services: [
						// CONSTANTS.LOGGING,
						// CONSTANTS.EVENT_EMIT
					],
					data: { 
							action : CONSTANTS.ACTION.SOME_FETCHED,
							request: {...request.params,...request.query,client_code},
							response: result
				}
				});
			} catch (error) {
				next(error);
			}
		})
		
		app.route('/:id/info/:searchUserId')
		.get(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;

				// const validator = new RequestValidator(someSchema);
				// validator.create({...request.params,...request.query});

				const userBiz = new UserBiz();
				const _result = await userBiz.fetchUserInfo({...request.params,...request.query});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.query});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `fetched result successfully.`, {
					services: [
						// CONSTANTS.LOGGING,
						// CONSTANTS.EVENT_EMIT
					],
					data: { 
							action : CONSTANTS.ACTION.SOME_FETCHED,
							request: {...request.params,...request.query,client_code},
							response: result
				}
				});
			} catch (error) {
				next(error);
			}
		})
	}
}

module.exports = UserController;
