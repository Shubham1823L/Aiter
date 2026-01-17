export type OrderState = {
    orderId: string,
    action: 'simple_query' | 'add_item_to_cart' | 'remove_item_from_cart' | 'confirm_order'
}
