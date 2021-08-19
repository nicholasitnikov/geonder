const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const config = require('../../../config/index.js')

export default async function (req, res) {

  if(req.method !== 'POST') {
    res.status(403)
    res.json({message: 'there is only with POST method'})
    return;
  }

  const prisma = new PrismaClient()

  const users = await prisma.user.findMany({
    where: { username: req.body.username }
  }).then((data) => {

    let user = data[0]

    bcrypt.compare(req.body.password, user.password,  (err, result) => {
      if(!err && result) {
        let token = jwt.sign({ username: req.body.username, id: req.body.id }, config.default.guid )
        res.status(200)
        res.json({accessToken: token})
      } else {
        res.status(401)
        res.json({message: 'Ups...user is not found'})
      }
    })

  }).catch((err) => {
    console.log(err)
    res.json({message: 'there is some error'})
    res.status(500)
  })

  await prisma.$disconnect()

}
