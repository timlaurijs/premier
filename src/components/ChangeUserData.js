import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// FireBase
import { storage } from "../Firebase"

// Store items
import { updateUserData, getUserWithStoredToken } from "../store/user/actions"

//Material ui
import { Button } from "@material-ui/core"

const ChangeUserData = (props) => {
  const dispatch = useDispatch()
  const userId = props.user.id
  const userToken = props.user.token
  const userName = props.user.name
  const userEmail = props.user.email
  const userDescription = props.user.description
  const userImageUrl = props.user.imageUrl

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const [progress, setProgress] = useState(0)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  //This is how to work with images in Firebase
  const uploadImage = async () => {
    try {
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgress(progress)
        },
        (error) => {
          console.log(error)
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url)
            })
        }
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  const formHandler = (event) => {
    event.preventDefault()
    // console.log(
    //   `name: ${name}, description: ${description}, email: ${email}, password: ${password}, image: ${url}`
    // )
    dispatch(updateUserData(userId, userToken, name, description, email, url))
  }

  useEffect(() => {
    // dispatch(getUserWithStoredToken())
  }, [userName])

  return (
    <form onSubmit={formHandler}>
      <label htmlFor="name"> Name </label>
      <input
        type="text"
        onChange={(event) => setName(event.target.value)}
        placeholder={userName}
        name="name"
        required
      ></input>
      <label htmlFor="description"> Description </label>
      <input
        type="text"
        onChange={(event) => setDescription(event.target.value)}
        placeholder={userDescription}
        name="description"
        required
      ></input>
      <label htmlFor="email"> Email </label>
      <input
        type="text"
        onChange={(event) => setEmail(event.target.value)}
        placeholder={userEmail}
        name="email"
        required
      ></input>
      <input type="file" onChange={handleChange} required />
      <img
        src={!url ? userImageUrl : url || "http://via.placeholder.com/300"}
        alt="firebaseimage"
        style={{ width: "300px" }}
      />
      <button type="button" onClick={uploadImage}>
        Upload
      </button>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  )
}
export default ChangeUserData
