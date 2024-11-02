import { IoClose } from "react-icons/io5";


const OverLay = ({open, handleOpen, children}:{open:Boolean, handleOpen:()=>void, children:React.ReactNode}) => {

  return (
    <div className={'OverLayDetailsContainer z-[1000] ' + " "  + (open ? 'showOverLayDetails':'hideOverLayDetails' )} >
      <div className="flex justify-end m-3">
        <button 
            className="p-3 rounded-full hover:bg-gray-200 transition-all"
            onClick={handleOpen}
            >
            <IoClose />
        </button>
      </div>
      {children}
    </div>
  )
}

export default OverLay