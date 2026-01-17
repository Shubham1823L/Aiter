import { LucideShoppingBasket } from 'lucide-react'
import styles from './home.module.css'

type NavbarProps = {
    cart: { productId: string, count: number }[]
}



const Navbar = ({ cart }: NavbarProps) => {

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.heading}>
                Aiter
            </h1>
            <button className={styles.cart}>
                <LucideShoppingBasket size={32} />
                {cart.length != 0 && <span>{cart.length}</span>}
            </button>
        </nav>
    )
}

export default Navbar
