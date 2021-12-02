import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './Home'
import UnWallet from './UnWallet'
import Ethers from './Ethers'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="unwallet" element={<UnWallet />} />
          <Route path="ethers" element={<Ethers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
