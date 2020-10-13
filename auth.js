const speakeasy = require('speakeasy')
const qrcode = require('qrcode')

function generateQrCode (req, res) {
  const secret = speakeasy.generateSecret({
    name: 'IAmBot'
  })
  console.log(secret);
  qrcode.toDataURL(secret.otpauth_url, (error, data) => {
    return res.json(data)
  })
}

// Request Body
// {
//   "secret": <secret>,
//   "token": <token>
// }
function verifyToken (req, res) {
  const valid = speakeasy.totp.verify({
    secret: req.body.secret,
    encoding: 'ascii',
    token: req.body.token
  })
  if (!valid) return res.json({ message: 'Token is not valid!' })
  return res.json({ message: 'Token Valid' })
}

module.exports = {
  generateQrCode,
  verifyToken
}