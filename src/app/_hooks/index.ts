import { useMutation } from "@tanstack/react-query"
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
