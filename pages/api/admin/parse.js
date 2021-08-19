const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken');
const conf = require('../../../config/index.js')
const {send} = require('micro')
const geojsonStream = require('geojson-stream');
const micro = require("micro");
const fs = require("fs")
const turf = require('@turf/turf')

const prisma = new PrismaClient()

const isAuthorized = fn => async (req, res) => {

  await jwt.verify(req.headers.authorization, conf.default.guid, async (err, decoded) => {
    if(!err && decoded) {
      return await fn(req, res)
    }

    res.status(401).json({message: 'access token is not given'})

  })

}

const uploadExists = async () => {

  let p1 = new Promise(async (resolve, reject) => {

    let states = await prisma.state.findMany()
    resolve(states)

  })

  let p2 = new Promise(async (resolve, reject) => {

    let provinces = await prisma.province.findMany()
    resolve(provinces)

  })

  let p3 = new Promise(async (resolve, reject) => {

    let settlements = await prisma.settlement.findMany()
    resolve(settlements)

  })

  return Promise.all([p1,p2,p3], (values) => {
    return values
  })

}

const cleanUp = async (target, exists) => {

  let [ states, provinces, settlements ] = exists

  if(!states.join('').trim()) {
    return;
  }

  let state = states.filter((s) => s.name === target[0].properties.St_ru)[0]
  let filteredProvinces = provinces.filter((p) => p.stateId === state.uniqueId)
  let provincesIDs = filteredProvinces.map((p) => p.uniqueId)
  let filteredSettlements = settlements.filter((s) => provincesIDs.indexOf(s.provinceId) > -1)
  let settlementsIDs = filteredSettlements.map((s) => s.uniqueId)

  await prisma.settlement.deleteMany({
    where: {
      uniqueId: { in: settlementsIDs }
    }
  })

  await prisma.province.deleteMany({
    where: {
      uniqueId: { in: provincesIDs }
    }
  })

  await prisma.state.deleteMany({
    where: {
      uniqueId: state.uniqueId
    }
  })

  return 'everything is okey'

}

const parseFiles = async (files) => {

  let promises = []

  files.map((f) => {
    promises.push(new Promise((resolve, reject) => {
      let features = []
      let stream = fs.createReadStream(f.path)
        .pipe(geojsonStream.parse((feature, index) => {
          features.push(feature)
          return feature;
        }))
        .pipe(geojsonStream.stringify())

      stream.on('end', () => {
        resolve(features)
      })
    }))
  })

  return Promise.all(promises)

}

const uploadParsed = async (states, provinces, settlements) => {

  let promises = []

  promises.push(new Promise(async (resolve, reject) => {
    await prisma.state.create({
      data: {
        name: states[0].properties.St_ru,
        name_eng: states[0].properties.St_eng,
        uniqueId: states[0].properties.id,
        max_x: parseFloat(states[0].properties.max_x),
        max_y: parseFloat(states[0].properties.max_y),
        min_x: parseFloat(states[0].properties.min_x),
        min_y: parseFloat(states[0].properties.min_y),
      }
    })
    resolve()
  }))

  provinces.map((p) => {

    promises.push(new Promise(async (resolve, reject) => {

      await prisma.province.create({
        data: {
          name: p.properties.Prov_ru,
          name_eng: p.properties.Prov_eng,
          uniqueId: p.properties.id,
          type: p.properties.Type_ru,
          max_x: parseFloat(p.properties.max_x),
          max_y: parseFloat(p.properties.max_y),
          min_x: parseFloat(p.properties.min_x),
          min_y: parseFloat(p.properties.min_y),
          state: {
            connect: { uniqueId: states[0].properties.id }
          }
        }
      }).catch(() => {})
      resolve()

    }))

  })

  settlements.map((s) => {
    let currentProvince = getProvinceId(s, provinces)
    if(currentProvince) {
      promises.push(new Promise(async (resolve, reject) => {
        await prisma.settlement.create({
          data: {
            name: s.properties.Sity,
            uniqueId: s.properties.Sity,
            status: s.properties.Adm,
            population: s.properties.P,
            population_range: s.properties.P_range,
            province: {
              connect: { uniqueId: currentProvince.properties.id }
            }
          }
        })
        resolve()
      }))
    }
  })

  return Promise.all(promises)


}

const getProvinceId = (settlement, provinces) => {

  return provinces.filter((p) => turf.booleanPointInPolygon(settlement.geometry.coordinates, p))[0]

}

export default isAuthorized(async function (req, res) {

  if(req.method !== 'POST') {
    res.status(403)
    res.json({message: 'there is only with GET method'})
    return;
  }

  let target = req.body.state

  // 1. Upload all hierarchy of states
  // 2. Clean up all states data of req.body.states
  // 3. Upload new data and response

  let exists = await uploadExists()
  let [parsedStates, parsedProvinces, parsedSettlements] = await parseFiles(target.files)
  await cleanUp(parsedStates, exists).catch((e) => res.status(500).json({message: e}))
  await uploadParsed(parsedStates, parsedProvinces, parsedSettlements)

  res.status(200).json({
    result: 'okey'
  })

})

export const config = {
  api: {
    externalResolver: true
  },
}
