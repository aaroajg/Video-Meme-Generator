import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import ReadMe from './ReadMe';
import Welcome from './Welcome';
import FromVideo from './FromVideo';
import logo from '../images/logo.png';

function Header () {
    const style = {
        color: 'white',
        padding: '100px',
        textAlign: 'center'
    }

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
                <Route exact path='/fromVideo' component={FromVideo} />
                <Route exact path='/readMe' component={ReadMe} />
                <Route exact path='/' component={Welcome} />
                <Route path="*" render={() => <h1 style={style}>Umm thats a 404 Error... Page not found</h1>} />  
            </Switch>
        </div>
    );
}

export default Header;