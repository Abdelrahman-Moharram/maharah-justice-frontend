import React from 'react'
import { ImageSkeleton } from '../Common'

const TableSkeleton = () => {
    const RowsSkeleton = () =>{
        const rows = [
            <ImageSkeleton
                height='40px'
                width='100%'
                shadow
                margin='20px 0px'
                key={'first-0'}
            />
        ]

        for(let i = 0; i < Math.random()*20; i++)
            rows.push(
                <ImageSkeleton
                    height='40px'
                    width='100%'
                    shadow={false}
                    margin='10px 0px'
                    rounded='10px'
                    key={i}
                />
            )
        return rows
    }
  return (
    <div className='drop-shadow-md'>
      {RowsSkeleton()}
    </div>
  )
}

export default TableSkeleton
