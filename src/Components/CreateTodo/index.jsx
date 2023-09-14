import { useState } from 'react'
import { CheckCircle } from '../CheckCircle'

const CreateTodo = ({setData, data, onSave}) => {
  const [todoName, setTodoName] = useState('')
  const onCreate = (event) => {
    const idsActives = [] 
    if(event.keyCode === 13 && (event.target.value).length>2 || event.key === "Enter" && (event.target.value).length>2){

      // aqui estan todos los items para determinar un id diferente
      const ids = Object.keys(data.items)
      const idN = ids.map(item=>Number(item.replace('item-','')))
      let idNew = 0
      for (let i = 1; i < 200; i++) {
       const condition = idN.some(item=>item === i)
       console.log(condition)
       if(!condition){
        idNew = i
        break
       }
      }
      console.log(idNew)

      const itemsActives = Object.values(data.items)
      itemsActives.forEach(item=>idsActives.push(item.id)) 
      const dataNew = {
        ...data,
        items:{
          ...data.items,
          [`item-${idNew}`]:{timeStamp: Date.now() ,complete : false ,id : `item-${idNew}`, content: todoName}
        },
        columns:{
          ...data.columns,
          'column-1':{
            ...data.columns['column-1'],
            itemIds : [...idsActives, `item-${idNew}`,   ]
          },
        }
      }
      setData(dataNew)
      onSave(dataNew)
      setTodoName('')
    }

  }
  
  const onCreateCheck = () => {
    const idsActives = [] 
    if(todoName.length>2){
      
      const ids = Object.keys(data.items)
      const idN = ids.map(item=>Number(item.replace('item-','')))
      let idNew = 0
      for (let i = 1; i < 300; i++) {
       const condition = idN.find(item=>item === i)
       if(!condition){
        idNew = i
        break
       }
      }

      const itemsActives = Object.values(data.items)
      itemsActives.forEach(item=>idsActives.push(item.id)) 
      const dataNew = {
        ...data,
        items:{
          ...data.items,
          [`item-${idNew}`]:{timeStamp: Date.now() ,complete : false ,id : `item-${idNew}`, content: todoName}
        },
        columns:{
          ...data.columns,
          'column-1':{
            ...data.columns['column-1'],
            itemIds : [ ...idsActives, `item-${idNew}`, ]
          }
        }
      }
      setData(dataNew)
      onSave(dataNew)
      setTodoName('')
    } 
  }
  
  return (
    <div className=' flex-grow-[1] max-h-[50px]  flex items-center gap-6 p-4 box-primary rounded-xl'>
     <CheckCircle stateCheck={true} checkAction={onCreateCheck} />
      <input className='box-primary dark:placeholder:text-[--text-color-primary] outline-none flex-grow-[1]' name='todo-creator'  id='todo-creator' type='text' value={todoName} onChange={(e)=>{setTodoName(e.target.value)}} onKeyDown={onCreate} placeholder='Crear una nueva Tarea'/>
    </div>
  )
}


export {CreateTodo}