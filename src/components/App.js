import React from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Timestamp from "./timestamp";
import Records from "./records";


import db from './config';


const styles = theme => ({
  h1: {
    color: "#e46868"
  },
  subtitle: {
    color: "#e46868"
  },
  timeStampWrap: {
    marginTop: 30
  },
  moreButton:{
    marginTop: 10
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
  handleRecords() {
    this._get();
  }

  _get(){
    db.collection("records").orderBy("timestamp", "desc").limit(5)
      .get()
      .then((querySnapshot) => {
        var records = {}
        var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
        console.log('lastVisible:'+lastVisible)
        querySnapshot.forEach(function(doc) {
            records[doc.id] = { name: doc.data().name, time : doc.data().time }
        });
        this.setState({
          records: records
        })
        
      })
  }

  _moreList(){
    console.log("more! and : " + this.state.limit );
    this.setState({
      limit : this.state.limit + 5
    });
    this._get();
  }

  componentDidMount() {
    this._get();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container maxWidth="md">
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
        </Container>
        <Container maxWidth="md">
          <Records
            records={this.state.records}
            onRecordChange={this.handleRecords}
          />
          <Grid container justify="center">
            <Grid item>
              <Button className={classes.moreButton} onClick={() => this._moreList()}>more</Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(App);
