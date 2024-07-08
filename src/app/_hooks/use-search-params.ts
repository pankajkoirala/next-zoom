"use client"
import {
  usePathname,
  useRouter,
  useSearchParams as nextSearchParams,
} from "next/navigation"

export function useSearchParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = nextSearchParams()

  const urlSearchParams: URLSearchParams = new URLSearchParams(
    Array.from(searchParams.entries())
  )

  function setQueryParams(params: Record<string, unknown> | URLSearchParams) {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value))
    })

    const search = urlSearchParams.toString()
    const query = search ? `?${search}` : ""

    router.push(`${pathname}${query}`)
  }
  function removeAllSearchParams() {
    router.push(`${pathname}`)
  }
  return {
    searchParams: urlSearchParams,
    setSearchParams: setQueryParams,
    removeAllSearchParams,
  }
}
