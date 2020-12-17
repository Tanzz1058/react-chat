import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import './index.css';
import App from './components/App';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import * as serviceWorker from './serviceWorker';
import firebase from './firebase';
import {setUser, clearUser} from './actions/index';
import Spinner from './Spinner';

import 'semantic-ui-css/semantic.min.css';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component{
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.props.setUser(user);
        this.props.history.push("/");
      }else{
        this.props.history.push("/login");
        this.props.clearUser();
      }
    })
  }
render(){
  return this.props.isLoading ? <Spinner/> :(
    <Switch>
      <Route exact path = '/' component = {App}/>
      <Route exact path = '/login' component = {Login}/>
      <Route exact path = '/register' component = {Register}/>
    </Switch>
  )
}
  
}
  
const mapStateToProps = state =>({
  isLoading: state.user.loading
})
const RootWithRouter = withRouter(connect(mapStateToProps, {setUser, clearUser})(Root));
   
ReactDOM.render(
  <Provider store = {store}>
  <Router>
    <RootWithRouter/>
  </Router>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
