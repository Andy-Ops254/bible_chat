export const ACCESS_TOKEN_KEY = 'access_token'
export const REFRESH_TOKEN_KEY = 'refresh_token'
export const USER_KEY = 'user'

export function saveAuthTokens({ access_token, refresh_token, user }) {
  if (access_token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access_token)
  }
  if (refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
  }
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function clearAuth() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export async function refreshAccessToken() {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new Error('Refresh token is missing')
  }

  const response = await fetch('/token/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refreshToken}`,
    },
  })

  if (!response.ok) {
    clearAuth()
    throw new Error('Unable to refresh access token')
  }

  const data = await response.json()
  if (!data.access_token) {
    clearAuth()
    throw new Error('Invalid refresh token response')
  }

  setAccessToken(data.access_token)
  return data.access_token
}

export async function fetchWithAuth(url, options = {}) {
  const accessToken = getAccessToken()
  const mergedOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  }

  let response = await fetch(url, mergedOptions)
  if (response.status === 401) {
    try {
      const newToken = await refreshAccessToken()
      const retryOptions = {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${newToken}`,
        },
      }
      response = await fetch(url, retryOptions)
    } catch (err) {
      throw err
    }
  }

  return response
}
