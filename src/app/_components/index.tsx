"use client"

import { ZoomMtg } from "@zoom/meetingsdk"
import Image from "next/image"

ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()

function Zoom() {
  var leaveUrl = "http://localhost:3000"
  const meetingNumber = "85641717157"
  const password = "h3pz0g"
  const client_id = process.env.ZOOM_CLIENT_ID ?? ""
  const client_secret = process.env.ZOOM_CLIENT_SECRET ?? ""

  function getSignature() {
    ZoomMtg.generateSDKSignature({
      sdkKey: client_id,
      sdkSecret: client_secret,
      meetingNumber: meetingNumber, // meeting number
      role: "0", // 1: host, 0: attendee
      success: (e: string) => {
        startMeeting(e)
        console.log("success", e)
      },
      error: (err: any) => console.log(err),
    })
  }

  function startMeeting(signature: string) {
    const zoomelement = document.getElementById("zmmtg-root")
    if (zoomelement) {
      zoomelement.style.display = "block"
    }

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: false,
      success: (success: any) => {
        console.log(success, "initialized vayo hai")

        ZoomMtg.join({
          signature: signature,
          sdkKey: client_id,

          passWord: password,
          meetingNumber: meetingNumber,
          userName: "test",
          userEmail: "test@gmail.com",
          success: (success: any) => {
            console.log(success, "joined vayo hai")
          },
          error: (error: any) => {
            console.log(error)
          },
        })
      },
      error: (error: any) => {
        console.log(error)
      },
    })
  }

  return (
    <div className="App">
      <main className="flex justify-center flex-col items-center gap-4">
        <h1>Zoom Meeting SDK Sample React</h1>
        <div className="h-[350px] w-[350px] rounded-md bg-black/50 flex justify-center items-center">
          <Image
            src={"/user.png"}
            height={300}
            width={300}
            alt="user"
            className="rounded-md object-cover"
          />
        </div>
        <button
          className="bg-black/50 text-white rounded hover:bg-black/40 h-10 w-fit p-2"
          onClick={getSignature}
        >
          Join Meeting
        </button>
      </main>
    </div>
  )
}

export default Zoom
