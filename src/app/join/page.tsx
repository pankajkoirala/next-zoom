"use client"
import Zoom from "../_components"
import { useSearchParams } from "../_hooks/use-search-params"

export default function Join() {
  const { searchParams } = useSearchParams()
  const meeting_id = searchParams.get("meeting_id")
  const passWord = searchParams.get("password")
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Zoom meetingNumber={Number(meeting_id)} password={String(passWord)} />
    </div>
  )
}
