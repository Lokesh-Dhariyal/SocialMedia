import React from 'react'

export function FollowButton({children}) {
  return (
    <button class="cursor-pointer transition-all bg-gray-500 text-white px-6 py-2 rounded-lg border-gray-700
        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
        {children}
    </button>
  )
}
