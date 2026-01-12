import clsx from 'clsx'
import styles from './home.module.css'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

type Message = {
  text: string
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([{ text: 'a' }, { text: 'a' }, { text: 'a' }, { text: 'a' }, { text: 'a' }, { text: 'a' }, { text: 'a' }, { text: 'a' }, { text: 'a' }, { text: 'a' }, { text: 'a' }])

  useEffect(() => {
    const eventSource = new EventSource('/api/chat/stream')
    console.log('connected')
    eventSource.onmessage = (e) => {
      const newMessage = { text: e.data }
      setMessages(prev => [...prev, newMessage])
    }

    eventSource.onerror = (e) => {
      console.error(e)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

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
          {
            messages.map((msg, i) => {
              return (
                <div key={i} className={clsx(styles.message)}>
                  {msg.text}
                </div>
              )
            })
          }
        </div>
        <div className={styles.inputWrapper}>
          <input className={styles.input} type="text" />
          <ArrowUp strokeWidth={1.8} role='button' />
        </div>
        <p className={styles.chatFooterInfo}>Your personal waiter, packed with Artifical Intelligence</p>

      </div>
    </div>
  )
}

export default Home
