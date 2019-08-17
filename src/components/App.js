import React from 'react';
// import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Timestamp from './timestamp';
import Records from './records';

const styles = (theme) => ({
    h1: {
        color: '#e46868',
    },
    subtitle: {
        color: '#e46868',
    },
    timeStampWrap: {
        marginTop: 30,
    },
});
class App extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Container maxWidth="sm">
                    <Typography variant="h1" component="h2" gutterBottom className={classes.h1}>
                            Munji Diary
                    </Typography>
                        <Typography variant="subtitle1" gutterBottom className={classes.subtitle}>
                            먼지의 배변일지입니다. 규칙적인 배변활동은 먼지의 건강에 중요합니다. 아래의 '맛동산'과 '감자' 버튼만 누르면 시간이 기록됩니다.
                    </Typography>
                        <Grid container justify="center" className={classes.timeStampWrap}>
                        <Timestamp />
                    </Grid>
                </Container>
                <Container>
                    <Records />
                </Container>
          </div>
        );
    }
}

export default withStyles(styles)(App);
