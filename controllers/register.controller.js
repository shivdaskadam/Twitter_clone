const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { userSchema } = require('../schema/schema-suit');
const RegisterBiz = require('../biz/register.biz');

class RegisterController {
	register(app) {
		app.route('/register')
		.post(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;
				const validator = new RequestValidator(userSchema);
				validator.create({...request.params,...request.body});
				console.log("cc",client_code);
				const registerBiz = new RegisterBiz();
				const _result = await registerBiz.create({...request.params,...request.body});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,client_code});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `registered user sucessfully`, {
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

module.exports = RegisterController;
