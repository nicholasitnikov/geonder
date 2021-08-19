const { PrismaClient } = require('@prisma/client')

export default async function (req, res) {

  const prisma = new PrismaClient()

  const { id } = req.body

  try {
    const objects = await prisma.province.findUnique({
      where: {
        uniqueId: id
      }
    }).settlements({
          orderBy: [
          {
            name: 'asc',
          }
      ]
    })
    res.status(200)
    res.json({objects})
  } catch (e) {
    console.error(e)
    res.status(500)
    res.send(e)
  } finally {
    await prisma.$disconnect()
  }

}
