import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';



const styles = (theme) => ({});

class Records extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.records != this.props.records
  // }
  
  render() {
      const { classes } = this.props;
      return(
        <div>
          {Object.keys(this.props.records).map(id => {
            const record = this.props.records[id];
            return(
              <div key={id}>
                {record.name} {record.time}
              </div>
            )
          })}
        </div>
      )
  }

}

export default withStyles(styles)(Records);