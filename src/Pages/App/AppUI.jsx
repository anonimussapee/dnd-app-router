import { useState } from 'react'
import './App.css'
import { DragDropContext} from 'react-beautiful-dnd'
import { CreateTodo } from '../../Components/CreateTodo'
import { Container, ContainerItems } from '../../Components/ContainerItems'
import { useLocalStorage } from '../../Components/useLocalStorage'
import { useTodoContext } from '../../Components/Context'




const AppUI = () => {

  

  // const [data, setData] =  useState(initialItems)
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
    } = useTodoContext()



  
  const onDragEnd = (result) => {
    const {destination, source, draggableId} =  result

    if(!destination ) {
      return
    }
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return 
    }

    const column =  data.columns[source.droppableId]
    const newItemIds = Array.from(column.itemIds)
    newItemIds.splice(source.index, 1)
    newItemIds.splice(destination.index, 0 , draggableId)

    const newColumn = {
      ...column,
      itemIds: newItemIds
    }
    const newState = {
      ...data,
      columns:{
        ...data.columns,
        [source.droppableId] :newColumn
      }
    }

    setData(newState)
    onSave(newState)
  }
  const clearAction = () =>{
    const itemsCompletes = Object.values(data.items).filter(item=>item.complete)
    if(itemsCompletes.length> 0){
      
      const itemsKeys =  Object.keys(data.items)
      const itemsActives = Object.values(data.items).filter(item=>!item.complete)
      let newState = {}
      itemsKeys.forEach(item=>{
        for (const itemActive of itemsActives) {
          if(itemActive.id === item){
            newState = {
              ...newState,
              [item] : itemActive
            }
          }
        }
      })
      
      

      const dataNew = {
        ...data,
        items:newState,
        columns: {
          ...data.columns,
          'column-1': {
            ...data.columns['column-1'],
            itemIds : [...itemsActives?.map(item=>item.id)]
          },
        },
      }
      setData(dataNew)
      onSave(dataNew)
    }
  } 

  const allItems = data.view.all === true ?  Object.keys(data.items).length : data.view.active === true ?  ((Object.values(data.items)).filter(item=>!item.complete)).length : (Object.values(data.items).filter(item=>item.complete===true)).length 


  return (
    <section className="w-full min-w-[320px] h-[100vh] flex flex-col items-center ">
      {/* this section are to header image, title and logo */}
      <div className={`main-bg-image ${ dark ? 'bg-todo-dark' : 'bg-todo-ligth ' } relative `}>
        <div className='title-and-icon-container flex justify-between '>
          <h1 className='text-[2.8rem] font-mono text-white font-bold '>TODO</h1>
          <span className={`img  ${dark ? ' icon-mode-dark ' : ' icon-mode-ligth '} cursor-pointer`} onClick={toggleDark}></span>
        </div>
      </div>
       {/* this section is to task ccolumn box */}
      <Container setData={setData} data={data} onSave={onSave}>
        <CreateTodo onSave={onSave} setData={setData} data={data}/>
        <DragDropContext
         onDragEnd={onDragEnd}
        > 
          {
          data.columnOrder?.map((columnId)=> {

            const column =  data.columns[columnId]
            if(data.view.all){

              const items =  column.itemIds?.map(itemId => data?.items[itemId]  )
              return (
                <ContainerItems load={load} onSave={onSave}  key={column.id} items={items}  column={column}  allItems={allItems} clearAction={clearAction} setData={setData} data={data}/>
              )

            }else if(data.view.active){

              const itemsAll =  column.itemIds?.map(itemId => data?.items[itemId])
              const items = itemsAll.filter(item=>item.complete === false)
              return (
                <ContainerItems onSave={onSave} key={column.id+'active'} items={items}  column={column}  allItems={allItems} clearAction={clearAction} setData={setData} data={data}/>
              )

            }else if(data.view.completed){
              const itemsAll =  column.itemIds?.map(itemId => data?.items[itemId] )
              const items = itemsAll.filter(item=>item.complete )
              return (
                <ContainerItems onSave={onSave} key={column.id+'complete'} items={items}  column={column}  allItems={allItems} clearAction={clearAction} setData={setData} data={data}/>
              )
            } 
          })
          }
        </DragDropContext>
      </Container> 
      <p className='text-[--Very-Light-Gray] h-[5vh] absolute bottom-0 font-extrabold'> Arrastra y suelta para priorizar tareas</p>


    </section>
  )
    
}

export  {AppUI}
