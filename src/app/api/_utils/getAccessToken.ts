import axios from "axios"

const client_id = process.env.NEXT_ZOOM_SERVER_TO_SERVER_CLIENT_ID
const client_secret = process.env.NEXT_ZOOM_SERVER_TO_SERVER_SECRET_ID
const account_id = process.env.NEXT_ZOOM_SERVER_TO_SERVER_ACCOUNT_ID
export const getAccessTokenFn = async () => {
  // Base64 encode the credentials
  const basicToken = Buffer.from(
    `${client_id}:${client_secret}`,
    "utf8"
  ).toString("base64")
  const response = await axios.post(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${account_id}`,
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
