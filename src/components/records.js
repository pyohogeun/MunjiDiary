import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';

const databaseURL = "https://munzidiary.firebaseio.com";

const styles = (theme) => ({});

class Records extends React.Component {
  constructor() {
    super();
    this.state = {
      records: {}
      // name: ""
    };
  }
  _get() {
    fetch(`${databaseURL}/records.json`)
      .then(res => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(records => this.setState({ records: records }));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.records != this.state.records
  }
  componentDidMount() {
    this._get();
  }
  render() {
      // const { classes } = this.props;
      return(
        <div>
          {Object.keys(this.state.records).map(id => {
            const record = this.state.records[id];
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