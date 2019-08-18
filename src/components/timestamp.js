import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import RefreshIcon from '@material-ui/icons/Refresh';


const styles = (theme) => ({});

const databaseURL = "https://munzidiary.firebaseio.com/";

class Timestamp extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     records: {},
        //     name: "",
        //     time: "",
        //     nowTime: ''
        // };
        this._getTime = this._getTime.bind(this);
    }

  
    _getTime() {
        const n = new Date();
        const Minute = n.getMinutes() < 10 ? '0' + n.getMinutes() : n.getMinutes();
        const seconds = n.getSeconds() < 10 ? '0' + n.getSeconds() : n.getSeconds();
        const nowTime = `${n.getHours()  } : ${  Minute  } : ${ seconds}`;
        //지금시간 표시
        this.setState({
            nowTime,
        });
    }

    handleRecords(records) {
        this.setState({
            records: records
        });
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
                this.handleRecords(nextState)
            });
    }

    handleSubmitPoop = () => {
        const record = {
            name: "poop",
            time: this.state.nowTime
        };
        this._post(record);
    };

    handleSubmitPee = () => {
        const record = {
            name: "pee",
            time: this.state.nowTime
        };
        this._post(record);
    };

    
  
    componentDidMount() {
        this._getTime();
    }
  
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="h3" gutterBottom>{this.state.nowTime}</Typography>
                <Grid container justify="center">
                    <ButtonGroup size="large" color="primary" variant="contained" aria-label="contained button group">
                        <Button className={classes.button} onClick={this.handleSubmitPoop}>
                            맛동산
                        </Button>
                        <Button className={classes.button} onClick={this.handleSubmitPee}>
                            감자
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={this._getTime}
                        >
                            <RefreshIcon className={classes.icon} />
                        </Button>
                    </ButtonGroup>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Timestamp);