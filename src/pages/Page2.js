import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/styles/withStyles';
import DrawerTopBarLayout from '../components/DrawerTopBarLayout'
import Container from '@material-ui/core/Container';


const styles = theme => ({
    
});


export class Page2 extends Component {

    render(){
        const { classes } = this.props;
        
        return (
            <DrawerTopBarLayout>
                <Container>
                This is page 2
                </Container>
            </DrawerTopBarLayout>
        );
    }

}

export default withRouter(withStyles(styles)(Page2));