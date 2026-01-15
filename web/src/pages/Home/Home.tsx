import clsx from 'clsx'
import styles from './home.module.css'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import decode from '@/utils/decoder'
import api from '@/api/axios'


const Home = () => {
  const [message, setMessage] = useState<string[]>([])
  const [prompt, setPrompt] = useState('')
  const [conversationId, setConversationId] = useState('')
  const [thinking, setThinking] = useState(false)
  useEffect(() => {
    (async () => {
      try {
        const res = await api.post('/chat')
        setConversationId(res.data.data.conversationId)
      } catch (error) {
        console.error(error)
      }


    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handlePrompt = async () => {
    const controller = new AbortController()
    const signal = controller.signal
    setPrompt('')
    setThinking(true)
    setMessage([])
    fetch(`/api/chat/stream/${conversationId}`, {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: {
        'Content-Type': 'application/json'
      },
      signal
    }).then(async (res) => {
      if (!res.ok) return console.error("ERROR", res.status)

      const reader = res.body?.getReader()
      if (!reader) return console.error("ERROR")

      let isDone = false
      setThinking(false)
      while (!isDone) {
        const { value, done } = await reader.read()
        isDone = done

        if (!value) continue
        setMessage(prev => [...prev, decode(value)])
      };
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
          <div className={clsx(styles.message, styles.myMessage)}>
            Hey, what are the available items over here? can u show me the whole menu?
          </div>
          {message.length != 0 && <div className={styles.message}>
            {message.map(text => text)}
          </div>}
          {
            thinking && message.length == 0 && <div className={styles.message}>
              Thinking
            </div>
          }

        </div>
        <div className={styles.inputWrapper}>
          <input onChange={(e) => setPrompt(e.target.value)} value={prompt} className={styles.input} type="text" />
          <button disabled={!conversationId || thinking} onClick={handlePrompt}>
            <ArrowUp strokeWidth={1.8} />
          </button>

        </div>
        <p className={styles.chatFooterInfo}>Your personal waiter, packed with Artifical Intelligence</p>

      </div>
    </div >
  )
}

export default Home
