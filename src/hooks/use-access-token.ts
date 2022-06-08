import { getSalesChannelToken } from "@commercelayer/js-auth"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

type UseAccessTokenOptions = {
  clientId: string
  endpoint: string
  scope?: string
}

export default function useAccessToken({
  clientId,
  endpoint,
  scope = "market:10309",
}: UseAccessTokenOptions) {
  const [accessToken, setAccessToken] = useState("")

  useEffect(() => {
    const getToken = async () => {
      const auth = await getSalesChannelToken({
        clientId,
        endpoint,
        scope, // NOTE: take it from country
      })
      setAccessToken(auth?.accessToken as string) // TODO: add to localStorage
      Cookies.set("clAccessToken", auth?.accessToken as string, {
        expires: auth?.expires,
      })
    }

    const cookieToken = Cookies.get("clAccessToken")

    if (cookieToken == null) {
      getToken()
    } else {
      setAccessToken(cookieToken ?? "")
    }
  }, [clientId, endpoint, scope])

  return accessToken
}
