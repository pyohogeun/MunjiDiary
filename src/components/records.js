import React from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    overflow: "auto",
    marginTop: 30
  },
  table: {
    minWidth: 300
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

  _delete(id) {
    if (confirm("삭제하시겠습니까?") === true) {
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
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.listWrap}>
        <Paper className={classes.root}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>구분</TableCell>
                <TableCell>시간</TableCell>
                <TableCell>삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(this.props.records).map(id => {
                const record = this.props.records[id];
                return (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {record.name}
                    </TableCell>
                    <TableCell>{record.time}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => this._delete(id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Records);
