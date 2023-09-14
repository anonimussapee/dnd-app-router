import {  useEffect, useState } from 'react'

const useLocalStorage = (initialValue) => {
  const [data, setData] = useState(initialValue || [])
  const [sincronize, setSincronize] = useState(true)
  const [load, setLoad] =  useState (true)
  const [error, setError] = useState(false)
 
  const dataJson = localStorage.getItem('todoItems')

  useEffect(()=>{
    setTimeout(()=>{

      try {

        const dataParsed = JSON.parse(dataJson) || initialValue
        setData(dataParsed)
        setSincronize(true)
        setLoad(false)
      } catch (error) {

        setError(true)
        
      }

    },1500)
  },[sincronize])

  const onSave = (dataNew) =>{
    setData(dataNew)
    localStorage.setItem('todoItems', JSON.stringify(dataNew))
  }

  return {
    data, 
    setData,
    sincronize,
    setSincronize,
    error,
    load,
    onSave,
  }
}
export {useLocalStorage}