import {AppBar, Toolbar, Typography} from '@material-ui/core/';
import * as React from 'react';
import { Link } from 'react-router-dom';


export const Header: React.StatelessComponent<{}> = () => {
    return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="display3" color="primary">
                        <Link style={{color: "white"}} to="/">Top   </Link>
                        <Link style={{color: "white"}} to="/FirstComponent">New    </Link>
                        <Link style={{color: "white"}} to="/SecondComponent">Controversial    </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
    );
}