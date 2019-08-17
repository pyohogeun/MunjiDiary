import React from 'react';
import List from '@material-ui/core/List';

const styles = (theme) => ({});

class Records extends React.Component {
    render() {
        return(
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                        <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                        <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItem>
                </List>
            </div>

        );
    }

}

export default withStyle(styles)(Records);