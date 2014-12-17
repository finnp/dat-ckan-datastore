var request = require('request')
var Readable = require('stream').Readable
var inherits = require('inherits')
var url = require('url')
module.exports = Ckan

inherits(Ckan, Readable)
function Ckan(ckanUrl) {
  if(!(this instanceof Ckan)) return new Ckan(ckanUrl)
  Readable.call(this, {objectMode: true})
  var parsedUrl = url.parse(ckanUrl)
  this.base = url.format({
    protocol: parsedUrl.protocol,
    auth: parsedUrl.auth,
    host: parsedUrl.host
  })
  this.current = parsedUrl.path
  this.providing = false
}

Ckan.prototype._read = function () {
  if(this.providing) return
  this.providing = true
  var requestPage = function(current) {
    var stopPushing = false
    var nextPage
    request(this.base + current, {json: true}, function (err, req, json) {
      if(err) return this.emit(err)
      if(json && json.result && json.result.records) {
        json.result.records.forEach(function (record) {
          if(!this.push(record)) this.providing = false
        }.bind(this))
        if(json.result.records.length === 0) return this.push(null)
      } else {
        return this.push(null)
      }
      this.current = json.result._links.next
      if(this.providing) {
        requestPage(this.current)
      }
    }.bind(this))
  }.bind(this)

  requestPage(this.current)
}
