import React from 'react'
import Spinner from './Spinner';

interface props{
    title: string
    submit?: boolean;
    isLoading: boolean;
    onClick?:()=>void;
    icon?:React.ReactNode;
    className?: string
  }
const Button = ({title, submit, isLoading, onClick, icon, className}:props) => {
  return (
    <button
        
        type={submit? "submit" : "button" }
        onClick={onClick}
        className={`w-full py-2 rounded-lg border transition-all `+ className}
    >
      <div className='flex justify-center items-center content-center gap-1 text-center'>
        {isLoading? <Spinner sm />: icon } {title}
      </div>
      
    </button>
  )
}

export default Button
