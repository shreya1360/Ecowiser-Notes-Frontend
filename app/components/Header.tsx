import { Leaf } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-green-500 shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-2 sm:mb-0">
          <Leaf className="w-8 h-8 mr-2 text-white" />
          <h1 className="text-2xl font-bold text-white">Ecowiser Notes</h1>
        </div>
        <p className="text-sm text-green-100 italic">
          Empowering sustainable choices
        </p>
      </div>
    </header>
  )
}

