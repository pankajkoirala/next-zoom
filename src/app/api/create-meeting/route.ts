import { ApiErrorType } from "@/app/_hooks"
import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { getAccessTokenFn } from "../_utils/getAccessToken"
import { ReadableStream } from "stream/web"
import { json } from "stream/consumers"
import { MeetingData } from "@/app/_components/create-meeting-dialog"

async function postController<T>(
  request: NextRequest
): Promise<NextResponse<any | ApiErrorType<unknown>>> {
  // const url = `https://api.zoom.us/v2/users/${userId}/meetings`
  const url = "https://api.zoom.us/v2/users/me/meetings"
  const body = (await json(request.body as ReadableStream)) as MeetingData

  // Meeting details
  const meetingDetails = {
    topic: body?.agenda,
    type: 2,
    start_time: body?.start_time, // Example: start immediately
    duration: body?.duration, // Duration in minutes
    agenda: body?.agenda,
    password: body?.password,
    settings: {
      host_video: true,
      participant_video: true,
      mute_upon_entry: true,
      waiting_room: true,
      join_before_host: true,
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
