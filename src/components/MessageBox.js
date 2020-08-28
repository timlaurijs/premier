import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectMessage } from "../store/appState/selectors"
import { Alert } from "react-bootstrap"
// import { Alert } from "@material-ui/lab"

import { clearMessage } from "../store/appState/actions"

export default function MessageBox() {
  const message = useSelector(selectMessage)
  const dispatch = useDispatch()
  const showMessage = message !== null
  if (!showMessage) return null

  console.log(message)
  return (
    <Alert
      show={showMessage}
      variant={message.variant}
      class="alert alert-primary"
      dismissible={message.dismissable}
      onClose={message.dismissable ? () => dispatch(clearMessage()) : null}
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
        backgroundColor: "#AD0E00",
      }}
    >
      {console.log("what happens?")}
      <p style={{ display: "inline" }}>{message.text}</p>
    </Alert>
    // <Alert
    //   show={showMessage}
    //   variant={message.variant}
    //   dismissible={message.dismissable}
    //   onClose={message.dismissable ? () => dispatch(clearMessage()) : null}
    //   style={{
    //     width: 100,
    //     marginLeft: "40%",
    //     marginRight: "40%",
    //     marginTop: "20%",
    //     fontSize: 50,
    //     display: "inline",
    //   }}
    // >
    //   {console.log("what happens?")}
    //   {message.text}
    // </Alert>
  )
}
