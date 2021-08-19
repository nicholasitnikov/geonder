import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import config from 'config/'
import { message } from 'antd'


const AdminContext = React.createContext()

export const useAdmin = () => {
  return useContext(AdminContext)
}


export const AdminProvider = ({ children, initialUser }) => {

  const [user, setUser] = useState(initialUser)
  const [files, setFiles] = useState([])

  const deleteFile = (file) => {
    setFiles((prev) => {
      return prev.filter((i) => i !== file)
    })
  }

  const parseGeojson = (state) => {

    changeStatus(state, 'processing')

    axios.post('/api/admin/parse', {state}, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': user.accessToken
      }
    }).then((res, err) => {
      if(err && !res) {
        console.log(error); return;
      }

      console.log(res.data)
      changeStatus(state, 'parsed')
      deleteFile(states)

    })

  }

  const changeStatus = (item, status) => {

    setFiles(files.map((i) => {
      if(i === item) {
        i.status = status
      }
      return i
    }))

  }

  const pushFiles = (pushedFiles) => {

    let settlementsFile = pushedFiles.filter((i) => i.name === 'НП.geojson')[0]
    let settlementsPrefix = config.prefixes.filter((i) => i.name === 'НП')[0]

    let settlementsObject = settlementsFile && settlementsPrefix ? {
      prefixOrder: settlementsPrefix.order,
      prefixName: settlementsPrefix.name,
      prefixLabel: settlementsPrefix.fullName,
      originalFilename: settlementsFile.name,
      path: settlementsFile.path,
      name: 'НП'
    } : null

    if(!settlementsObject) {
      message.error('Отсутствует файл НП.geojson');
      return;
    }

    let data = [...files]
    let pushed = pushedFiles.map((i) => {

      let name = i.name.slice(0, i.name.indexOf('_'))
      name = name.charAt(0).toUpperCase() + name.slice(1)
      let prefix = config.prefixes.filter((p) => i.name.slice(i.name.indexOf('_'), i.name.indexOf('.')) === p.name)[0]
      if(prefix) {
        return {
          prefixOrder: prefix.order,
          prefixName: prefix.name,
          prefixLabel: prefix.fullName,
          originalFilename: i.name,
          path: i.path,
          name
        }
      }
    }).filter((i) => i)

    let states = []
    for (var i = 0; i < pushed.length; i++) {
      if(states.indexOf(pushed[i].name) == -1) {
        states.push(pushed[i].name)
      }
    }

    states.map((s) => {
      let pushedFiltered = pushed.filter((i) => i.name === s)
      data.push({
        state: s,
        files: pushedFiltered.concat([settlementsObject]),
        status: 'uploaded'
      })
    })

    let unpackedStates = data.filter((i) => i.files.length < 3)
    data = data.map((d) => {
      let dataFiles = d.files
      dataFiles.sort((f1, f2) => f1.prefixOrder > f2.prefixOrder ? 1 : -1)
      return {...d, files: dataFiles}
    })

    if(unpackedStates.join('').trim()) {
      message.error('Отсутствует полная иерархия в гос-вах: ' + unpackedStates.map((i) => i.state).join(', '));
    } else {
      setFiles(data)
    }

  }

  const login = (username, password) => {

    axios.post('/api/users/login', { username: username, password: password }).then((res) => {

      if(res.status == 200 && res.data) {
        let fetchedUser = { username: username, accessToken:  res.data.accessToken }
        setUser(fetchedUser)
        document.cookie = `user=${JSON.stringify(fetchedUser)}; path=/`;
      }

    })

  }

  return (
    <AdminContext.Provider value={{
      login,
      user,
      files,
      pushFiles,
      parseGeojson,
      deleteFile
    }}>
      {children}
    </AdminContext.Provider>
  )

}
