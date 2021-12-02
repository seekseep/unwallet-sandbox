import { useCallback, useEffect, useRef, useState } from 'react'
import { UnWalletProvider } from 'unwallet-provider'

function encodeMessage (message) {
  return `0x${(new TextEncoder()).encode(message).map(v => v.toString(16))}`
}

export default function App ({ a }) {
  const providerRef = useRef(null)
  const [accounts, setAccounts] = useState(null)
  const [currentAccount, setCurrentAccount] = useState('')
  const [message, setMessage] = useState('')
  const [signedMessage, setSignedMessage] = useState(null)

  useEffect(() => {
    providerRef.current = new UnWalletProvider()
  }, [])

  const request = useCallback(async () => {
    if (!providerRef.current) return

    const provider = providerRef.current

    const accounts = await provider.request({
      method: 'eth_requestAccounts'
    })

    setAccounts(accounts)
  }, [])

  const sign = useCallback(async () => {
    const provider = providerRef.current

    const encodedMessage = encodeMessage(message)

    const body = {
      method: 'eth_sign',
      params: [
        currentAccount,
        encodedMessage
      ]
    }

    const signedMessage = await provider.request(body)

    setSignedMessage(signedMessage)
  }, [currentAccount])

  return (
    <div className="p-4">
      <div className="text-center text-4xl font-bold p-4 mb-4">unWallet Sandbox</div>

      {accounts === null && (
        <button className="p-2 w-full bg-blue-500 text-white rounded" onClick={request}>ログイン</button>
      )}
      {accounts !== null && (
        <>
          <div className="mb-4">
            <select className="bg-gray-100 w-full p-2 mb-4" value={currentAccount} onChange={({ target: { value: currentAccunt } }) => setCurrentAccount(currentAccunt)}>
              {!currentAccount && <option value="">アカウントを選択してください</option>}
              {accounts.map(account =>
                <option key={account} value={account}>{account}</option>
              )}
            </select>
            <textarea
              className="w-full border p-2 mb-2"
              onChange={({ target: { value: message } }) => setMessage(message)} value={message}
              rows={10}
              disabled={!currentAccount} placeholder={currentAccount ? '署名する内容を入力' : 'アカウントを選択してください'} />
            <button onClick={sign} className="bg-blue-500 text-center text-white p-2 w-full rounded">署名する</button>
          </div>
          {signedMessage && (
            <>
              <div className="font-bold mb-4">署名結果</div>
              <div className="bg-gray-100 p-2 text-sm break-words">{signedMessage}</div>
            </>
          )}
        </>
      )}

    </div>
  )
}
