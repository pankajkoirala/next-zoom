import { ApiErrorType } from "@/app/_hooks"
import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { getAccessTokenFn } from "../../_utils/getAccessToken"

async function getController<T>(
  request: NextRequest,
  params: { params: { id: string | number } }
): Promise<NextResponse<any | ApiErrorType<unknown>>> {
  const access_token = await getAccessTokenFn()
  // Get all meetings with pagination
  const meetingsUrl = `https://api.zoom.us/v2/meetings/${params?.params?.id}`
  try {
    const res = await axios.get(meetingsUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        type: "scheduled", // 'scheduled', 'live', 'upcoming', 'upcoming_meetings', 'previous_meetings'
        page_size: 10,
        next_page_token: "",
      },
    })
    return NextResponse.json(res?.data)
  } catch (error) {
    console.error("Error getting meetings:", error)
    throw error
  }
}

async function deleteController<T>(
  request: NextRequest,
  params: { params: { id: string | number } }
): Promise<NextResponse<any | ApiErrorType<unknown>>> {
  const access_token = await getAccessTokenFn()
  // Get all meetings with pagination

  const meetingsUrl = `https://api.zoom.us/v2/meetings/${params?.params?.id}`
  try {
    const res = await axios.delete(meetingsUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })

    return NextResponse.json(res?.data)
  } catch (error) {
    console.error("Error getting meetings:", error)
    throw error
  }
}

export const DELETE = deleteController
export const POST = getController
