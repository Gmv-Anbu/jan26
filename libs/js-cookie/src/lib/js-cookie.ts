import cookie from 'js-cookie'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let process: any
export const setCookie = (key: string, value, time?: number | Date) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: time || 1,
      path: '/',
    })
  }
}

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
      path: '/',
    })
  }
}

export const getCookie = (key, req?: any) => {
  // let cookie = ''
  // if(process.browser) {
  //     cookie = await getCookieFromBrowser(key)
  // } else {
  //     cookie = await getCookieFromServer(key, req)
  // }
  // return JSON.parse(cookie)
  return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req)
}

const getCookieFromBrowser = (key) => {
  if (cookie.get(key) && cookie.get(key)?.includes('{')) {
    return JSON.parse(cookie.get(key) ?? '')
  }
  return cookie.get(key)
}

const getCookieFromServer = (key, req) => {
  if (!req?.headers?.cookie) {
    return undefined
  }
  const rawCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith(`${key}=`))
  if (!rawCookie) {
    return undefined
  }
  if (rawCookie.split('=')[1].includes('{')) {
    const formatttedCookie = JSON.parse(decodeURIComponent(rawCookie.split('=')[1]))
    if (formatttedCookie?.token) {
      return formatttedCookie
    }
  } else {
    return rawCookie.split('=')[1]
  }
}
