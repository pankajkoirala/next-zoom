"use client"

import Zoom from "../_components"
import { useSearchParams } from "../_hooks/use-search-params"

export default function Join() {
  const { searchParams } = useSearchParams()
  const meeting_id = searchParams.get("meeting_id")
  const passWord = searchParams.get("password")
  const user_email = searchParams.get("user_email")
  // const user_name = searchParams.get("user_name")
  const joining_as_host = searchParams.get("joining_as_host")
  // const

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Zoom
        meetingNumber={Number(meeting_id)}
        password={String(passWord)}
        userEmail={String(user_email)}
        // userName={String(user_name)}
        userName={String(user_email)}
        isHost={joining_as_host === "true"}
      />
    </div>
  )
}
