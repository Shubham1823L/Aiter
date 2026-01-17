import clsx from 'clsx'
import styles from './home.module.css'
import Markdown from 'react-markdown'
import type { Message } from './Home'
import { useEffect, useRef } from 'react'


type MessagesProps = {
    messages: Message[],
    thinking: boolean,
}


const Messages = ({ messages, thinking }: MessagesProps) => {
    const ref = useRef<HTMLDivElement>(null)


    useEffect(() => {
        if (!ref.current) return
        ref.current.scrollTop = ref.current.scrollHeight

    }, [messages])



    return (
        <div ref={ref} className={styles.messages}>
            {messages.map((msg, i, arr) => {
                const isActive = arr.length - 1 === i
                return (
                    <div key={i} className={clsx(styles.message, msg.author == 'user' && styles.myMessage)}>
                        {
                            msg.author === 'agent' ?

                                <>
                                    <Markdown>
                                        {msg.greeting_message_without_items}
                                    </Markdown>
                                    {
                                        msg.ui && <form className={styles.form}>
                                            {msg.ui.options.map(option => {

                                                return (
                                                    <div className={styles.formInputWrapper}>
                                                        <label className={styles.formLabel} htmlFor={option.product_id + i}>
                                                            <span>{option.product_name}</span><span>{option.product_price}</span>
                                                        </label>
                                                        <input disabled={!isActive || thinking} className={styles.formInput} id={option.product_id + i} type="checkbox" />
                                                    </div>
                                                )

                                            })}
                                        </form>
                                    }
                                </>


                                : <Markdown>{msg.text}</Markdown>
                        }

                    </div>
                )

            })}
            {
                thinking && <div className={styles.message}>Thinking....</div>
            }
        </div>
    )
}

export default Messages
