import React from "react";
import ReactDOM from "react-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import db from './config';

const styles = theme => ({
  root: {
    width: "100%",
    overflow: "auto",
    marginTop: 30
  },
  table: {
    minWidth: 300
  },
  CircleProgressBar: {
    margin: "20px auto",
    display: "flex",
    justifyContent: "center"
  }
});

const StyledTableCell = withStyles(theme => ({
  head: {
    "&:first-child": {
      width: 60
    },
    "&:last-child": {
      paddingRight: 5
    }
  },
  body: {
    "&:first-child": {
      width: 60
    },
    "&:last-child": {
      paddingRight: 5
    }
  }
}))(TableCell);

// const databaseURL = "https://munzidiary.firebaseio.com";

class Records extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(records) {
    this.props.onRecordChange(records);
  }

  _delete(id) {
    if (confirm("삭제하시겠습니까? =>" + id) === true) {
      db.collection("records").doc(id)
        .delete()
        .then(()=>{

            this.handleChange();
            console.log("삭제완료");
          }
        )
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.listWrap}>
        {this.props.records ? (
          <Paper className={classes.root}>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>구분</StyledTableCell>
                  <StyledTableCell>시간</StyledTableCell>
                  <StyledTableCell align="center">삭제</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(this.props.records).map(id => {
                  const record = this.props.records[id];
                  return (
                    <TableRow key={id}>
                      <StyledTableCell component="th" scope="row">
                        {record.name}
                      </StyledTableCell>
                      <StyledTableCell>{record.time}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}
                          onClick={() => this._delete(id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <div className={classes.CircleProgressBar}>
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Records);
