var dgram = require('dgram')
var helper = require('./helper')
var portfinder = require('portfinder')
var test = require('tape')

test('DNS works (feross.org)', function (t) {
  portfinder.getPort(function (err, port) {
    t.error(err, 'Found free ports')
    var socket = dgram.createSocket('udp4')
    var child

    socket.on('listening', function () {
      var env = { PORT: port }
      helper.browserify('dns.js', env, function (err) {
        t.error(err, 'Clean browserify build')
        child = helper.launchBrowser()
      })
    })

    socket.on('message', function (message, remote) {
      t.equal(message.toString(), 'success')
      child.kill()
      socket.close()
      t.end()
    })

    socket.bind(port)
  })
})
