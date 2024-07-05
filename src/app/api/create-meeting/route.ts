import { ApiErrorType } from "@/app/_hooks"
import { NextRequest, NextResponse } from "next/server"

import { json } from "stream/consumers"
import { ReadableStream } from "stream/web"
import axios from "axios"

async function postController<T>(
  request: NextRequest
): Promise<NextResponse<any | ApiErrorType<unknown>>> {
  const client_id = "qDflymgPSCSuGSlJ_bg5Bw"
  const client_secret = "U6dB0icEBRlsqrByoOgM1D7XvlX3wYsz"

  // const url = `https://api.zoom.us/v2/users/${userId}/meetings`
  const url = "https://api.zoom.us/v2/users/me/meetings"

  // Meeting details
  const meetingDetails = {
    topic: "Example Meeting",
    type: 1,
    // start_time: "2024-07-05T11:19:00z",
    duration: 60,
    timezone: "America/New_York",
    agenda: "Test meeting created via Zoom API",
    settings: {
      host_video: true,
      participant_video: true,
      mute_upon_entry: true,
      waiting_room: true,
    },
  }

  // Base64 encode the credentials
  const basicToken = Buffer.from(
    `${client_id}:${client_secret}`,
    "utf8"
  ).toString("base64")
  const response = await axios.post(
    "https://zoom.us/oauth/token?grant_type=account_credentials&account_id=SiSCb5ejTcet0gbkoTq4kA",
    undefined,
    {
      headers: {
        Authorization: `Basic ${basicToken}`,
      },
    }
  )

  console.log(response), "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  const meetingCreateResponse = await axios.post(url, meetingDetails, {
    headers: {
      Authorization: `Bearer ${response?.data?.access_token}`,
      "Content-Type": "application/json",
    },
  })
  return NextResponse.json(meetingCreateResponse.data)
}

export const POST = postController
