import { useCallback } from 'react'

import { useRequestAccunts } from '../../hooks/unwallet'

export default function LoginForm ({ onLogined }) {
  const requestAccounts = useRequestAccunts()

  const handleSubmit = useCallback(async () => {
    const accounts = await requestAccounts()
    onLogined(accounts)
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className="bg-blue-500 text-white">ログイン</button>
    </form>
  )
}
