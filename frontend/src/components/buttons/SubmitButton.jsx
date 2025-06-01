import React from 'react'

export function SubmitButton({children,className,comment}) {
  return (
    <button className={`button1 w-1/2 ${comment}`}>
        <span className={`text-xl ${className}`}>{children}</span>
    </button>
  )
}
