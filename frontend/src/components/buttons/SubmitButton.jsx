import React from 'react'

export function SubmitButton({children,className}) {
  return (
    <button className={`bg-white rounded-xl w-30 h-10 ${className}`}>
        {children}
    </button>
  )
}
