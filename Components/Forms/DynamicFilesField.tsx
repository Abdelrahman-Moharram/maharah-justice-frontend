import React, { ChangeEvent, useState } from 'react'
import ImageInput from './ImageInput'

interface Props{
    attachments?: File[] | null,
    errors:any
    imageChange?: (file:File, id?:string)=> void | undefined;

}
const DynamicFilesField = ({
        attachments,
        errors,
        imageChange,
    }:Props) => {
    const [file, setFile] = useState<File|null>(null)
    const changeCurrentFile = (e:ChangeEvent<HTMLInputElement> ) =>{
        const files = e.target.files
        
        if (files?.length && imageChange){
            imageChange(files[0], e.target.id)
            setFile(null)
        }
    }
  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm-grid-cols-2 gap-3 items-center">
        {
            attachments?.length?
                attachments?.map((attch:File|string, idx)=>(
                    <div className="" key={idx}>
                        <ImageInput
                            labelId={`image-${idx}`}
                            type={'file'}
                            onChange={changeCurrentFile}
                            file={attch}
                            label={`المرفق رقم(${idx})`}
                            required= {false}
                            errors={errors?.attch}
                            id={idx.toLocaleString()}
                        />
                    </div>
                ))
            :null
        }

        <div className="">
            <ImageInput
                labelId={'image'}
                type={'file'}
                onChange={changeCurrentFile}
                file={file}
                label={`المرفقات`}
                required= {false}

                // errors={errors?.attch}
            />
        </div>
    </div>
  )
}

export default DynamicFilesField
