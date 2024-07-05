"use client"
import { useCreateMeeting } from "../_hooks"

export default function Home() {
  const { mutate } = useCreateMeeting()
  return (
    <div className="flex min-h-screen bg-white flex-col items-center justify-between p-24">
      <button
        onClick={() => {
          mutate()
        }}
        className="h-10 w-[200px] rounded-md bg-black text-white"
      >
        Create meeting
      </button>
    </div>
  )
}
