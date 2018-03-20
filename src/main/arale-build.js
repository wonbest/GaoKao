#!/usr/bin/env node
var gulp = require('gulp');
var arale = require('./build/arale')
var args = process.argv.slice(2)

var action = args[0], module = args[1]
if (action === 'release') {
	arale.release(module)
} else if (action === 'build') {
	arale.build(module)
}else if (action === 'clean') {
	arale.clean(module)
}  else if (action === 'autoBuild') {
	if (module) {
		arale.autoBuild(module)
	}else{
		console.log('请输入模块名称')
	}
} else {
	console.log('---------------------')
	console.log('clean <module>')
	console.log('build <module>')
	console.log('release <module>')
	console.log('autoBuild {module}')
	console.log('---------------------')
}