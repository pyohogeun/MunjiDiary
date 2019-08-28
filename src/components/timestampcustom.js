import "date-fns";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import SaveIcon from "@material-ui/icons/Save";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import koLocale from "date-fns/locale/ko";

const styles = () => ({
  root: {
    width: "100%",
    textAlign: "center",
    marginTop: 20,
    padding: 10
  },
  datepickerWrap: {
    padding: 10
  },
  datepicker: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }
});

class MaterialUIPickers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      setSelectedDate: new Date()
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleSubmitPee = () => {
    let date = this.state.selectedDate.toLocaleString();
    this.props.onTimestampPee(date);
  };

  handleSubmitPoop = () => {
    let date = this.state.selectedDate.toLocaleString();
    this.props.onTimestampPoop(date);
  };

  handleDateChange(date) {
    this.setState({
      selectedDate: date
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
          <Grid container justify="space-around">
            <Paper className={classes.root}>
              <Grid container>
                <Grid item xs={12} md={8} className={classes.datepickerWrap}>
                  <div className={classes.datepicker}>
                    <DateTimePicker
                      value={this.state.selectedDate}
                      onChange={this.handleDateChange}
                    />
                    <DateRangeIcon className={classes.icon} />
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <ButtonGroup
                    size="large"
                    fullWidth={true}
                    color="primary"
                    variant="contained"
                    aria-label="contained button group"
                    className={classes.ButtonGroup}
                  >
                    <Button
                      variant="outlined"
                      className={classes.button}
                      onClick={this.handleSubmitPoop}
                    >
                      맛동산
                    </Button>
                    <Button
                      variant="outlined"
                      className={classes.button}
                      onClick={this.handleSubmitPee}
                    >
                      감자
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

export default withStyles(styles)(MaterialUIPickers);
