import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";
import { useHistory } from "react-router-dom";
import { signUp } from "../store/user/actions";
import { Box, Button, IconButton, makeStyles } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

// FireBase
import { storage } from "../Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  console.log("image: ", image);

  console.log("image", image);

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  const formHandler = (event) => {
    event.preventDefault();
    console.log(`name: ${name}, email: ${email}, password: ${password}`);
    dispatch(signUp(name, email, password, image));
  };

  return (
    <Box mt={10} style={{ fontSize: 25 }}>
      <div className="SignUp">
        <form onSubmit={formHandler}>
          <label htmlFor="name"> Name </label>
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="name"
            name="name"
          ></input>
          <label htmlFor="email"> Email </label>
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="email"
            name="email"
          ></input>
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
            name="password"
          ></input>
          <input type="file" onChange={handleChange} />
          <button onClick={handleUpload}>Upload</button>
          <Button type="submit"> Submit</Button>
        </form>
      </div>

      <br />

      <br />
      <img src={url || "http://via.placeholder.com/300"} alt="firebaseimage" />
    </Box>
  );
};

export default SignUp;
