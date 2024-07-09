import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/dialog"
import { ChangeEvent, useState } from "react"

export interface MeetingData {
  agenda: string
  password: string
  start_time: string
  duration: string
}
export function CreateMeetingDialog({
  onClose,
  submit,
  isOpen,
  isPending,
}: {
  onClose: () => void
  submit: (data: any) => void
  isOpen: boolean
  isPending: boolean
}) {
  const [data, setData] = useState<MeetingData>({
    agenda: "",
    password: "12345",
    start_time: "",
    duration: "60",
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-black">Create zoom meeting</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col  gap-1">
            <div className="text-sm">Agenda</div>
            <input
              onChange={handleChange}
              name="agenda"
              id="agenda"
              value={data?.agenda}
              className="border border-gray-200 w-full rounded-md p-2 text-base"
            />
          </div>
          <div className="flex flex-col  gap-1">
            <div className="text-sm">Password</div>
            <input
              onChange={handleChange}
              name="password"
              id="password"
              value={data?.password}
              className="border border-gray-200 w-full rounded-md p-2 text-base"
            />
          </div>
          <div className="flex flex-col  gap-1">
            <div className="text-sm">Date time</div>
            <input
              onChange={handleChange}
              name="start_time"
              id="start_time"
              type="datetime-local"
              value={data?.start_time}
              min={new Date().toISOString().split("T")[0] + "T00:00"}
              className="border border-gray-200 w-full rounded-md p-2 text-base"
            />
          </div>
          <div className="flex flex-col  gap-1">
            <div className="text-sm">Duration</div>
            <input
              onChange={handleChange}
              name="duration"
              id="duration"
              value={data?.duration}
              className="border border-gray-200 w-full rounded-md p-2 text-base"
            />
          </div>
        </div>
        <DialogFooter>
          <div className="w-1/2 flex items-center gap-2 justify-end">
            <button
              onClick={onClose}
              className="  rounded-md py-1  px-2 bg-red-400 text-white"
            >
              Cancel
            </button>
            <button
              disabled={
                !data?.agenda ||
                !data?.start_time ||
                !data?.duration ||
                !data?.password
              }
              onClick={() =>
                submit({
                  ...data,
                  start_time: new Date(data?.start_time).toISOString(),
                })
              }
              className="rounded-md py-1  px-2 bg-black text-white disabled:cursor-not-allowed"
            >
              {isPending ? "Loading..." : "Create"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
