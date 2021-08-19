const jwt = require('jsonwebtoken');
const conf = require('../../../config/index.js')
const {send} = require('micro')
import formidable from 'formidable'
const micro = require("micro");

const isAuthorized = fn => async (req, res) => {

  await jwt.verify(req.headers.authorization, conf.default.guid, async (err, decoded) => {
    if(!err && decoded) {
      return await fn(req, res)
    }

    res.status(401).json({message: 'access token is not given'})

  })

}

export default isAuthorized(async function (req, res) {

  if(req.method !== 'POST') {
    res.status(403)
    res.json({message: 'there is only with GET method'})
    return;
  }

  const form = new formidable.IncomingForm({
    uploadDir: './public/uploads'
  });

  form.parse(req, (err, fields, files) => {
    res.status(200)
    res.json({ file: files })
  })

})

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  },
}
