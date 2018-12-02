import React, { Component } from 'react';
import { Layout, Menu, Icon} from 'antd';
import Home from './pages/Home';
import NewProto from './pages/NewProto';

import './App.scss';
import {install, NewProtoModal} from './components/NewProtoModal/NewProtoModal.js';

import { connect } from 'react-redux';
import { setCurrentProto } from './redux/actions';

import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

const { Header, Content, Sider } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewProtoModal: false,
      pageId: '1'
    };

    /**函数组件 */
    console.log(props);
    this.$NewProtoModal = NewProtoModal(this, props);

    this.onNewProto = this.onNewProto.bind(this);
    this.onNav = this.onNav.bind(this);
  }

  jumpPage() {
    this.setState(state => ({
      pageId: '-1'
    }));
    this.props.history.push('/newProto');
  }

  onNav({key}) {
    this.setState(state => ({
      pageId: key
    }))
  }

  onNewProto() {
    this.setState(state => ({
      showNewProtoModal: true
    }));
  }

  render() {
    return (
        
        <div className="App">
          {this.$NewProtoModal(this.state.showNewProtoModal)}
          <Layout className="m-app">
            <Header className="header">
              <h2 className="logo">
                Meyo原型搭建系统
                <span className="m-subtitle">
                  <a className="u-new-btn" onClick={this.onNewProto}>新建原型</a>
                </span>
              </h2>
              
                <Menu
                  className="m-header-menu"
                  theme="dark"
                  mode="horizontal"
                  selectedKeys={[this.state.pageId]}
                  defaultSelectedKeys={['1']}
                  style={{ lineHeight: '64px' }}
                  onSelect={this.onNav}
                >
                  
                  <Menu.Item key="1">
                    <Link to="/">首页</Link>
                  </Menu.Item>
                  <Menu.Item key="2">nav 2</Menu.Item>
                  <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
              
            </Header>
            <Route exact path="/" component={Home}/>
            <Route exact path="/newProto" component={NewProto}/>
          </Layout>
        </div>
    );
  }
}

App = install(App);

const mapStateToProps = (state) => {
  return {
    protoTypes: state.protoTypes
  };
};

export default withRouter(connect(
  mapStateToProps,
  { setCurrentProto }
)(App));
