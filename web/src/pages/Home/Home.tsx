import clsx from 'clsx'
import styles from './home.module.css'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import decode from '@/utils/decoder'
import api from '@/api/axios'
import Markdown from 'react-markdown'

type AgentMessage = {
  author: 'agent',
  text: string[]
}
type UserMessage = {
  author: 'user',
  text: string
}

type Message = AgentMessage | UserMessage

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState<AgentMessage>({ author: 'agent', text: [] })
  const [prompt, setPrompt] = useState<UserMessage>({ author: 'user', text: '' })
  const [thinking, setThinking] = useState(false)


  useEffect(() => {
    (async () => {
      try {
        await api.post('/chat')
      } catch (error) {
        console.error(error)
      }
    })()

    return () => {
      api.delete('/chat')
    }

  }, [])



  const handlePrompt = async () => {
    const controller = new AbortController()
    const signal = controller.signal
    setMessages(prev => [...prev, prompt])
    setPrompt({ author: 'user', text: '' })
    setThinking(true)
    setMessage({ author: 'agent', text: [] })


    fetch(`/api/chat/stream`, {
      method: 'POST',
      body: JSON.stringify({ prompt: prompt.text }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      signal
    }).then(async (res) => {
      setThinking(false)

      if (!res.ok) return console.error("ERROR", res.status)

      const reader = res.body?.getReader()
      if (!reader) return console.error("ERROR")

      let isDone = false
      while (!isDone) {
        const { value, done } = await reader.read()
        isDone = done

        if (!value) continue

        setMessage(prev => ({ ...prev, text: [...prev.text, decode(value)] }))
      }

      setMessage(msg => {
        setMessages(prev => [...prev, msg])
        return { author: 'agent', text: [] }
      })

    }).catch(err => {
      setThinking(false)
      console.error(err)
    })





  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>
        Aiter
      </h1>
      <div className={styles.chatArea}>
        <div className={styles.messages}>
          {messages.map((msg, i) => {

            return (
              <div key={i} className={clsx(styles.message, msg.author == 'user' && styles.myMessage)}>
                {msg.author === 'agent' ? <Markdown>
                  {msg.text.join('')}
                </Markdown> : msg.text}

              </div>
            )

          })}
          {
            message.text.length != 0 && <div className={styles.message}>
              <Markdown>{message.text.join('')}</Markdown>
            </div>
          }
          {
            thinking && message.text.length == 0 && <div className={styles.message}>Thinking....</div>
          }
        </div>
        <div className={styles.inputWrapper}>
          <input onKeyDown={(e) => {
            if (e.key === "Enter") handlePrompt()
          }} onChange={(e) => setPrompt({ author: 'user', text: e.target.value })} value={prompt.text} className={styles.input} type="text" />
          <button disabled={thinking} className={thinking ? 'disabledBtn' : ""} onClick={handlePrompt}>
            <ArrowUp strokeWidth={1.8} />
          </button>

        </div>
        <p className={styles.chatFooterInfo}>Your personal waiter, packed with Artifical Intelligence</p>

      </div>
    </div >
  )
}

export default Home
