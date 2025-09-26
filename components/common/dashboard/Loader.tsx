import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const Loader = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
    </div>
  )
}

export default Loader