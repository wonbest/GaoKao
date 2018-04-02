module.exports = {
	clean: ['webapp/modules/search-school'],
	watchSrc: ['webapp-src/modules/search-school/**'],
	copy: [
		{
			source: 'webapp-src/modules/search-school/html/**',
			target: 'webapp/modules/search-school/html/'
		}
	],
	less: [ 
		{
			source: 'webapp-src/modules/search-school/less/index.less',
			target: 'webapp/modules/search-school/css/'
		},
	],
	es6: [],
	ts: [
		// {
		// 	source: ['webapp-src/modules/search-school/ts/main.tsx'],
		// 	target: 'webapp/modules/search-school/js/',
		// 	name: 'main.js' 
		// },
	]
}
