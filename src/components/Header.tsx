import {AppBar, Toolbar, Typography} from '@material-ui/core/';
import * as React from 'react';
import { Link } from 'react-router-dom';


export const Header: React.StatelessComponent<{}> = () => {
    return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="display3" color="inherit">
                        <Link style={{color: "white"}} to="/">dankNotDank</Link>
                        <Link to="/FirstComponent"> Page 1 </Link>
                        <Link to="/SecondComponent"> Page 2 </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
    );
}