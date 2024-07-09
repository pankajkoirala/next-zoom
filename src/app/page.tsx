"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import HomePage from "./_components/home-page"

export default function Home() {
  const router = useRouter()
  return (
    <main className="p-8">
      <HomePage />
    </main>
  )
}
