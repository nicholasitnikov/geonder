import SearchControl from './search.js'
import LayersControl from './layers.js'
import ItemsControl from './items.js'
import CardControl from './card.js'
import BreadcrumbControl from './breadcrumbs.js'
import AdminControl from '../admin/'
import { useEffect } from 'react'
import { useMobile } from 'contexts/mobileContext.js'

import { Space, Layout, Typography } from 'antd';

const { Sider } = Layout;
const { Title, Paragraph, Text } = Typography;


const Control = (props) => {

  const { isMenuOpen } = useMobile()

  return(
    <>
      <Sider className='layersControl'
        style={{
          overflow: 'auto',
          position: 'fixed',
          height: '100vh'
        }} >


        <Space style={{width: '100%'}} direction='vertical'>
          <Space direction='vertical' size={25}><span /></Space>
          <img className='logo' src='/images/logo.svg' alt='logo' />
          { !isMenuOpen && <Space direction='vertical' size={25}><span /></Space> }
          <BreadcrumbControl selectedLayer={props.selectedLayer} />
          <LayersControl selectedLayer={props.selectedLayer} />
          <SearchControl selectedLayer={props.selectedLayer} />
          <CardControl />
          <ItemsControl selectedLayer={props.selectedLayer} />
          <Space direction='vertical' size={25}><span /></Space>
          <AdminControl />
        </Space>

      </Sider>
    </>
  )

}

export default Control;
