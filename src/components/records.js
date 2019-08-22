import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = (theme) => ({
  listWrap:{
    marginTop: 30
  }
});

const databaseURL = "https://munzidiary.firebaseio.com";

class Records extends React.Component {
  constructor(props) {
    super(props);
    
  }

  handleChange(records) {
    this.props.onRecordChange(records);
  }

  _delete(id){
    return fetch(`${databaseURL}/records/${id}.json`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(() => {
        let nextState = this.props.records;
        delete nextState[id];
        this.handleChange(nextState);
      });
   
  }
  render() {
      const { classes } = this.props;
      return(
        <div className={classes.listWrap}>
          {Object.keys(this.props.records).map(id => {
            const record = this.props.records[id];
            return(
              <div key={id}>
                {record.name} {record.time}
                <IconButton aria-label="delete" className={classes.margin} onClick={() => this._delete(id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            )
          })}
        </div>
      )
  }

}

export default withStyles(styles)(Records);