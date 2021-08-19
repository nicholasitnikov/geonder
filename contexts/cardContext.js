import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useAdmin } from './adminContext.js'

const CardContext = React.createContext()


export const useCard = () => {
  return useContext(CardContext)
}


export const CardProvider = ({ children }) => {

  const [card, setCard] = useState([])
  const [editorMode, setEditorMode] = useState(false)
  const { user } = useAdmin()

  const fetchCardBy = async (layer) => {
    let url = '/api/cards/search'
    await axios.post(url, { id: layer.id }).then((res) => {

      if(res.data.objects instanceof Array) {
        setCard({...res.data.objects[0],
          fields: res.data.fields
         })
      } else {
        setCard(null)
      }

    }).catch((e) => console.log(e))


  }

  const createOrUpdateCard = async (data) => {
    let method = data.id ? 'update' : 'create'
    let url = '/api/cards/' + method
    await axios.post(url, data, {
      headers: {
        'authorization': user.accessToken
      }
    }).then((res) => {

      if(typeof res.data.objects === 'object') {
        setCard(res.data.objects)
      } else {
        setCard(null)
      }

    }).catch((e) => console.log(e))
  }

  const cleanCard = () => {
    // setCard(undefined)
  }

  return (
    <CardContext.Provider value={{
      card,
      fetchCardBy,
      createOrUpdateCard,
      cleanCard,
      editorMode,
      setEditorMode
    }}>
      {children}
    </CardContext.Provider>
  )

}
