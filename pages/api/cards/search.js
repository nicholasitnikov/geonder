const { PrismaClient } = require('@prisma/client')

export default async function (req, res) {

  const prisma = new PrismaClient()

  try {
    const objects = await prisma.card.findMany({
      where: {
        parent_id: req.body.id
      }
    })

    if(objects.length > 0) {

      let fields = await prisma.card.findUnique({
        where: {
          id: objects[0].id
        }
      }).fields()

      fields = fields.map((i) => {

        if(i.key === 'area') {
          i.value += ' км²'
        }

        if(i.key === 'population') {
          i.value = i.value.slice(0, i.value.length - 3) + ' тыс. чел.'
        }

        return i;

      })

      res.status(200)
      res.json({objects, fields})
    } else {
      res.status(200)
      res.json({message: 'Card not found'})
    }

  } catch (e) {
    console.error(e)
    res.status(500)
    res.send(e)
  } finally {
    await prisma.$disconnect()
  }

}
