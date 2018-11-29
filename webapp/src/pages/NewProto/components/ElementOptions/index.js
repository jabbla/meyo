import React, { Component } from 'react';
import { Draggable, Swappable } from '@shopify/draggable';

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
        console.log(Draggable);
    }

    initDraggables() {

        const ElementList = document.querySelector('#element-list');
        console.log(ElementList);
        // this.state.draggable = new Swappable(ElementList, {
        //     draggable: '.u-list-item'
        // });
    }

    render() {
        return (
            <div className="m-element-list m-dropable" id="element-list">
                {this.props.elements.map(elem => (
                    <div 
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