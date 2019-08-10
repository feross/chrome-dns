const dns = require('../../')
const dgram = require('chrome-dgram')

var PORT = Number(process.env.PORT)

dns.lookup('feross.org', (err, address, family) => {
  if (err) return send(`Error: ${err.message}`)

  if (address !== '50.116.11.184') {
    return send(`Error: Address ${address} does not match`)
  }

  if (family !== 4) {
    return send(`Error: IP family ${family} does not match`)
  }

  send('success')
})

function send (message) {
  const sock = dgram.createSocket('udp4')
  sock.send(message, 0, message.length, PORT, '127.0.0.1')
}
