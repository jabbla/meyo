import React, { Component } from 'react';
import { Draggable, Swappable } from '@shopify/draggable';
import { initProtoDom } from "../../../../lib/dom";

import { connect } from 'react-redux';
import './index.scss';
import { Card } from 'antd';

class ElementOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.initDraggables();
    }

    initDraggables() {
        const ElementList = document.querySelector('#element-list');

        initProtoDom(ElementList.querySelectorAll('.u-list-item'));
    }

    render() {
        return (
            <div className="m-element-list m-dropable" id="element-list">
                {this.props.elements.map((elem, index) => (
                    <div 
                        draggable="true"
                        key={index}
                        className="u-list-item"
                        data-type={elem.type}
                        data-tagname={elem.tagname}
                        data-name={elem.name}
                    >
                        {elem.name}
                    </div>
                ))}
            </div>
        );
    }
};

const mapStateToProps = state => ({
    elements: state.elements
});

export default connect(mapStateToProps)(ElementOptions);