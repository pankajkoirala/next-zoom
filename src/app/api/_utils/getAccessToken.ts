import axios from "axios"

const client_id = "qDflymgPSCSuGSlJ_bg5Bw"
const client_secret = "U6dB0icEBRlsqrByoOgM1D7XvlX3wYsz"
export const getAccessTokenFn = async () => {
  // Base64 encode the credentials
  const basicToken = Buffer.from(
    `${client_id}:${client_secret}`,
    "utf8"
  ).toString("base64")
  const response = await axios.post(
    "https://zoom.us/oauth/token?grant_type=account_credentials&account_id=SiSCb5ejTcet0gbkoTq4kA",
    undefined,
    {
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
  return response?.data?.access_token
}
