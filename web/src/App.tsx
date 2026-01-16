import { useEffect } from 'react'
import './App.css'
import AppRouter from './routes/AppRouter'
import { Toaster } from 'sonner'

function App() {
  useEffect(() => {
    //send request for cookie to backend for conversation id

  }, [])


  return (
    <>
      <AppRouter />
      <Toaster position='top-right' />
    </>
  )
}

export default App
