import { useState } from 'react'
import './App.css'
import Expense from './components/ExpenseT'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Expense />
    </>
  )
}

export default App
