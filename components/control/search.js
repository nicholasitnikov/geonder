import { useState, useEffect } from 'react';
import { Typography, AutoComplete, Input, Space } from 'antd';
import { useItems } from 'contexts/itemsContext.js'
import { useLayers } from 'contexts/layersContext.js'
import Layer from 'classes/layer.js'
const { Title } = Typography
const { Option } = AutoComplete;

const SearchControl = (props) => {

  const [filter, setFilter] = useState('')
  const { items } = useItems()
  const { pushLayer, getSelectedLayer } = useLayers()

  const getOptions = () => {

    let options = []

    let f = items.filter((i) => {
      return i.name
    })

    f.map((i) => {
      if(i.name.toLowerCase().indexOf(filter.toLowerCase(), 0) == 0) {
        options.push({ value: i.name, key: i.id })
      }
    })

    return options

  }

  const selectHandler = (e) => {

    items.map((i) => {

      if(i.name === e) {
        pushLayer(new Layer(i, true))
      }

    })

  }

  return(
      <AutoComplete
        spellCheck="false"
        disabled={!getSelectedLayer().isDefault}
        options={getOptions()}
        onSelect={selectHandler}
        style={{width: '100%'}}
        dropdownMatchSelectWidth={252}
        onSearch={(e) => setFilter(e)} >
      <Input.Search autoComplete="off" size="large" placeholder="города, реки, государства, дороги" />
    </AutoComplete>
  )

}

export default SearchControl;
