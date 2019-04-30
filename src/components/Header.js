import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import ReadMe from './ReadMe';
import Welcome from './Welcome';
import FromVideo from './FromVideo';
import logo from '../images/logo.png';

function Header () {
    return (
        <div>
            <header id = 'headerDiv'>
                <div id='right-header'>
                    <img 
                            id = 'logo' 
                            src ={logo} 
                            alt ='logo'
                    />
                    <Link className='left-link' to='/'>Home</Link>
                </div>
                <h1 id = 'title'>VINTAGE MEME MACHINE</h1>
                <div id = 'headerLinks'>
                    <Link className='right-link' to='/fromVideo'>Create Meme</Link>
                    <Link className='right-link' to='/readMe'>ReadMe</Link>
                </div>
            </header>
            <Switch>
                <Route path='/fromVideo'><FromVideo /></Route>
                <Route path='/readMe'><ReadMe /></Route>
                <Route path='/'><Welcome /></Route>
            </Switch>
        </div>
    );
}

export default Header;