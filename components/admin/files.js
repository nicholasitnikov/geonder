import { Card, Avatar } from 'antd';
import { useAdmin } from 'contexts/adminContext.js'
import { FileTextOutlined, DeleteOutlined, SyncOutlined } from '@ant-design/icons';
import config from 'config/'

const { Meta } = Card;

const FilesControl = () => {

  const { files, parseGeojson, deleteFile } = useAdmin()
  let data = []

  const handleAction = (e) => {
    const index = e.currentTarget.getAttribute('data-index')
    const action = e.currentTarget.getAttribute('data-action')

    switch (action) {
      case 'parse':
        parseGeojson(files[index])
        break;
      case 'delete':
        deleteFile(files[index])
        break;
      default:
        return;

    }

  }

  return(
    <div>
      {
        files.map((i, index) => {

          return(
            <div key={index}>
              <Card
                style={{marginBottom: 10}}
                actions={[
                  i.status === 'processing' ? <SyncOutlined spin /> : <FileTextOutlined onClick={handleAction} data-index={index} data-action='parse' key="upload" />,
                  <DeleteOutlined onClick={handleAction} data-index={index} data-action='delete' key="delete" />
                ]}
              >
                <Meta
                  title={i.state}
                  description={
                    i.files.map((item) => item.prefixLabel).join(', ')
                  }
                />
              </Card>
            </div>
          )

        })
      }
    </div>
  )

}

export default FilesControl
