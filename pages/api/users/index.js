const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken');
const config = require('../../../config/index.js')
const {send} = require('micro')

const isAuthorized = fn => async (req, res) => {

  // req.headers.authorization

  await jwt.verify(req.headers.authorization, config.default.guid, async (err, decoded) => {
    if(!err && decoded) {
      return await fn(req, res)
    }

    res.status(401).json({message: 'access token is not given'})

  })



}

export default isAuthorized (async function (req, res) {

  if(req.method !== 'GET') {
    res.status(403)
    res.json({message: 'there is only with GET method'})
    return;
  }

  const prisma = new PrismaClient()

  const users = await prisma.user.findMany().then((data) => {

    res.json(data)
    res.status(200)

  }).catch((err) => {
    console.log(err)
    res.json({message: 'there is some error'})
    res.status(500)
  })

  await prisma.$disconnect()

})
