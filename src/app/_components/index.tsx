"use client"

import { useEffect } from "react"
import { useGetSignature } from "../_hooks"

const leaveUrl = "http://localhost:3000/leave"
// const meetingNumber = 87423603407
// const password = "uL3KBH"
const client_id = "4g05DuyUQsmHtpyBBXFrMw"
const client_secret = "RN4vQsZd4zuDNZdt6a4950rE19rOm5QJ"

const initZoom = async () => {
  const { ZoomMtg } = await import("@zoom/meetingsdk")

  ZoomMtg.setZoomJSLib("https://source.zoom.us/3.6.0/lib", "/av")
  ZoomMtg.preLoadWasm()
  ZoomMtg.prepareWebSDK()
  ZoomMtg.i18n.load("en-US")

  return ZoomMtg
}

function Zoom({
  meetingNumber,
  password,
}: {
  meetingNumber: number
  password: string
}) {
  const { mutateAsync } = useGetSignature()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    initZoom().then(async (ZoomMtg) => {
      const signature = await mutateAsync({
        meetingNumber: `${meetingNumber}`,
        role: "1",
      })

      if (signature?.data) {
        startMeeting(ZoomMtg, signature?.data)
      }

      // generateSignature(ZoomMtg)
    })

    return () => {
      null
    }
  }, [])

  // const generateSignature = (ZoomMtg: any) => {
  //   ZoomMtg.generateSDKSignature({
  //     sdkKey: client_id,
  //     sdkSecret: client_secret,
  //     meetingNumber: meetingNumber, // meeting number
  //     role: "0", // 1: host, 0: attendee
  //     success: (e: string) => {
  //       startMeeting(ZoomMtg, e)
  //       console.log("success", e)
  //     },
  //     error: (err: any) => console.log(err),
  //   })
  // }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  function startMeeting(ZoomMtg: any, signature: string) {
    const zoomElement = document.getElementById("zmmtg-root")
    if (zoomElement) {
      zoomElement.style.display = "block"
    }

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: false,

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      success: (success: any) => {
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log(success, "initialized vayo hai", signature)

        ZoomMtg.join({
          sdkKey: client_id,
          meetingNumber: meetingNumber,
          signature: signature,
          userName: "hari bahadur",
          passWord: password,
          userEmail: "hb@gmail.com",
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          success: (success: any) => {
            // biome-ignore lint/suspicious/noConsoleLog: <explanation>
            console.log(success, "joined vayo hai")
          },
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          error: (error: any) => {
            // biome-ignore lint/suspicious/noConsoleLog: <explanation>
            console.log(error)
          },
        })
      },
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      error: (error: any) => {
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log(error)
      },
    })
  }

  return (
    <>
      <div id="zmmtg-root" />
    </>
  )
}

export default Zoom
