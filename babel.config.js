module.exports = function(api) {
	api.cache(true)
	return {
		presets: ['module:@react-native/babel-preset'],
		plugins: [
			// react-native-dotenv
			[
				'module:react-native-dotenv',
				{
					"envName": "APP_ENV",
					"moduleName": "@env",
					"path": ".env",
					"safe": false,
					"allowUndefined": true,
				},
			],
			['@babel/plugin-transform-private-methods', { loose: true }],
			['@babel/plugin-transform-class-properties', { loose: true }],
			['@babel/plugin-transform-private-property-in-object', { loose: true }]
		]
	}
}