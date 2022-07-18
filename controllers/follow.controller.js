const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { followSchema } = require('../schema/schema-suit');
const FollowBiz = require('../biz/follow.biz');

class FollowController {
	register(app) {
		app.route('/:userId/follow/:followingId')
		.post(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;
                //console.log(typeof(request.params.userId));
				const validator = new RequestValidator(followSchema);
				validator.create({...request.params,...request.body});
                
				const followBiz = new FollowBiz();
				const _result = await followBiz.create({...request.params,...request.body});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,client_code});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `followed sucessfully`, {
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

		app.route('/:userId/followers')
		.get(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;
                
				const followBiz = new FollowBiz();
				const _result = await followBiz.getFollowers({...request.params,...request.query});
				const responseDecorator = new ResponseDecorator({...request.params,...request.query,client_code});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `fetched followers list sucessfully`, {
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

		app.route('/:userId/following')
		.get(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;
                
				const followBiz = new FollowBiz();
				const _result = await followBiz.getFollowing({...request.params,...request.query});
				const responseDecorator = new ResponseDecorator({...request.params,...request.query,client_code});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `fetched following list sucessfully`, {
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

		app.route('/:userId/unfollow/:followingId')
        .put(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;

				const followBiz = new FollowBiz();
				const _result = await followBiz.update({...request.params,...request.body});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,client_code});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `Unfollowed user sucessfully`, {
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

module.exports = FollowController;
