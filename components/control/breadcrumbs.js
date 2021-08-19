import { Breadcrumb } from 'antd';
import { useState, useEffect, useContext, useReducer } from 'react';
import { useLayers } from 'contexts/layersContext.js'
import Layer from 'classes/layer.js'

const BreadcrumbControl = () => {

  const { layers, getSelectedLayer, layersReset, layersCut } = useLayers()

  const clickHandler = (e) => {

    let l = layers.filter((i) => i.name === e.target.innerHTML)[0]

    if(l.isDefault) {
      layersReset(l)
    } else {
      layersCut(l)
    }

  }

  const renderItems = () => {

    let content = []
    if(Layer.allLayersIsDefault(layers)) {
      return content;
    }

    let filtered = layers.filter((i) => {

      return !i.isDefault || Layer.firstUndefaultLayer(layers).slug == i.slug

    })

    filtered.map((layer) => {

      content.push(<Breadcrumb.Item
        onClick={clickHandler}
        key={layers.indexOf(layer)}>
        <a dataitem={layers.indexOf(layer)}>{ layer.name }</a>
      </Breadcrumb.Item>)

    })

    return content

  }

  return(
    <Breadcrumb style={{ marginBottom: '5px' }}>
      {renderItems()}
    </Breadcrumb>
  )

}

export default BreadcrumbControl
