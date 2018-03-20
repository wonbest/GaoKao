module.exports = {
	clean: ['webapp/modules/login'],
	watchSrc: ['webapp-src/modules/login/**'],
	copy: [
		{
			source: 'webapp-src/modules/login/html/**',
			target: 'webapp/modules/login/html/'
		}
	],
	less: [ 
		{
			source: 'webapp-src/modules/login/less/index.less',
			target: 'webapp/modules/login/css/'
		},
	],
	es6: [],
	ts: [
		{
			source: ['webapp-src/modules/login/ts/main.tsx'],
			target: 'webapp/modules/login/js/',
			name: 'main.js' 
		},
	]
}
