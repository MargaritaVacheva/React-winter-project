import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Snow from '../Snow';
import Navigation from '../Navigation';
import HomePage from '../HomePage';
import Recipes from '../Recipes';
import RegisterPage from '../RegisterPage';
import LoginPage from '../LoginPage';
import Logout from '../Logout';
import ProfilePage from '../ProfilePage';
import ContactPage from '../ContactPage';
// import Aside from '../Aside';
import Main from '../Main';
import Footer from '../Footer';
import './App.css';
import imageDefault from '../../photos/joanna-kosinska-llLttk4TgT4-unsplash.jpg';

const App = () => {
  const [isSnowing, setIsSnow] = useState(false);
  const [background, setBackground] = useState("");
  const [imageUrl, setImageUrl] = useState(imageDefault);

  const snowHandler = (ev) => {
    isSnowing ?
      setIsSnow(false) :
      setIsSnow(true);
  }

  let style =  imageUrl ? 
  { backgroundImage: `url(${imageUrl})`} :
  { background } 
  

  return (
    <div className="App" style={style}>
      <BrowserRouter>
        {/* <Snow isSnowing={isSnowing} /> */}
        <Navigation snowHandler={snowHandler} />
        <Main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/contacts" component={ContactPage} />
          </Switch>
        </Main>
        {/* <Aside/>  */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
