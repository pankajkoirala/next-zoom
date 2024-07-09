import { ApiErrorType } from "@/app/_hooks"
import { NextRequest, NextResponse } from "next/server"

import { json } from "stream/consumers"
import { ReadableStream } from "stream/web"
import { KJUR } from "jsrsasign"

async function postController<T>(
  request: NextRequest
): Promise<NextResponse<any | ApiErrorType<unknown>>> {
  const body = (await json(request.body as ReadableStream)) as {
    meetingNumber?: number
    role: number
  }
  const client_id = process.env.NEXT_ZOOM_SDK_CLIENT_ID
  const client_secret = process.env.NEXT_ZOOM_SDK_SECRET_ID

  const iat = Math.round(new Date().getTime() / 1000) - 30
  const exp = iat + 60 * 60 * 2
  const oHeader = { alg: "HS256", typ: "JWT" }

  const oPayload = {
    sdkKey: client_id,
    appKey: client_id,
    mn: body?.meetingNumber,
    role: body?.role,
    iat: iat,
    exp: exp,
    tokenExp: exp,
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, client_secret)

  return NextResponse.json(sdkJWT)
}

export const POST = postController
