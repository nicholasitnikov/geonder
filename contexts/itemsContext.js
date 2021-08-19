import axios from 'axios'
import React, { useState, useContext } from 'react'
import Layer from 'classes/layer.js'

const ItemsContext = React.createContext()



export const useItems = () => {
  return useContext(ItemsContext)
}


export const ItemsProvider = ({ children }) => {

  const [items, setItems] = useState([])

  const fetchItemsBy = async (features) => {

    let promises = []

    features.map((f) => {
      let currentLayer = Layer.defaultTypes.filter((type) => {
        return f.properties.id.indexOf(type.dbPrefix) == 0
      })[0]
      if(!currentLayer) return;
      promises.push(new Promise(async (resolve, reject) => {
        let url = '/api/' + currentLayer.slug + '/fetch'
        await axios.post(url, { id: f.properties.id }).then((res) => {

          let r = res.data.objects ? res.data.objects : []

          resolve(r)

        }).catch((e) => console.log(e))
      }))
    })

    return Promise.all(promises)

  }

  const fetchItems = async (selectedLayer) => {
    let url = '/api/' + selectedLayer.slug + (selectedLayer.isDefault ? '' : '/children')
    await axios.post(url, { id: selectedLayer.id }).then((res) => {

      let r = res.data.objects ? res.data.objects : []

      setItems(r)

    }).catch((e) => console.log(e))


  }

  return (
    <ItemsContext.Provider value={{
      fetchItems,
      fetchItemsBy,
      items
    }}>
      {children}
    </ItemsContext.Provider>
  )

}

export const getServerSideProps = async () => {

  return {
    props: {
      admin: 'hello there'
    }
  }

}
