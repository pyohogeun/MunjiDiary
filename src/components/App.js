import React from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Timestamp from "./timestamp";
import Timestampcustom from "./timestampcustom";
import Records from "./records";
import * as firebase from "firebase/app";
import * as firestore from 'firebase/firestore';
// import * as database from "firebase/database";
// require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyBZWci0O-tUABy-jVcWZ1-qxnYUtUm3SBw",
    authDomain: "munzidiary.firebaseapp.com",
    databaseURL: "https://munzidiary.firebaseio.com",
    projectId: "munzidiary",
    storageBucket: "munzidiary.appspot.com",
    messagingSenderId: "832856698052",
    appId: "1:832856698052:web:b6e9633433645c97"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

// db.collection("users").add({
//   first: "Alan",
//   middle: "Mathison",
//   last: "Turing",
//   born: 1912
// })
// .then(function(docRef) {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//   console.error("Error adding document: ", error);
// });


const styles = theme => ({
  h1: {
    color: "#e46868"
  },
  subtitle: {
    color: "#e46868"
  },
  timeStampWrap: {
    marginTop: 30
  }
});
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleRecords = this.handleRecords.bind(this);
    this.state = {
      records: {},
      name: "",
      time: ""
    };
  }
  handleRecords(record) {
    this.setState({
      records: record
    });
  }
//   _get() {
//     fetch(`${databaseURL}/records.json`)
//       .then(res => {
//         if (res.status != 200) {
//           throw new Error(res.statusText);
//         }
//         return res.json();
//       })
//       .then(records => this.setState({ records: records }));
//   }
  _get(){
    db.collection("records")
      .get()
      .then((querySnapshot) => {
        var records = {}
        querySnapshot.forEach(function(doc) {
            records[doc.id] = { name: doc.data().name, time : doc.data().time }
        });
        this.setState({
          records: records
        })
      })
  }

  componentDidMount() {
    this._get();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <Container maxWidth="md">
          <Typography
            variant="h1"
            component="h2"
            gutterBottom
            className={classes.h1}
          >
            Munzi Diary
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.subtitle}
          >
            먼지의 배변일지입니다. 규칙적인 배변활동은 먼지의 건강에 중요합니다.
            아래의 '맛동산'과 '감자' 버튼만 누르면 시간이 기록됩니다.
          </Typography>
          <Grid container justify="center" className={classes.timeStampWrap}>
            <Timestamp
              records={this.state.records}
              onRecordChange={this.handleRecords}
            />
          </Grid>
        </Container> */}
        <Container maxWidth="md">
          {this.state.records ? (
            <Records
              records={this.state.records}
              onRecordChange={this.handleRecords}
            />
          ) : (
            "로딩중"
          )}
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(App);
