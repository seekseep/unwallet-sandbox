import { createContext, useContext } from 'react'

const Context = createContext()

export const Provider = (props) => {
  const providerRef = useRef(null)
  useEffect(() => {
    providerRef.current = new UnWalletProvider()
  }, [])

  return <Context.Provider value={providerRef} {...props} />
}

export const useUnwalletProviderRef = () => {
  const providerRef = useContext(Context)
  return providerRef
}
