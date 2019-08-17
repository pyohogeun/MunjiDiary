import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const styles = (theme) => ({});

class Records extends React.Component {
    render() {
        const { classes } = this.props;
        return(
          <div className={classes.root}>
              {/* <List component="nav" aria-label="main mailbox folders">
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
                </List> */}
                list
            </div>

        );
    }

}

export default withStyles(styles)(Records);