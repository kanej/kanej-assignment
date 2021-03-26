export type ApiKey = {
  id: number
  user_id: number
  token: string
  enabled: boolean
}

export type RequestLog = {
  id: number
  api_key_id: number
  url: string
  created_at: string
}
