import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useAdmin } from 'contexts/adminContext.js'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import config from 'config/'
const { Dragger } = Upload;

const UploadControl = () => {

  const { user, pushFiles } = useAdmin()
  let files = useRef([])
  let selectedFiles = useRef([])

  useEffect(() => {

    return () => {
      files.current = []
      selectedFiles.current = []
    }

  })

  const axiosRequest = ({ onSuccess, onProgress, onError, file }) => {

    let fd = new FormData()
    fd.append('files', file)

    axios.post('/api/admin/upload', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': user.accessToken
        },
        onUploadProgress: (e) => {
          onProgress({percent: e.loaded / (e.totalSize / 100)})
        }
    }).then((res, err) => {

        if(err && !res) { console.error(err); reject(); return; }

        if(!files.current.filter((i) => i.name === file.name)[0]) {
          files.current.push({...res.data.file.files, status: 'uploaded'})
        }

        if(selectedFiles.current.length === files.current.length) {
          pushFiles(files.current)
        }

    })

  }

  const props = {
    name: 'file',
    beforeUpload: (file, filelist) => {
      selectedFiles.current = filelist
    },
    multiple: true,
    showUploadList: {
      showRemoveIcon: false,
      showDownloadIcon: false
    },
    customRequest: axiosRequest
  };

  return(
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Нажмите или перетащите файл</p>
      <p className="ant-upload-hint">
        Поддерживаються файлы формата GeoJSON
      </p>
    </Dragger>
  )

}

export default UploadControl
