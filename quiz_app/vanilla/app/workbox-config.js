module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{png,json,ico,html,md,txt,js,css}'
	],
	swDest: 'build/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};