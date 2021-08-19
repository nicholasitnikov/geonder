import { Typography, Select, Space } from 'antd';
import { useEffect } from 'react'
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

import { useLayers } from 'contexts/layersContext.js'

const LayersControl = (props) => {


  const { layers, layersReset, layersCut, selectLayer, getSelectedLayer } = useLayers()

  const clickHandler = (e) => {

    let l = layers.filter((i) => i.name === e)[0]

    if(l.isDefault) {
      layersReset(l)
    } else {
      layersCut(l)
    }

  }

  const renderOptions = () => {

    let content = []

    layers.map((item) => {
      content.push(<Option
        key={layers.indexOf(item)}
        value={item.name}>{item.name}
      </Option>)
    })

    return content

  }

  return(
    <Select onSelect={(e, target) => clickHandler(e)}
            value={getSelectedLayer().name}
            size='large'
            style={{ width: '100%' }}>
      {renderOptions()}
    </Select>
  )

}

export default LayersControl;
