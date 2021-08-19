import { useAdmin } from 'contexts/adminContext.js'
import { useEffect } from 'react'
import LoginControl from './login.js'
import UploadControl from './upload.js'
import FilesControl from './files.js'

const AdminControl = () => {

  const { user, files } = useAdmin()

  // if(files.length > 0) {
  //   return <><FilesControl /></>
  // } else if(user) {
  //   return <UploadControl />
  // } else {
  //   return <LoginControl />
  // }

  if(!user) {
    return <LoginControl />
  } else {
    return ''
  }

}

export default AdminControl
