'use client'

import Link from 'next/link'
import { useState } from 'react'
import { NASA_APIS } from '@/lib/nasa-api'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-400">
              Nakshatra
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {NASA_APIS.slice(0, 8).map((api) => (
              <Link
                key={api.name}
                href={api.href}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors"
                title={api.fullName}
              >
                {api.name}
              </Link>
            ))}
            
            <div className="relative group">
              <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors">
                More APIs
              </button>
              <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2 max-h-96 overflow-y-auto">
                  {NASA_APIS.slice(8).map((api) => (
                    <Link
                      key={api.name}
                      href={api.href}
                      className="block px-4 py-2 text-sm hover:bg-slate-700 transition-colors"
                      title={api.fullName}
                    >
                      <div className="font-medium">{api.name}</div>
                      <div className="text-xs text-slate-300 truncate">{api.fullName}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-slate-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
            {NASA_APIS.map((api) => (
              <Link
                key={api.name}
                href={api.href}
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="font-medium">{api.name}</div>
                <div className="text-xs text-slate-300">{api.fullName}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}