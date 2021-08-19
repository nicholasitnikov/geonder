import { Card, Button, Image, Table, Tag, Space, Typography } from 'antd';
import CardEditor from './cardEditor.js';
import { EditOutlined } from '@ant-design/icons';
import { useLayers } from 'contexts/layersContext.js';
import { useAdmin } from 'contexts/adminContext.js';
import { useCard } from 'contexts/cardContext.js';
import { useEffect, useState, useRef } from 'react'

const { Meta } = Card;
const { Title } = Typography;

const columns = [
  {
    title: 'Название',
    dataIndex: 'label',
    key: 'label'
  },
  {
    title: 'Значение',
    dataIndex: 'value',
    key: 'value',
    render: value => {
      if(value.indexOf('svg') == -1) {
        return <span>{value}</span>
      } else {
        return <Image src={value} />
      }
    }
  }
];

const CardControl = () => {

  const { getSelectedLayer } = useLayers()
  const { user } = useAdmin()
  const { card, editorMode, setEditorMode } = useCard()
  const currentLayer = getSelectedLayer()
  let isExists = useRef(false)

  // if((editorMode || !card) && user) {
  //   return (
  //     <CardEditor />
  //   )
  // }

  if(!card) return '';

  if(currentLayer.isDefault || currentLayer.id !== card.parent_id) {
    return ''
  }

  const editHandler = (e) => {
    isExists.current = card !== undefined
    setEditorMode(true)
  }

  return card ? (
    <>
      <Title level={3}>{card.title}</Title>
      <Table columns={columns} dataSource={card.fields} pagination={false} />
    </>
  ) : ''

}

// <Card
//   actions={user ? [ <EditOutlined onClick={(e) => editHandler(e)} key="edit" data-id={card.id} /> ] : []}
//   cover={card.thumbnail && <img alt="card_thumbnail" src={'https://uploads.geonder.ru/' + card.thumbnail} />} >
//     <Meta title={card.title} description={card.description} />
// </Card>

export default CardControl
