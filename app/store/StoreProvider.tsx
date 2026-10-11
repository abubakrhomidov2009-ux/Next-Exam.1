"use client"

import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './store'

const StoreProvider = ({children}:any) => {
    const [store] = useState(makeStore)

  return (
    <>
        <Provider store={store}>{children}</Provider>
    </>
  )
}

export default StoreProvider