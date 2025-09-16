import React from 'react'
import { createContext } from 'react-router-dom'

export const CountContext = createContext({
  count: 0,
  setCount: () => {}
});
