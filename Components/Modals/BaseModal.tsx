import React from 'react';



interface Props{
    children: React.ReactNode;
    handleToggler:()=>void;
    open: boolean;
    containerClassName?:string
}
export default function BaseModal({children, open, handleToggler, containerClassName=""}:Props) {


  return (
    <div className={"w-full"}>
    {
      open?
        <>
          <div 
            onClick={handleToggler}
            className="fixed top-0 bottom-0 right-0 left-0 bg-black/20 z-[2]"
            >
          </div>
          <div className="min-w-[50%] w-[500px] z-20 flex items-center pt-10 justify-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={"w-fit h-full rounded-md shadow-md p-4 bg-container z-3 min-w-[70%] "+containerClassName}>
                {children}
            </div>
          </div>
        </>

      :null
    }
    </div>
  );
}
