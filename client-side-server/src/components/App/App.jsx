import React, { useState, useMemo, createContext, useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
import Auth from '../Auth';
import './App.css';
import imageDefault from '../../photos/joanna-kosinska-llLttk4TgT4-unsplash.jpg';

export const UserContext = createContext(null);

const App = () => {
  const [isSnowing, setIsSnow] = useState(false);
  const [background, setBackground] = useState("");
  const [imageUrl, setImageUrl] = useState(imageDefault);

  const [user, setUser] = useState(null);

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  const snowHandler = (ev) => {
    isSnowing ?
      setIsSnow(false) :
      setIsSnow(true);
  }

  let style = imageUrl ?
    { backgroundImage: `url(${imageUrl})` } :
    { background }


  return (
    <div className="App" style={style}>
      <BrowserRouter>
        <UserContext.Provider value={userValue}>
            <Auth>
              {/* <Snow isSnowing={isSnowing} /> */}
              <Navigation snowHandler={snowHandler} />
              <Main>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                  <RouteAuthWrapper path="/recipes" component={Recipes} />
                  <Route path="/contacts" component={ContactPage} />
                  <RouteAuthWrapper path="/profile" component={ProfilePage} />
                  <RouteAuthWrapper path="/logout" component={Logout} />
                </Switch>
              </Main>
              <Footer />
            </Auth>
        </UserContext.Provider>
      </BrowserRouter >
    </div >
  );
}

export default App;


const RouteAuthWrapper = ({  component: Component , ...routeProps }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...routeProps}
      render={() => (user ? 
        <Component/> : 
        <Redirect to='/login' />)
      }
    />
  );
};
