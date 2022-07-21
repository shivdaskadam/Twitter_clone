//your app constants come here
const config = require('config');
module.exports = {
	CLIENT_CODES : config.get('app_config.client_code'),
	APPLICATION_JSON: 'application/json',
	JSON : 'json',
	TEXT_XML : 'text/xml',
	FORM_DATA: 'multipart/form-data',
	X_WWW_FORM_URLENCODED : 'application/x-www-form-urlencoded',
	LOGGING: 'LOGGING',
	EVENT_EMIT: 'EVENT_EMIT',
	DOC_DIRECTORY: 'storage/tmp',
	DOC_ZIP_DIRECTORY: 'storage/tmp/zip',
	DOCUMENT_TYPE : '',
	DOCUMENT_CATEGORY : '',
	DOCUMENT_SOURCE : 'LOS',
	REQUEST_ID_PREFIX : 'SERVICENAME',
	ENTITY_TYPE : ['T','RP','RC'],
	DOCUMENT_SECTION : '',
	CURRENT_TIMESTAMP : 'CURRENT_TIMESTAMP',
	SHEET_NAME : 'SHEET_NAME',
	DEFAULT_DATE_FORMAT : 'YYYY-MM-DD HH:mm:ss',
	CSV : 'CSV',
	EXCEL : 'XLSL',
	CSV_EXTENSION : '.csv',
	EXCEL_EXTENSION : '.xlsx',
	EMIT_QUICKWORKS_EVENTS : [],
	EMIT_EVENTBRIDGE_EVENTS : [],
	HEADER_VALIDATOR_EXCEPTOR : ['CHECK_APPLICATION_HEALTH','API_DOCUMENTATION','REGISTER'],
	ACTION: {
		CHECK_APPLICATION_HEALTH : 'CHECK_APPLICATION_HEALTH',
		SOME_CREATED : 'SOME_CREATED',
		SOME_UPDATED: 'SOME_UPDATED',
		SOME_FETCHED : 'SOME_UPDATED'

	},
	SEARCH_LIST : ["loan_code", "loanCode", "code"],
	EVENT : {
		'/' : {
			GET : 'API_DOCUMENTATION'
		},
		'/init' : {
			GET : 'CHECK_APPLICATION_HEALTH'
		},
		'/v1/some' : {
			POST : 'SOME_CREATED',
			PUT : 'SOME_UPDATED',
			GET : 'SOME_UPDATED'
		},
		'/register' : {
			POST : 'REGISTER'
		}
	}
};