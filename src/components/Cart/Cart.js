import { useState, useContext } from "react";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const cartcon = useContext(CartContext);
  const totalAmount = `$${cartcon.totalAmount.toFixed(2)}`;
  const hasItems = cartcon.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartcon.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartcon.addItem({...item, amount:1});
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const submitOrderHandler = (userData) => {
    setIsSubmitting(false)
    fetch('https://react-http-4d47b-default-rtdb.firebaseio.com/orders.json', {
      method:'POST',
      body:JSON.stringify({
        user: userData,
        orderedItems:cartcon.items
      })
    });
    setIsSubmitting(true)
    setDidSubmit(true)
    cartcon.clearCart();
  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartcon.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove = {cartItemRemoveHandler.bind(null, item.id)}
          onAdd = {cartItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const modalContent = <>
  {cartItems}
      <div className={classes.total}>
        <span>TotalAmount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm= {submitOrderHandler}
         onCancel={props.onClose} />
      )}
   {!isCheckout && modalActions}
  </>

  const isSubmittingModalContent = <p>Sending order data</p>
  const didSubmitModalContent =
  <>
  <p>
    Successfully send the order
  </p>

<div className={classes.actions}>
<button className={classes.button} onClick={props.onClose}>
  Close
</button>

</div>
</>
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && isSubmittingModalContent}
      {isSubmitting && didSubmit && didSubmitModalContent}

    </Modal>
  );
};
export default Cart;
