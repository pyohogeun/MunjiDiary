import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import RefreshIcon from "@material-ui/icons/Refresh";
import CreateIcon from "@material-ui/icons/Create";
import Timestampcustom from "./timestampcustom";
import Collapse from "@material-ui/core/Collapse";

const styles = theme => ({
  realTime: {
    wordBreak: "keep-all"
  },
  timestampWrap: {
    width: "100%"
  }
});

const databaseURL = "https://munzidiary.firebaseio.com";

class Timestamp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowTime: "",
      customTimestampToggle: false
    };
    this._getTime = this._getTime.bind(this);
    this._setTime = this._setTime.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTimestampToggle = this.handleTimestampToggle.bind(this);
  }

  _getTime() {
    const n = new Date().toLocaleString();
    //지금시간 표시
    this.setState({
      nowTime: n
    });
  }
  _setTime(date) {
    const n = date.toLocaleString();
    this.setState({
      nowTime: n
    });
  }

  handleTimeInterval() {
    setInterval(this._getTime, 1000);
  }

  handleChange(records) {
    this.props.onRecordChange(records);
  }

  _post(record) {
    return fetch(`${databaseURL}/records.json`, {
      method: "POST",
      body: JSON.stringify(record)
    })
      .then(res => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        let nextState = this.props.records;

        nextState[data.name] = record;
        // this.setState({ records: nextState });
        this.handleChange(nextState);
      });
  }

  handleSubmitPoop = date => {
    const record = {
      name: "맛동산",
      time: ""
    };
    date ? (record.time = date) : (record.time = this.state.nowTime);
    this._post(record);
  };

  handleSubmitPee = date => {
    console.log(date);
    const record = {
      name: "감자",
      time: ""
    };
    date ? (record.time = date) : (record.time = this.state.nowTime);
    this._post(record);
  };

  handleTimestampToggle = () => {
    this.setState({
      customTimestampToggle: !this.state.customTimestampToggle
    });
    const nn = this.state.customTimestampToggle;
  };

  componentDidMount() {
    this.handleTimeInterval();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.timestampWrap}>
        <Grid container justify="center">
          <Typography variant="h3" gutterBottom className={classes.realTime}>
            {this.state.nowTime}
          </Typography>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12}>
            <ButtonGroup
              size="large"
              fullWidth={true}
              color="primary"
              variant="contained"
              aria-label="contained button group"
              className={classes.ButtonGroup}
            >
              <Button
                className={classes.button}
                onClick={this.handleSubmitPoop}
              >
                맛동산
              </Button>
              <Button className={classes.button} onClick={this.handleSubmitPee}>
                감자
              </Button>
              <Button
                className={classes.button}
                onClick={this.handleTimestampToggle}
              >
                <CreateIcon></CreateIcon>
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            {/* {this.state.customTimestampToggle ? (
              <Timestampcustom
                onTimestampPee={this.handleSubmitPee}
                onTimestampPoop={this.handleSubmitPoop}
              />
            ) : null} */}
            <Collapse in={this.state.customTimestampToggle}>
              <Timestampcustom
                onTimestampPee={this.handleSubmitPee}
                onTimestampPoop={this.handleSubmitPoop}
              />
            </Collapse>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Timestamp);
