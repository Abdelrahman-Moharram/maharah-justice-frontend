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
    id?:string
    
}

const ImageInput = ({labelId,
	type,
	onChange,
	file,
	label,
	required = false,
    errors,
    id
}: props) => {
    let objectUrl = undefined
    if(file && typeof(file) !== 'string'){
        objectUrl = URL.createObjectURL(file)
    }

  return (
    <div>
        <label
            htmlFor={labelId}
            className="flex bg-[#FFF8E8] w-[300px] min-h-[200px] overflow-hidden relative justify-center gap-2 items-center hover:bg-primary/30 rounded-md cursor-pointer"
        >
            <span
                className="h-full"
            >
            {
                file? 
                    <div className='relative'>
                        {
                            typeof(file) === 'string' && (file.includes('.png') || file.includes('.jp'))?
                            <img 
                                src={process.env.NEXT_PUBLIC_HOST+"/media/"+file} 
                                className='inputImage fade-in rounded-md w-[300px] h-[300px] overflow-hidden'
                                alt="uploaded file" 
                                width={300}
                                height={200}
                                
                            />
                            :
                            typeof(file) === 'string' ?
                                <div className="text-center">
                                    <div className="flex justify-center">
                                        <FaFile />
                                    </div>
                                    {file}
                                </div>
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
                            
                :<div className=''>
                    <svg width="70" height="71" viewBox="0 0 70 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5008 53.0031C10.5971 53.0031 5 47.4731 5 40.651C5 33.8289 10.5971 28.296 17.5008 28.296C18.3311 28.298 19.1381 28.3757 19.9217 28.5293M19.9217 28.5293C19.238 26.699 18.8883 24.7607 18.8892 22.8068C18.8892 13.7098 26.35 6.33643 35.555 6.33643C44.13 6.33643 51.1913 12.7356 52.1217 20.9635M19.9217 28.5293C21.5352 28.8435 23.0713 29.4718 24.4425 30.3785M41.1113 20.9985C42.898 20.378 44.7761 20.0615 46.6675 20.0623C48.575 20.0623 50.4096 20.3802 52.1217 20.9635M52.1217 20.9635C58.6433 23.1948 63.3333 29.3227 63.3333 36.5327C63.3333 44.4281 57.7129 51.0285 50.2083 52.6327" stroke="#FBB827" strokeWidth="4" strokeLinecap="round"/>
                        <path d="M34.9998 45.5029V63.0029M34.9998 45.5029L40.8332 51.3363M34.9998 45.5029L29.1665 51.3363" stroke="#FBB827" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className=' text-center text-lg '>
                        {label}
                    </div>
                </div>
            }
            </span>
        </label>

        <input
            type={type}
            name={labelId}
            id={id || labelId}
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
