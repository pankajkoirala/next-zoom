"use client"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-3xl text-white">Welcome To Zoom App</div>
      <button
        onClick={() => {
          router.push("/create")
        }}
        className="h-10 w-[200px] rounded-md bg-black text-white"
      >
        Create meeting
      </button>
    </main>
  )
}
