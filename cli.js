#!/usr/bin/env node

var ckan = require('./')
var ndjson = require('ndjson')

if(process.argv.length <= 2)
  return console.error('usage: dat-ckan-datastore <url>')

  ckan(process.argv[2])
    .pipe(ndjson.stringify())
    .pipe(process.stdout)