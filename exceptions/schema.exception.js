const BaseException = require('./base.exception');

class SchemaException extends BaseException {
	constructor(errors) {        
		super('Bad Schema', 'SCHEMA_ERROR', 400);
		if (errors.message) this.message = errors.message;
		this.fields = errors.map(error => ({
			description: error.stack,
		}));
	}
}

module.exports = SchemaException;
