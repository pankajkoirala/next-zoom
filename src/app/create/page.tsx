"use client"
import { toast } from "sonner"
import {
  useCreateMeeting,
  useDeleteMeeting,
  useGetMeetingById,
  useGetMeetings,
} from "../_hooks"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Home() {
  const [meeting_id, setMeeting_id] = useState()
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
    <div className="flex min-h-screen bg-white justify-center items-center p-24">
      <div className="flex flex-col gap-5 items-center">
        <button
          onClick={() => {
            createMeeting().then(() => {
              refetch()
              toast.success("Meeting created successfully")
            })
          }}
          className="h-10 w-[200px] rounded-md bg-black text-white"
        >
          {createMeetingLoading ? "Loading..." : "Create meeting"}
        </button>
        <div className="rounded-lg bg-[e5e5e5] shadow-md max-h-[500px] overflow-y-auto w-[500px]  border border-gray-200">
          <div className="flex  bg-blue-400 h-10 items-center p-2 rounded-t-lg text-black font-semibold">
            <div className="w-1/2">Agenda</div>
            <div className="w-1/2"></div>
          </div>
          {meetings?.data?.map((item: any) => (
            <>
              {getMeetingLoading ? (
                <div className="flex  hover:bg-gray-100 h-10 items-center p-2 border-b border-gray-200 text-black ">
                  Loading...
                </div>
              ) : (
                <div
                  key={item?.id}
                  className="flex  hover:bg-gray-100 h-10 items-center p-2 border-b border-gray-200 text-black "
                >
                  <div className="w-1/2">{item?.agenda}</div>
                  <div className="w-1/2 flex items-center gap-2 justify-end">
                    <button
                      onClick={() => {
                        setMeeting_id(item?.id)
                        getMeetingById({ id: item?.id }).then((res) => {
                          router.push(
                            `/join?meeting_id=${item?.id}&password=${res?.data?.password}`
                          )
                        })
                      }}
                      className="rounded-md p-1 bg-black text-white"
                    >
                      {joiningMeetingLoading && meeting_id ? "Joining" : "Join"}
                    </button>
                    <button
                      onClick={() => {
                        setMeeting_id(item?.id)
                        deleteMeeting({ id: item?.id }).then((res) => {
                          refetch()
                          toast.success("Meeting deleted successfully")
                        })
                      }}
                      className="  rounded-md p-1 bg-red-400 text-white"
                    >
                      {deleteMeetingLoading && meeting_id === item?.id
                        ? "Loading..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
