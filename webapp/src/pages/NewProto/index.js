import React, { Component } from 'react';
import { Layout, Tabs } from 'antd';
import { Draggable, Swappable, Droppable } from '@shopify/draggable';

import ElementOptions from './components/ElementOptions';
import ModuleOptions from "./components/ModuleOptions";
import LayoutOptions from './components/LayoutOptions';

import './index.scss';

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

class NewProto extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onOptionChange = this.onOptionChange.bind(this);
    }

    componentDidMount() {
        this.initDraggables();
    }

    initDraggables() {
        const LayoutRegion = document.querySelector('#layout-region');
        const TestRegion = document.querySelector('#test-region');
        const droppable = this.state.droppable = new Droppable([TestRegion, LayoutRegion], {
            draggable: '.draggable',
            dropzone: '.dropable',
            mirror: {
                constrainDimensions: true,
            }
        });

        droppable.on('drag:start', (evt) => {
            console.log('fffff');
        });
    }

    onOptionChange() {
        console.log('option change');
    }

    render() {
        return (
            <Layout
                id="draggable-container"
            >
                <Sider 
                width={300}
                style={{ background: '#fff' }}
                collapsible
                >
                    <Tabs 
                        defaultActiveKey="1"
                        onChange={this.onOptionChange}
                    >
                        <TabPane tab="元素" key="1">
                            <ElementOptions />
                        </TabPane>
                        <TabPane tab="模块" key="2">
                            <ModuleOptions />
                        </TabPane>
                        <TabPane tab="布局" key="3">
                            <LayoutOptions />
                        </TabPane>
                    </Tabs>
                </Sider>
                <Layout className="m-content-wraper" style={{ padding: '0 24px 24px' }}>
                <Content 
                    style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}
                    className="m-layout-wraper"
                >
                    <div id="test-region" className="m-test-region">
                        <div className="draggable">1</div>
                        <div className="draggable">2</div>
                        <div className="draggable">3</div>
                    </div>
                    <div className="m-layout-region m-dropable" id="layout-region">
                        布局区域
                        <div className="dropable"></div>
                        <div className="dropable"></div>
                        <div className="dropable"></div>
                    </div>
                </Content>
                </Layout>
            </Layout>
        );
    }
};

export default NewProto;