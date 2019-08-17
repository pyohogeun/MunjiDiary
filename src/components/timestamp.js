import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import RefreshIcon from '@material-ui/icons/Refresh';


const styles = (theme) => ({});

class Timestamp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nowTime: '',
        };
        this._getTime = this._getTime.bind(this);
    }
  
    _getTime() {
        const n = new Date();
        const Minute = n.getMinutes() < 10 ? '0' + n.getMinutes() : n.getMinutes();
        const seconds = n.getSeconds() < 10 ? '0' + n.getSeconds() : n.getSeconds();
        const nowTime = `${n.getHours()  } : ${  Minute  } : ${ seconds}`;
        this.setState({
            nowTime,
        });
    }
  
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
                        <Button className={classes.button}>
                맛동산
                        </Button>
                        <Button className={classes.button}>
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