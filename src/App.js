import React from 'react';
import Pages from './pages';
import { Provider } from "mobx-react";
import { RootStoreContext } from "./stores/RootStore";
import axios from 'axios';
import './themes.scss'
// import 'antd/dist/reset.css';

class App extends React.Component {
  static contextType = RootStoreContext;
  render() {
    axios.defaults.baseURL = "http://192.168.1.94/adaptive-learning-api/";
    return (
      <Provider {...this.context}>
        <Pages />
      </Provider>

    );
  }
}

export default App;

