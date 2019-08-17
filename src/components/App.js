import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Timestamp from './timestamp';


const styles = theme => ({
    subtitle: {
        color: 'red'
    },
})
class App extends React.Component {
    render() {
        const { classes } = this.props;
        return(
            <Container maxWidth="sm">
                <Typography variant="h1" component="h2" gutterBottom>
                    Munji Diary
                </Typography>
                <Typography variant="subtitle1" gutterBottom className={classes.subtitle}>
                    먼지의 배변일지입니다. 규칙적인 배변활동은 먼지의 건강에 중요합니다. 아래의 '맛동산'과 '감자' 버튼만 누르면 시간이 기록됩니다.
                </Typography>
                <Timestamp/>
            </Container>
        )
    }
}

export default withStyles(styles)(App);