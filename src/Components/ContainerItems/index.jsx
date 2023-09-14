import { Droppable } from 'react-beautiful-dnd'
import { BottomTaskState } from '../BottomTaskState'
import { Items } from '../Items'
import { NavigatorTodos } from '../NavigatorTodos'
import { LoadingItems } from '../Loader'

const ContainerItems = ({load, data, setData, column, allItems, items,  clearAction, onSave}) => {
  return (
    <div className='box-primary flex flex-col sm:justify-between w-full min-w-[200px] h-[75%] sm:h-[85%] min-h-[200px] rounded-xl overflow-hidden'>
      
      <Droppable 
        droppableId={column.id}

      >
        {
          (provided) => (
            <div id='scroll-container' className=' w-full h-[88%] box-primary flex flex-col overflow-y-scroll'
              ref={provided.innerRef}
            >
              {load && <LoadingItems/>}
              {
                !load && items?.map((item, index) => <Items onSave={onSave} data={data} setData={setData} key={item.id} item={item} index={index}/>)
              }
              {provided.placeholder}
              
            </div>
          )
        }
      </Droppable>
      <BottomTaskState allItems={allItems} clearAction={clearAction} data={data} setData={setData} />
    </div>

  )
}
const Container= ({onSave, children, data, setData}) => {
  return (
    <div className='main-container-column w-[90%] min-w-[320px] max-w-[600px] h-[75vh]  absolute flex flex-col justify-between font-bold '>
      {children}

      <NavigatorTodos  setData={setData} data={data}/>
    </div>
  )
} 

export {ContainerItems, Container}