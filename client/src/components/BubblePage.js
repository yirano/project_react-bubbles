import React, { useState, useEffect } from "react"

import Bubbles from "./Bubbles"
import ColorList from "./ColorList"
import { axiosWithAuth } from './axiosWithAuth'

const BubblePage = () => {
  const [colorList, setColorList] = useState([])
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        setColorList(res.data)
      })
  }, [])
  const deleteColor = e => {
    axiosWithAuth()
      .delete(`/colors/${e.target.id}`)
      .then(res => setColorList(res.data))
      .catch(err => console.log('Error deleting: ', err))
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} deleteColor={deleteColor} />
    </>
  )
}

export default BubblePage
