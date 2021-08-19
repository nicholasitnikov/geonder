import React from 'react'
import ReactMapboxGl, { ZoomControl, ScaleControl } from 'react-mapbox-gl'
import BASIC_CONFIG from 'config/'

export default function Map (props) {

  const Map = ReactMapboxGl({
    accessToken: props.mapboxAccessToken,
    minZoom: 2,
    maxZoom: 10,
  })

  return (
    <section className='map-wrapper'>

      <Map
        style={BASIC_CONFIG.style}
        zoom={BASIC_CONFIG.initialZoom}
        center={BASIC_CONFIG.initialCenter}
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
      >

      <span className='mapInfo'>
        <ScaleControl maxWidth={100} unit={"metric"}/>
        <a onClick={() => updateZoom(2)}>2</a>
        <a onClick={() => updateZoom(3)}>3</a>
        <a onClick={() => updateZoom(4)}>4</a>
        <a onClick={() => updateZoom(5)}>5</a>
        <a onClick={() => updateZoom(6)}>6</a>
        <a onClick={() => updateZoom(7)}>7</a>
        <a onClick={() => updateZoom(8)}>8</a>
        <a onClick={() => updateZoom(9)}>9</a>
        <a onClick={() => updateZoom(10)}>10</a>
        <span>{ 'зум: ' + parseFloat(5).toFixed(2) }</span>
      </span>

      </Map>

    </section>
  )

}