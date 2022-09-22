import { useContext } from "react";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
const Cart = (props) => {
  const cartcon = useContext(CartContext);
  const totalAmount = `$${cartcon.totalAmount.toFixed(2)}`;
  const hasItems = cartcon.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartcon.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartcon.addItem({...item, amount:1});
  };
  const cartItems = (
    <ul>
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

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>TotalAmount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
