import { ApiErrorType } from "@/app/_hooks"
import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { getAccessTokenFn } from "../_utils/getAccessToken"

async function getController<T>(
  request: NextRequest
): Promise<NextResponse<any | ApiErrorType<unknown>>> {
  const access_token = await getAccessTokenFn()
  // Get all meetings with pagination
  const meetingsUrl = "https://api.zoom.us/v2/users/me/meetings"
  let finalData: any[] = []
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

    finalData = finalData.concat(res.data.meetings)
  } catch (error) {
    console.error("Error getting meetings:", error)
    throw error
  }

  return NextResponse.json(finalData)
}

export const GET = getController
