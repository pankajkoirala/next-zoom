"use client"
import { toast } from "sonner"
import {
  useCreateMeeting,
  useDeleteMeeting,
  useGetMeetingById,
  useGetMeetings,
} from "../../_hooks"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CreateMeetingDialog } from "../create-meeting-dialog"
import Image from "next/image"
import { format } from "date-fns"

export default function HomePage() {
  const [isopen, setIsopen] = useState(false)
  const [meeting_id, setMeeting_id] = useState()
  const [user_as, setUser_as] = useState<"host" | "guest" | "">("")
  const { mutateAsync: createMeeting, isPending: createMeetingLoading } =
    useCreateMeeting()
  const { mutateAsync: getMeetingById, isPending: joiningMeetingLoading } =
    useGetMeetingById()
  const {
    data: meetings,
    refetch,
    isLoading: getMeetingLoading,
  } = useGetMeetings()
  const { mutateAsync: deleteMeeting, isPending: deleteMeetingLoading } =
    useDeleteMeeting()
  const router = useRouter()

  return (
    <>
      <div className="flex ">
        <div className="flex flex-col gap-5 items-center w-full">
          <div className="flex flex-col gap-4 items-center">
            <Image src="/user.png" alt="Next.js Logo" width={180} height={37} />
            <button
              onClick={() => {
                setIsopen(true)
              }}
              className="h-10 w-[200px] rounded-md bg-black text-white"
            >
              Create meeting
            </button>
          </div>

          <div className="rounded-lg bg-[e5e5e5] shadow-md max-h-[500px] overflow-y-auto w-full   border border-gray-200">
            <div className="flex w-full flex-1  bg-blue-400 h-10 items-center p-2 rounded-t-lg text-black font-semibold">
              <div className="w-full">Agenda</div>
              <div className="w-full">Duration</div>
              <div className="w-full">Start time</div>
              <div className="w-full">Meeting id</div>
              <div className="w-full">Action</div>
            </div>
            {getMeetingLoading ? (
              <div className=" text-center w-full    h-10 p-2 border-b border-gray-200  ">
                Loading...
              </div>
            ) : (
              meetings?.data?.map((item: any) => (
                <div
                  key={item?.id}
                  className="flex w-full flex-1 hover:bg-gray-100 h-10 items-center p-2 border-b border-gray-200 text-black "
                >
                  <div className="w-full">{item?.agenda}</div>
                  <div className="w-full">{item?.duration}</div>
                  <div className="w-full">
                    {item?.start_time &&
                      format(new Date(item?.start_time), "yyyy, MMM dd p")}
                  </div>
                  <div className="w-full">{item?.id}</div>
                  <div className="w-full flex items-center gap-2">
                    <button
                      onClick={() => {
                        setUser_as("host")
                        setMeeting_id(item?.id)
                        getMeetingById({ id: item?.id }).then((res) => {
                          router.push(
                            `/join?meeting_id=${item?.id}&password=${res?.data?.password}&user_email=${res?.data?.host_email}&user_name=${res?.data?.user_name}&joining_as_host=true`
                          )
                        })
                      }}
                      className="rounded-md py-1  px-2 bg-black text-white whitespace-pre"
                    >
                      {joiningMeetingLoading &&
                      meeting_id === item?.id &&
                      user_as === "host"
                        ? "Joining"
                        : "Join as host"}
                    </button>
                    <button
                      onClick={() => {
                        setUser_as("guest")
                        setMeeting_id(item?.id)
                        getMeetingById({ id: item?.id }).then((res) => {
                          router.push(
                            `/join?meeting_id=${item?.id}&password=${res?.data?.password}&user_email=${res?.data?.host_email}&user_name=${res?.data?.user_name}&joining_as_host=false`
                          )
                        })
                      }}
                      className="rounded-md py-1  px-2 bg-black text-white whitespace-pre"
                    >
                      {joiningMeetingLoading &&
                      meeting_id === item?.id &&
                      user_as === "guest"
                        ? "Joining"
                        : "Join as user"}
                    </button>
                    <button
                      onClick={() => {
                        setMeeting_id(item?.id)
                        deleteMeeting({ id: item?.id }).then((res) => {
                          refetch()
                          toast.success("Meeting deleted successfully")
                        })
                      }}
                      className="  rounded-md py-1  px-2 bg-red-400 text-white"
                    >
                      {deleteMeetingLoading && meeting_id === item?.id
                        ? "Loading..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {isopen && (
        <CreateMeetingDialog
          isOpen={isopen}
          isPending={createMeetingLoading}
          onClose={() => setIsopen(false)}
          submit={(data) => {
            createMeeting(data).then(() => {
              setIsopen(false)
              refetch()
              toast.success("Meeting created successfully")
            })
          }}
        />
      )}
    </>
  )
}
