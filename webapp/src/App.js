import React, { Component } from 'react';
import { 
  Layout, Menu, Icon,
  Form
} from 'antd';
import './App.scss';
import {install, NewProtoModal} from './components/NewProtoModal/NewProtoModal.js';

const { Header, Content, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewProtoModal: false
    };

    /**函数组件 */
    this.$NewProtoModal = NewProtoModal(this);

    this.onNewProto = this.onNewProto.bind(this);
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
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Sider 
              width={200}
              style={{ background: '#fff' }}
              collapsible
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item>
                  <Icon type="snippets" />
                  <span>模块原型</span>
                </Menu.Item>
                <Menu.Item>
                  <Icon type="copy" />
                  <span>页面原型</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="m-content-wraper" style={{ padding: '0 24px 24px' }}>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                Content
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

App = install(App);

export default App;
