import { Link } from 'react-router-dom'

export default function Home () {
  return (
    <div className="max-w-4xl mx-auto py-6 flex flex-col gap-4">
      <div className="text-center font-bold p-4 text-4xl">unWallet Sandbox</div>
      <div className="p-4 flex flex-col gap-4 items-stretch">
        <Link to="/unwallet" className="flex flex-row border rounded p-4">
          <div className="text-xl font-bold flex-grow">unWallet</div>
          <div className="text-xl">👉</div>
        </Link>
        <Link to="/ethers" className="flex flex-row border rounded p-4">
          <div className="text-xl font-bold flex-grow">ethers</div>
          <div className="text-xl">👉</div>
        </Link>
      </div>
    </div>
  )
}
