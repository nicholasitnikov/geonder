import React, { useState, useEffect, useContext, useReducer } from "react";
import "antd/dist/antd.dark.css"
import Head from 'next/head'
import { MobileProvider } from '../contexts/mobileContext.js'

const MyApp = ({ Component, pageProps }) => {

  return(
    <>
      <MobileProvider>
        <Head>
        <link rel="stylesheet" href="/css/normalize.css" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
        <link href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css" rel="stylesheet"  type="text/css" />
        <link rel="stylesheet" href="/css/base.css" />
        <title>Geonder — первая географическая библиотека</title>
        </Head>
        <Component {...pageProps} />
      </MobileProvider>
    </>
  )

}

export default MyApp;
