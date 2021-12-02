import { useMemo, useCallback, useRef, useState, useEffect } from 'react'
import { UnWalletProvider } from 'unwallet-provider'
import classNames from 'classnames'

import { Link } from 'react-router-dom'

export function encodeMessage (message) {
  return `0x${(new TextEncoder()).encode(message).map(v => v.toString(16)).join('')}`
}

export default function UnWallet () {
  const providerRef = useRef(null)
  const [accounts, setAccounts] = useState(null)
  const [currentAccount, setCurrentAccount] = useState('')
  const [message, setMessage] = useState('')
  const [signedMessage, setSignedMessage] = useState(null)
  const encodedMessage = useMemo(() => encodeMessage(message), [message])

  useEffect(() => {
    providerRef.current = new UnWalletProvider()
  }, [])

  const requestAccounts = useCallback(async () => {
    if (!providerRef.current) return

    const provider = providerRef.current

    const accounts = await provider.request({
      method: 'eth_requestAccounts'
    })

    console.info('requested with', {
      method: 'eth_requestAccounts'
    })

    setAccounts(accounts)
  }, [])

  const sign = useCallback(async (currentAccount, encodedMessage) => {
    if (!providerRef.current) return

    const provider = providerRef.current

    const signedMessage = await provider.request({
      method: 'eth_sign',
      params: [
        currentAccount,
        encodedMessage
      ]
    })

    console.info('requested with', {
      method: 'eth_sign',
      params: [
        currentAccount,
        encodedMessage
      ]
    })

    setSignedMessage(signedMessage)
  }, [])

  const handleRequestAccounts = useCallback(event => {
    event.preventDefault()
    requestAccounts()
  }, [])

  const handleSign = useCallback(event => {
    event.preventDefault()
    sign(currentAccount, encodedMessage)
  }, [currentAccount, encodedMessage])

  return (
    <div className="max-w-2xl mx-auto p-4 pb-6 gap-4 flex flex-col">
      <div>
        <Link to="/" className="text-xl p-3">👈</Link>
      </div>
      <div className="text-4xl font-bold">unWallet</div>

      <div className="flex flex-col gap-2">
        <div className="font-bold text-2xl">アカウント</div>
        {accounts === null
          ? (
            <form onSubmit={handleRequestAccounts}>
              <button type="submit" className="bg-blue-500 text-center text-white p-2 rounded w-full">アカウントを取得する</button>
            </form>

            )
          : (
          <select className="bg-gray-200 rounded p-2 w-full" value={currentAccount} onChange={({ target: { value: currentAccount } }) => setCurrentAccount(currentAccount)}>
            {currentAccount === '' && <option value="">アカウントを選択してください</option>}
            {accounts.map(account =>
              <option key={account} value={account}>{account}</option>
            )}
          </select>
            )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-bold text-2xl">署名</div>
        <form onSubmit={handleSign}>
          <textarea
            className="w-full border p-2 mb-2"
            onChange={({ target: { value: message } }) => setMessage(message)} value={message}
            rows={10}
            disabled={!currentAccount} placeholder={currentAccount ? '署名する内容を入力' : 'アカウントを選択してください'} />
          <button type="submit" className={
            classNames(
              'text-center p-2 w-full rounded',
              {
                'bg-blue-500 text-white': currentAccount,
                'bg-gray-200 text-gray-500': !currentAccount
              }
            )

          }>署名する</button>
        </form>
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-bold text-2xl">結果</div>
        {signedMessage && <div className="bg-gray-100 p-2 text-sm break-words">{signedMessage}</div>}
      </div>
    </div>
  )
}
