'use client'

import { ReactNode, useEffect } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // You can optionally pass your app ID here
    MiniKit.install()
  }, [])

  return <>{children}</>
} 