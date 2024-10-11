import Image from 'next/image';
import React, { ChangeEvent } from 'react'
import { FaFile, FaVideo } from 'react-icons/fa';
import { IoIosCloudUpload } from "react-icons/io";

interface props {
	labelId: string;
	type: string;
	onChange?: (e:ChangeEvent<HTMLInputElement>) => void;
	file?:  File | string | null;
	label: string
	required?: boolean;
    errors?: string[];
    
}

const ImageInput = ({labelId,
	type,
	onChange,
	file,
	label,
	required = false,
    errors,

}: props) => {
    let objectUrl = undefined
    if(file && typeof(file) !== 'string'){
        objectUrl = URL.createObjectURL(file)
    }
  return (
    <div>
        <label
            htmlFor={labelId}
            className="flex w-[300px] min-h-[200px] overflow-hidden relative justify-center gap-2 items-center hover:bg-card  border rounded-md cursor-pointer"
        >
            <span
                className="h-full"
            >
            {
                file? 
                    <div className='relative'>
                        {
                            typeof(file) === 'string'?
                            <img 
                                src={process.env.NEXT_PUBLIC_HOST+"/media/"+file} 
                                className='inputImage fade-in rounded-md w-[300px] h-[200px] overflow-hidden'
                                alt="uploaded file" 
                                width={300}
                                height={200}
                                
                            />
                            :
                            file?.type?.includes("image")?
                                <img 
                                    src={objectUrl} 
                                    className='inputImage  w-[300px] h-[200px] overflow-hidden fade-in rounded-md'
                                    alt="uploaded file" 
                                />
                            :
                            file.type.includes('video')?
                            <div className="text-center">
                                <div className="flex justify-center">
                                    <FaVideo />
                                </div>
                                {file?.name}
                            </div>
                            :
                            
                            <div className="text-center">
                                <div className="flex justify-center">
                                    <FaFile />
                                </div>
                                {file?.name}
                            </div>
                        }
                        <div 
                            className="preview-image absolute gap-4 transition-all font-extrabold text-secondry flex justify-center items-center top-0 bottom-0 left-0 right-0  hover:bg-white/50"
                        >
                            <div className="hidden bg-card text-color gap-2 items-center px-8 py-3 rounded-md">
                                <IoIosCloudUpload />
                                تغيير
                            </div>
                        </div>
                    </div>
                            
                :<div className='flex items-center gap-3'>
                    <IoIosCloudUpload /> {label}
                </div>
            }
            </span>
        </label>

        <input
            type={type}
            name={labelId}
            id={labelId}
            onChange={onChange}
            required={required}
            className="hidden"
            placeholder={label}
        />
        {
            errors?.map(error=>
                <span key={error} className='text-red-500 block'>{error}</span>
            )
        }
    </div>
  )
}

export default ImageInput
