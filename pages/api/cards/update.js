const jwt = require('jsonwebtoken');
const conf = require('../../../config/index.js')
const {send} = require('micro')
import formidable from 'formidable'
const micro = require("micro");
const { PrismaClient } = require('@prisma/client')

const isAuthorized = fn => async (req, res) => {

  await jwt.verify(req.headers.authorization, conf.default.guid, async (err, decoded) => {
    if(!err && decoded) {
      return await fn(req, res)
    }

    res.status(401).json({message: 'access token is not given'})

  })

}

export default isAuthorized(async function (req, res) {

  const prisma = new PrismaClient()

  if(req.method !== 'POST') {
    res.status(403)
    res.json({message: 'there is only with GET method'})
    return;
  }

  let data = {
    title: req.body.title,
    description: req.body.description,
    parent_id: req.body.parent_id
  }

  if(req.body.thumbnail) {
    let path = req.body.thumbnail.file.response.file.logo.path
    data.thumbnail = path.slice(8, path.length)
  }

  let objects = await prisma.card.update({
    data,
    where: {
      id: req.body.id
    }
  })

  res.status(200)
  res.json({objects})


})
