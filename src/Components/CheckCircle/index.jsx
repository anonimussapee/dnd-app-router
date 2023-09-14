const CheckCircle = ({data, setData, item, checkAction, stateCheck, onSave}) => {
  
  const onCheck = () => {
    if(checkAction){
      checkAction()
    }else{
      const dataNew = {
        ...data,
        items:{
          ...data.items,
          [item.id]:{...data.items[item.id], complete : !data.items[item.id].complete}
        }
      }
      setData(dataNew)      
      onSave(dataNew)
    }

  }
  return (
    <span  className={`img w-[25px] min-w-[25px] h-[25px] min-h-[25px] rounded-full border-[1px] border-[var(--Very-Light-Gray)]  ${stateCheck ? 'check-active' : 'bg-transparent'}  relative flex justify-center items-center cursor-pointer`} onClick={onCheck}>
      <span className={`img w-[18px] h-[18px] rounded-full  ${stateCheck ? 'check-active-icon absolute' : 'none'} `}></span>
    </span>
  )
}

export {CheckCircle}