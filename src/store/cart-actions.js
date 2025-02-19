import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        title: "Fetching...",
        status: "pending",
        message: "fetching cart data...",
      })
    );

    const fetchData = async () => {
      const response = await fetch(
        "https://react-redux-cart-bbc11-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      });
      dispatch(
        uiActions.showNotification({
          title: "Updated",
          status: "success",
          message: "Cart data is updated",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          title: "Error",
          status: "error",
          message: "Something went wrong",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        title: "Sending...",
        status: "pending",
        message: "Sending cart data...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-redux-cart-bbc11-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Could not send cart data");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          title: "Success!",
          status: "success",
          message: "Cart data is updated!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          title: "Error",
          status: "error",
          message: "Something went wrong",
        })
      );
    }
  };
};
