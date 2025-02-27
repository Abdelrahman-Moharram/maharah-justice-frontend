import React from 'react'
import Spinner from './Spinner';

interface props{
    title     : string
    submit?   : boolean;
    isLoading : boolean;
    onClick?  : ()=>void;
    icon?     : React.ReactNode;
    className?: string;
    disabled? : boolean,
    variant   : 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline' | 'red'
  }

  
  
  const Button = ({title, submit, isLoading, onClick, icon, variant, disabled=false}:props) => {
    
    const variantClassNames = {
      'primary'             : `${disabled?'bg-primary/80':'bg-primary'} hover:bg-primary-hover focus-visible:outline-primary`,
      'secondary'           : `${disabled?'bg-secondary/80':'bg-secondary'} hover:bg-secondary-hover focus-visible:outline-secondary`,
      'primary-outline'     : `${disabled?'bg-transparent/80':'bg-transparent'} hover:bg-primary-hover focus-visible:outline-primary`,
      'secondary-outline'   : `${disabled?'bg-primary/80':'bg-primary'} hover:bg-primary-hover focus-visible:outline-primary`,
      
      'red'                 : `${disabled?'bg-red-500/80':'bg-red-500'} hover:bg-transparent hover:text-black border-red-500 text-white`

    }
  return (
    <button
        type={submit? "submit" : "button" }
        onClick={onClick}
        className={`w-full py-2 rounded-xl border transition-all `+ variantClassNames[variant]}
        disabled={disabled}
    >
      <div className='flex justify-center items-center content-center gap-1 text-center leading-6 font-[700]  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'>
        {isLoading? <Spinner sm />: icon } {title}
      </div>
      
    </button>
  )
}

export default Button
