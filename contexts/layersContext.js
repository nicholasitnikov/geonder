import React, { useContext, useEffect, useState } from 'react'
import Layer from 'classes/layer.js'
import { useCard } from './cardContext.js'

const LayersContext = React.createContext()


export const useLayers = () => {
  return useContext(LayersContext)
}


export const LayersProvider = ({ children }) => {

  const { fetchCardBy, cleanCard } = useCard()

  const [layers, setLayers] = useState(Layer.defaultTypes)

  const selectLayer = (e) => {

    let l = [...layers].map((item) => {
      item.selected = item.name === e
      return item
    })

    setLayers(l)

  }

  const getSelectedLayer = () => {
    return layers.filter((l) => l.selected)[0]
  }

  const pushLayer = (l) => {
    if(layers.filter((i) => l.name == i.name).length > 0) {
      return
    }

    let prev = [...layers].concat(l)

    prev.map((item) => {
      item.selected = item.name === l.name
      return item
    })
    cleanCard()
    fetchCardBy(l)
    setLayers(prev)
  }

  const switchLayer = (items) => {
    let prev = [...layers]
    prev = prev.filter((f) => f.isDefault)
    let switchedLayers = []
    items.map((i) => {
      switchedLayers.push(new Layer(i, true))
    })
    switchedLayers[0].selected = true
    fetchCardBy(switchedLayers[0])
    setLayers(prev.concat(switchedLayers.reverse()))
  }

  const layersReset = (l) => {
    let r = Layer.defaultTypes
    r.map((i) => {
      i.selected = i.name === l.name
      return i
    })
    fetchCardBy(l)
    setLayers(r)
  }

  const layersCut = (l) => {

    let prev = [...layers]
    prev.splice(prev.indexOf(l) + 1, prev.length)
    prev[prev.length - 1].selected = true
    fetchCardBy(l)
    setLayers(prev)

  }

  return (
    <LayersContext.Provider value={{
      layers,
      selectLayer,
      layersCut,
      getSelectedLayer,
      pushLayer,
      layersReset,
      switchLayer
    }}>
      {children}
    </LayersContext.Provider>
  )

}
