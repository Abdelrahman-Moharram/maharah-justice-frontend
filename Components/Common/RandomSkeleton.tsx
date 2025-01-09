import React from 'react'
import ImageSkeleton from './ImageSkeleton'

interface Props{
    width:string, 
    height:string,
    shadow?:boolean
    margin:string
    rounded:string
}
const  RandomSkeleton = ({width, height, shadow, margin, rounded}:Props) => {
        
    const rows = []
    for(let i = 0; i < Math.random()*20; i++)
        rows.push(
            <ImageSkeleton
                height={height}
                width={width}
                shadow={shadow}
                margin={margin}
                rounded={rounded}
            />
        )
    return rows

}

export default RandomSkeleton