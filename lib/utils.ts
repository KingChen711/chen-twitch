import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import queryString from 'query-string'
import stc from 'string-to-color'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type UrlQueryParams = {
  params: string
  key: string
  value: string | null
  url?: string
}

export function formUrlQuery({ params, key, value, url }: UrlQueryParams) {
  const query = queryString.parse(params)

  query[key] = value

  return queryString.stringifyUrl(
    {
      url: url || window.location.pathname,
      query
    },
    { skipNull: true }
  )
}

export const stringToColor = (str: string) => {
  return stc(str)
}
