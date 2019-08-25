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


const styles = (theme) => ({
  root: {
    backgroundColor: 'red',
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

  handleDateChange(date) {
    this.setState({
      setSelectedDate: date 
    });
  }

  render() {
    const { classes } = this.props;

    return(
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
          <Grid container justify="space-around">
            <Paper>
              <DateTimePicker value={this.state.selectedDate} onChange={this.state.handleDateChange} />
              <Button>
                <SaveIcon></SaveIcon>
              </Button>
            </Paper>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    )
  }
}

export default withStyles(styles)(MaterialUIPickers);
// export default function MaterialUIPickers() {
//   const [selectedDate, setSelectedDate] = React.useState(new Date());

//   function handleDateChange(date) {
//     setSelectedDate(date);
//   }

//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <Grid container justify="space-around">
//         <Paper>
//           <DateTimePicker value={selectedDate} onChange={handleDateChange} />
//           <Button>
//             <SaveIcon></SaveIcon>
//           </Button>
//         </Paper>
//       </Grid>
//     </MuiPickersUtilsProvider>
//   );
// }