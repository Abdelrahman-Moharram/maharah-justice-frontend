import React from 'react'
import StepsItem from './StepsItem'

const Steps = ({steps}:{steps:Step[]}) => {
  return (
    <div>
        <h2 className="sr-only">Steps</h2>

        <div
            className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100"
        >
            <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                {
                    steps?.map(step=>(
                        <StepsItem
                            is_done={step.is_done}
                            name={step.name}
                            number={step.number}
                            key={step.number}
                        />
                    ))
                }
            </ol>
        </div>
    </div>
  )
}

export default Steps
