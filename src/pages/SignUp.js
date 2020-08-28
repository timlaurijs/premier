import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";
import { useHistory } from "react-router-dom";
import { signUp } from "../store/user/actions";
import {
  Box,
  Button,
  IconButton,
  makeStyles,
  TextField,
  Grid,
  Paper,
} from "@material-ui/core";

// FireBase
import { storage } from "../Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(10),
    },
  },
  input: {
    display: "none",
    margin: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    alignItems: "center",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  console.log("image: ", image);

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  //THis is how to work with images in Firebase
  const uploadImage = async () => {
    try {
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
    } catch (error) {
      console.log(error.message);
    }
  };

  const formHandler = (event) => {
    event.preventDefault();
    console.log(
      `name: ${name}, description: ${description}, email: ${email}, password: ${password}, image: ${url}`
    );
    dispatch(signUp(name, description, email, password, url));
  };

  return (
    <Box mt={10}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Paper elevation={23} className={classes.paper}>
            <h1> Welcome to GGPush Coding!</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={23} className={classes.paper}>
            <h1>Signup</h1>
            <form onSubmit={formHandler}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                type="text"
                onChange={(event) => setName(event.target.value)}
                placeholder="name"
                name="name"
              ></TextField>

              <TextField
                type="password"
                id="outlined-basic"
                label="Description"
                variant="outlined"
                onChange={(event) => setDescription(event.target.value)}
                placeholder="description"
                name="description"
              ></TextField>

              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="text"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email"
                name="email"
              ></TextField>

              <TextField
                type="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="password"
                name="password"
              ></TextField>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              <Button type="button" onClick={uploadImage}>
                Upload
              </Button>

              <input type="file" onChange={handleChange} />
              <img
                src={url || "http://via.placeholder.com/300"}
                alt="firebaseimage"
                style={{ width: "300px" }}
              />
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
