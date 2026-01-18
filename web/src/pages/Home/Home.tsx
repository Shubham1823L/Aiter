import styles from './home.module.css'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '@/api/axios'
import { toast } from 'sonner'
import Messages from './Messages'
import { type OrderState } from '@/../../shared/types'
import { AgentOutputTypeSchema } from '@/../../shared/schemas'
import { z } from 'zod/v3'
import { AxiosError } from 'axios'
import type { ApiSuccess } from '@/types/types'
import Navbar from './Navbar'

export type AgentMessage = z.infer<typeof AgentOutputTypeSchema> & {
  author: 'agent',
}
export type UserMessage = {
  author: 'user',
  text: string
}

export type Message = AgentMessage | UserMessage

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [prompt, setPrompt] = useState<UserMessage>({ author: 'user', text: '' })
  const [thinking, setThinking] = useState(false)
  const [orderId, setOrderId] = useState('')

  const [cart, setCart] = useState<{ productId: string, count: number }[]>([])

  useEffect(() => {
    (async () => {
      try {
        await api.post('/chat')
        setOrderId(crypto.randomUUID())
      } catch (error) {
        console.error(error)
      }
    })()

    return () => {
      api.delete('/chat')
    }

  }, [])

  const resetStates = () => {
    setMessages(prev => [...prev, prompt])
    setPrompt({ author: 'user', text: '' })
    setThinking(true)
  }

  const handlePrompt = async () => {
    if (prompt.text.length == 0) return toast.error('Invalid Input', {
      description: 'Input cannot be empty'
    })

    resetStates()

    const orderState: OrderState = { orderId: orderId, action: 'simple_query' }
    try {
      const response = await api.post<ApiSuccess<z.infer<typeof AgentOutputTypeSchema>>>('/chat/stream', {
        prompt: prompt.text,
        orderState
      })

      const { greeting_message_without_items, ui } = response.data.data

      setMessages(prev => [...prev, { author: 'agent', greeting_message_without_items, ui }])
      setThinking(false)

    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message)
      }
      else {
        console.error(error)
      }
      setThinking(false)
    }
  }

  const handleChoiceSubmission = async (productId: string) => {
    setThinking(true)

    setCart(prev => [...prev, { productId, count: 1 }])
    const orderState: OrderState = { action: 'add_item_to_cart', orderId }

    try {
      const response = await api.post<ApiSuccess<z.infer<typeof AgentOutputTypeSchema>>>('/chat/stream', {
        prompt: `I want to add productId ${productId} with count ${1} to cart`,
        orderState
      })

      const { greeting_message_without_items, ui } = response.data.data

      setMessages(prev => [...prev, { author: 'agent', greeting_message_without_items, ui }])
      setThinking(false)

    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message)
      }
      else {
        console.error(error)
      }
      setThinking(false)
    }



  }


  return (
    <>
      <Navbar cart={cart} />
      <div className={styles.wrapper}>
        <div className={styles.chatArea}>

          <Messages handleChoiceSubmission={handleChoiceSubmission} messages={messages} thinking={thinking} />

          <div className={styles.inputWrapper}>
            <input onKeyDown={(e) => {
              if (e.key === "Enter") handlePrompt()
            }} onChange={(e) => setPrompt({ author: 'user', text: e.target.value })} value={prompt.text} className={styles.input} type="text" />
            <button disabled={thinking || prompt.text.length == 0} className={thinking || prompt.text.length == 0 ? 'disabledBtn' : ""} onClick={handlePrompt}>
              <ArrowUp strokeWidth={2.4} />
            </button>

          </div>
          <p className={styles.chatFooterInfo}>Your personal waiter, packed with Artifical Intelligence</p>

        </div>
      </div >
    </>

  )
}

export default Home
