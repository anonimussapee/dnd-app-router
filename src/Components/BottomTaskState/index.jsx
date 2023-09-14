import { NavigatorTodosDesktop } from '../NavigatorTodos'

const BottomTaskState = ({allItems, clearAction, data , setData}) => {
  return (
    <div className='w-full h-[12%] px-4  box-primary flex justify-between items-center text-[--Very-Light-Gray]'>
       <p >{allItems  } Tareas</p>
       <NavigatorTodosDesktop  setData={setData} data={data}/>
       <p className='cursor-pointer' onClick={clearAction} >Limpiar Completas</p>
    </div>
  )
}

export {BottomTaskState}