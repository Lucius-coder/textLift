"use client"
import {SessionProvider} from "next-auth/react"
import React from 'react'

const NextAuthSession = ({children}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default NextAuthSession