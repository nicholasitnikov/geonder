import { useState, useEffect, useContext, useReducer } from 'react';
import { Typography, List, Space } from 'antd';
const { Title } = Typography
import BreadcrumbControl from './breadcrumbs.js'
import { useItems } from 'contexts/itemsContext.js'
import { useLayers } from 'contexts/layersContext.js'
import Layer from 'classes/layer.js'


const ItemsControl = (props) => {

  const { fetchItems, items } = useItems()
  const { getSelectedLayer, pushLayer } = useLayers()

  useEffect(() => {

    fetchItems(getSelectedLayer())

  }, [getSelectedLayer()])

  const itemClickHandler = (e) => {

    let i = e.target.getAttribute('itemindex');
    pushLayer(new Layer(items[i], true))

  }

  return(
    items.length > 0 &&
    <>
      <List
        size="small"
        bordered
        dataSource={items}
        renderItem={item => <List.Item itemindex={items.indexOf(item)}
          onClick={(e) => itemClickHandler(e)}>{item.name}
        </List.Item>}
      />
    </>
  )

}

export default ItemsControl;
