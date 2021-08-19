const { PrismaClient } = require('@prisma/client')

export default async function (req, res) {

  const prisma = new PrismaClient()

  const { searchQuery } = req.body

  try {
    const objects = await prisma.settlement.findMany({
      take: 10,
      where: {
        name: {
          startsWith: searchQuery,
          mode: "insensitive"
        }
      }
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
