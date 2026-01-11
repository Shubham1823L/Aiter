import clsx from 'clsx'
import styles from './home.module.css'
import { ArrowUp } from 'lucide-react'


const Home = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>
        Aiter
      </h1>
      <div className={styles.chatArea}>
        <div className={styles.messages}>
          <div className={clsx(styles.message,styles.myMessage)}>
            Hey, what are the available items over here? can u show me the whole menu?
          </div>
          <div className={styles.message}>
           Hi, Shubham. My name is Aiter . I am an AI, i can do a lot of things including what you just asked, your menu is...
          </div>
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
