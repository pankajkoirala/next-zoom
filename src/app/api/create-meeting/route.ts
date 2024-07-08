import { ApiErrorType } from "@/app/_hooks"
import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { getAccessTokenFn } from "../_utils/getAccessToken"

async function postController<T>(
  request: NextRequest
): Promise<NextResponse<any | ApiErrorType<unknown>>> {
  // const url = `https://api.zoom.us/v2/users/${userId}/meetings`
  const url = "https://api.zoom.us/v2/users/me/meetings"

  // Meeting details
  const meetingDetails = {
    topic: "ram lal Meeting with pw",
    type: 2,
    start_time: new Date().toISOString(), // Example: start immediately
    duration: 60, // Duration in minutes
    timezone: "America/New_York",
    agenda: "ram lal Meeting wih pw",
    password: "123456",
    settings: {
      host_video: true,
      participant_video: true,
      mute_upon_entry: true,
      waiting_room: true,
      join_before_host: true,
      password: "securepassword", // Password for the meeting
    },
  }

  const access_token = await getAccessTokenFn()
  const meetingCreateResponse = await axios.post(url, meetingDetails, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  })
  return NextResponse.json(meetingCreateResponse.data)
}

export const POST = postController
