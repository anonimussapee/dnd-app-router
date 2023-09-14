import { createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext()

const  initialValue= {
  items : {
    'item-1': {
      complete:false , id: 'item-1', content: 'crea tu primer ToDo'
    }
  },
  columns : {
    'column-1': {
      title : 'All',
      id : 'column-1',
      itemIds : ['item-1']
    }   
  },
  columnOrder : [ 'column-1'],
  view: {
    all: true,
    active: false,
    completed: false,
  }
  
}
const TodoContextProvider = ({children}) => {
  const [data, setData] = useState(initialValue || [])
  const [dark, setDark] = useState(false)
  const [sincronize, setSincronize] = useState(true)
  const [load, setLoad] =  useState (true)
  const [error, setError] = useState(false)
 
  const dataJson = localStorage.getItem('todoItemsRouter')
  const dataTheme = localStorage.getItem('themeDark')


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
    setTimeout(() => {
      const dataParsed = JSON.parse(dataTheme) || false
      if(dataParsed){
        window.document.body.classList.toggle('dark')
        setDark(true)
        localStorage.setItem('themeDark',JSON.stringify(true))
      }else{localStorage.setItem('themeDark',JSON.stringify( false))}
    }, 10);
  },[sincronize])

  const onSave = (dataNew) =>{
    setData(dataNew)
    localStorage.setItem('todoItemsRouter', JSON.stringify(dataNew))
  }

  const toggleDark = () => {
    window.document.body.classList.toggle('dark')
    localStorage.setItem('themeDark',JSON.stringify(!dark))
    setDark(!dark)
    
  }
  
  return (
    <TodoContext.Provider value={
      {
        data, 
        setData,
        sincronize,
        setSincronize,
        error,
        load,
        onSave,
        dark,
        toggleDark,
      }
    } >

      {children}

    </TodoContext.Provider>
  )
}

const useTodoContext = () => {
  const {
    data, 
    setData,
    sincronize,
    setSincronize,
    error,
    load,
    onSave,
    dark,
    toggleDark,
    } = useContext(TodoContext)

  return {
    data, 
    setData,
    sincronize,
    setSincronize,
    error,
    load,
    onSave,
    dark,
    toggleDark,
  }
}
export {useTodoContext, TodoContextProvider}