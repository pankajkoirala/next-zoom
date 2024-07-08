import { useMutation, useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

export type Prettify<T> = {
  [key in keyof T]: T[key]
} & unknown

export type ApiErrorType<TError> = Prettify<
  AxiosError<{
    success: boolean
    code: number
    message: string
    errors: TError
  }>
>
interface signatureType {
  signature: string
}
// export type GetSignatureType = ApiResponseType<Prettify<signatureType>>
export type GetSignatureType = any

export const useGetSignature = () => {
  return useMutation<
    GetSignatureType,
    ApiErrorType<null>,
    { meetingNumber: string; role: string }
  >({
    mutationKey: ["signature"],
    mutationFn: (data) => axios.post("/api/signature", data),
  })
}

export const useCreateMeeting = () => {
  return useMutation<GetSignatureType, ApiErrorType<null>>({
    mutationKey: ["create-meeting"],
    mutationFn: (data) => axios.post("/api/create-meeting", data),
  })
}
export const useDeleteMeeting = () => {
  return useMutation<GetSignatureType, ApiErrorType<null>, { id: string }>({
    mutationKey: ["delete-meeting"],
    mutationFn: (data) => axios.delete(`/api/meetings/${data?.id}`),
  })
}
export const useGetMeetings = () => {
  return useQuery<GetSignatureType, ApiErrorType<null>>({
    queryKey: ["meetings"],
    queryFn: (data) => axios.get("/api/meetings", data),
  })
}

export const useGetMeetingById = () => {
  return useMutation<GetSignatureType, ApiErrorType<null>, { id: string }>({
    mutationKey: ["delete-meeting"],
    mutationFn: (data) => axios.post(`/api/meetings/${data?.id}`),
  })
}
