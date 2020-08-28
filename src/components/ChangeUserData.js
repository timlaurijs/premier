import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// FireBase
import { storage } from "../Firebase";

// Store items
import { updateUserData, getUserWithStoredToken } from "../store/user/actions";

//Material ui
import { Button, Box, Grid, TextField, Paper, Avatar } from "@material-ui/core";
import { useStyles } from "../pages/Homepage/styles";

const ChangeUserData = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const userId = props.user.id;
  const userToken = props.user.token;
  const userName = props.user.name;
  const userEmail = props.user.email;
  const userDescription = props.user.description;
  const userImageUrl = props.user.imageUrl;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //This is how to work with images in Firebase
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
    // console.log(
    //   `name: ${name}, description: ${description}, email: ${email}, password: ${password}, image: ${url}`
    // )
    dispatch(updateUserData(userId, userToken, name, description, email, url));
  };

  useEffect(() => {
    // dispatch(getUserWithStoredToken())
  }, [userName]);

  return (
    <form onSubmit={formHandler}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Paper elevation={23} className={classes.paper}>
            <TextField
              id="outlined-basic"
              label={userName}
              variant="outlined"
              onChange={(event) => setName(event.target.value)}
              name="name"
              required
            ></TextField>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper elevation={23} className={classes.paper}>
            <TextField
              id="outlined-basic"
              label={userDescription}
              variant="outlined"
              type="text"
              onChange={(event) => setDescription(event.target.value)}
              name="description"
              required
            ></TextField>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper elevation={23} className={classes.paper}>
            <TextField
              id="outlined-basic"
              label={userEmail}
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
              placeholder={userEmail}
              name="email"
              required
            ></TextField>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={23} className={classes.paper}>
            <Avatar
              style={{ padding: 1, height: 300, width: 300 }}
              src={
                !url ? userImageUrl : url || "http://via.placeholder.com/300"
              }
              alt="firebaseimage"
            />
            <Paper elevation={23} className={classes.paper}>
              <label htmlFor="email"> new avatar </label>
              <input type="file" onChange={handleChange} required />
              <Button variant="contained" color="primary" onClick={uploadImage}>
                Upload
              </Button>
            </Paper>

            <Paper elevation={23} className={classes.paper}>
              <Button variant="contained" color="primary" type="submit">
                Sava changes
              </Button>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};
export default ChangeUserData;
