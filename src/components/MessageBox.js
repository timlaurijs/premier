import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectMessage } from "../store/appState/selectors"

import { clearMessage } from "../store/appState/actions"

export default function MessageBox() {
  const message = useSelector(selectMessage)
  const dispatch = useDispatch()
  const showMessage = message !== null
  if (!showMessage) return null

  console.log(message)

  const messageColor = (type) => {
    if (type === "danger") {
      return "#F7594A"
    } else {
      return "#4D5BF7"
    }
  }
  const variant = message.variant
  return (
    <div
      style={{
        width: "40%",
        marginLeft: "30%",
        marginRight: "30%",
        marginTop: "20%",
        padding: 30,
        fontSize: 30,
        position: "absolute",
        display: "inline",
        zIndex: 9999,
        backgroundColor: messageColor(variant),
      }}
    >
      <p>{message.text}</p>
      {message.dismissable ? (
        <button
          onClick={message.dismissable ? () => dispatch(clearMessage()) : null}
        >
          Clear message
        </button>
      ) : null}
    </div>

    // <Alert
    //   show={showMessage}
    //   variant={message.variant}
    //   class="alert alert-primary"
    //   dismissible={message.dismissable}
    //   onClose={message.dismissable ? () => dispatch(clearMessage()) : null}
    //   style={{
    //     width: "40%",
    //     marginLeft: "30%",
    //     marginRight: "30%",
    //     marginTop: "20%",
    //     padding: 30,
    //     fontSize: 30,
    //     position: "absolute",
    //     display: "inline",
    //     zIndex: 9999,
    //     backgroundColor: "#AD0E00",
    //   }}
    // >
    //   {console.log("what happens?")}
    //   <p style={{ display: "inline" }}>{message.text}</p>
    // </Alert>
  )
}
