import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Content, Sider } = Layout;
class Home extends Component {
    render() {
        return (
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
        );
    }
}

export default Home;