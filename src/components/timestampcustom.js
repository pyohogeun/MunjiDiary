import 'date-fns';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker
} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import koLocale from "date-fns/locale/ko";


const styles = () => ({
  root: {
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
    padding: 10,
  }
});

class MaterialUIPickers extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      selectedDate: new Date(),
      setSelectedDate: new Date()
    }
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleSubmitPee = () => {
    let date = this.state.selectedDate.toLocaleString();;
    this.props.onTimestampPee(date)
  }

  handleDateChange(date) {
    this.setState({
      selectedDate: date 
    });
  }

  render() {
    const { classes } = this.props;

    return(
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
          <Grid container justify="space-around">
            <Paper className={classes.root}>
              <DateTimePicker value={this.state.selectedDate} onChange={this.handleDateChange} />
              <Button>
                맛동산 <SaveIcon></SaveIcon>
              </Button>
              <Button onClick={this.handleSubmitPee}>
                감자 <SaveIcon></SaveIcon>
              </Button>
            </Paper>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    )
  }
}

export default withStyles(styles)(MaterialUIPickers);