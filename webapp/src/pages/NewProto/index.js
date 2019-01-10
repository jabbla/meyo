import React, { Component } from 'react';
import { Layout, Tabs, Button } from 'antd';
import { Draggable, Swappable, Droppable } from '@shopify/draggable';
import Container from '../../lib/Container';
import { connect } from 'react-redux';

import ElementOptions from './components/ElementOptions';
import ModuleOptions from "./components/ModuleOptions";
import LayoutOptions from './components/LayoutOptions';
import SetProtoModal from './components/SetProtoModal';

import './index.scss';

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

class NewProto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProto: {},
            showSetProtoModal: false
        };
        
        this.handleModalClose = this.handleModalClose.bind(this);
        this.onOptionChange = this.onOptionChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    detectStorage() {
        let currentProto = (Object.keys(this.props.currentProto).length && this.props.currentProto) || JSON.parse(window.localStorage.getItem('currentProto'));
        this.state.currentProto = currentProto;
        window.localStorage.setItem('currentProto', JSON.stringify(currentProto));
    }

    componentDidMount() {
        this.detectStorage();
        this.initContainer();
    }

    handleModalClose() {
        this.setState({
            showSetProtoModal: false
        });
    }

    onSave() {
        const { state } = this;
        let { containLayout } = state;

        console.log(containLayout.transformToJson());
    }

    handleConfirm(fieldsValue) {
        const { state } = this;
        let { containLayout, fromLayout, layoutId } = state;

        let event = {sourceInfo: state.currentSourceInfo, options: fieldsValue};
        if(fromLayout){
            containLayout.trigger('layout:proto-drop', { ...event, layoutId });
        }else{
            containLayout.trigger('container:append-layout', event)   
        }
    }

    initContainer() {
        const container = document.querySelector('#layout-region');
        const layoutContainer = new Container({elem: container, proto: this.state.currentProto, protoTypeMap: this.props.protoTypeMap});

        this.setState({
            containLayout: layoutContainer
        });

        layoutContainer.on('container:proto-drop', ({sourceInfo, fromLayout, layoutId}) => {
            this.setState({
                showSetProtoModal: true,
                currentSourceInfo: sourceInfo,
                fromLayout, layoutId
            });
        });
    }

    onOptionChange() {
    }

    render() {
        let { name: protoName, desc: protoDesc, type: protoType } = this.state.currentProto;
        let { protoTypeMap } = this.props;
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
                    <h6 className="m-layout-title">
                        原型类型：{protoTypeMap[protoType]}，原型名称：{protoName}，原型描述：{protoDesc}
                    </h6>
                    <Button 
                        type="primary"
                        size="small"
                        onClick={this.onSave}
                    >
                        保存
                    </Button>
                    <div className="m-layout-region m-dropable" id="layout-region">
                        
                    </div>
                    <SetProtoModal 
                        visible={this.state.showSetProtoModal} 
                        closeModal={this.handleModalClose}
                        onConfirm={this.handleConfirm}
                    />
                </Content>
                </Layout>
            </Layout>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        currentProto: state.currentProto,
        protoTypeMap: state.protoTypes.reduce((pre, cur) => {
            pre[cur.id] = cur.name;
            return pre;
        }, {})
    };
};

export default connect(mapStateToProps)(NewProto);