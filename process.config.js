const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PROD = NODE_ENV === 'production';

module.exports = {
	apps: [{
		name: 'chat',
		script: 'src/server/bin/www',
		exec_mode: 'cluster',
		instances: IS_PROD ? 'max' : 1,
		env: {
			NODE_ENV
		},
		watch: IS_PROD ? false : 'src/server',
		log_date_format: 'YYYY-MM-DD HH:mm Z'
	}]
};
