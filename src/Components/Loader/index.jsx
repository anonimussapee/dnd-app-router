const LoadingItems = () => {
  return (
    <>
        <div className={`items-of-todos box-primary item-loading h-[80px] min-h-[70px] ss:h-[70px]  flex flex-col items-center justify-center gap-2 p-4 border-b-white rounded-xl`}>
          <span className='w-[90%] h-[20px] blur-sm rounded-lg item-loading'></span>
          <span className='w-[90%] h-[20px] blur-sm rounded-lg item-loading'></span>
        </div>
        <div className={`items-of-todos box-primary item-loading h-[80px] min-h-[70px] ss:h-[70px]  flex flex-col items-center justify-center gap-2 p-4 border-b-white rounded-xl`}>
          <span className='w-[90%] h-[20px] blur-sm rounded-lg item-loading'></span>
          <span className='w-[90%] h-[20px] blur-sm rounded-lg item-loading'></span>
        </div>
        <div className={`items-of-todos box-primary item-loading h-[80px] min-h-[70px] ss:h-[70px]  flex flex-col items-center justify-center gap-2 p-4 border-b-white rounded-xl`}>
          <span className='w-[90%] h-[20px] blur-sm rounded-lg item-loading'></span>
          <span className='w-[90%] h-[20px] blur-sm rounded-lg item-loading'></span>
        </div>

    </>

  )
}
export {LoadingItems}