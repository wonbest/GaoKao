module.exports = {
	clean: ['webapp/modules/public'],
	watchSrc: ['webapp-src/modules/public/**'],
	copy: [
		{
			source: 'webapp-src/modules/public/html/**',
			target: 'webapp/modules/public/html/'
		}
	],
	less: [ 
		// {
		// 	source: 'webapp-src/modules/public/less/index.less',
		// 	target: 'webapp/modules/public/css/'
		// },
	],
	es6: [],
	ts: [
		{
			source: ['webapp-src/modules/public/ts/page-header.tsx'],
			target: 'webapp/modules/public/js/',
			name: 'page-header.js' 
		},
	]
}
