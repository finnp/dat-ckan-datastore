# dat-ckan-datastore
[![NPM](https://nodei.co/npm/dat-ckan-datastore.png)](https://nodei.co/npm/dat-ckan-datastore/)

```js
var ckan = require('dat-ckan-datastore')
var url = 'http://ackan.org/api/action/datastore_search?resource_id=id'
ckan(url).on('data', function (record) {
  // emits a data event for each record/row of your query
})
```

## Usage with `dat`

### Listen hook

```js
var ckan = require('dat-ckan-datastore')

module.exports = function (dat, ready) {
  ready()
  ckan('http://yourckanendpoint.org').pipe(dat.createWriteStream())
}

```

### Command line interface

Example:
```
dat-ckan-datastore "http://data.nhm.ac.uk/api/action/datastore_search?resource_id=05ff2255-c38a-40c9-b657-4ccb55ab2feb&q=fish" | dat import
```