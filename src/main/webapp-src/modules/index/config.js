module.exports = {
	clean: ['webapp/modules/index'],
	watchSrc: ['webapp-src/modules/index/**'],
	copy: [
		{
			source: 'webapp-src/modules/index/html/**',
			target: 'webapp/modules/index/html/'
		}
	],
	less: [ 
		{
			source: 'webapp-src/modules/index/less/index.less',
			target: 'webapp/modules/index/css/'
		},
	],
	es6: [],
	ts: [
		{
			source: ['webapp-src/modules/index/ts/main.tsx'],
			target: 'webapp/modules/index/js/',
			name: 'main.js' 
		},
	]
}
