import {AppBar, Toolbar, Typography} from '@material-ui/core/';
import * as React from 'react';
import { Link } from 'react-router-dom';


export const Header: React.StatelessComponent<{}> = () => {
    return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="display3" color="inherit">
                        <Link style={{color: "white"}} to="/">Top</Link>
                        <Link to="/FirstComponent"> New </Link>
                        <Link to="/SecondComponent"> Controversial </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
    );
}