const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { tweetSchema } = require('../schema/schema-suit');
const SearchBiz = require('../biz/search.biz');

class SearchController {
	register(app) {
		app.route('/:userId/search')
		.get(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;

				// const validator = new RequestValidator(someSchema);
				// validator.create({...request.params,...request.query});

				const searchBiz = new SearchBiz();
				const _result = await searchBiz.fetch({...request.params,...request.query});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.query});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `fetched search successfully.`, {
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

module.exports = SearchController;
