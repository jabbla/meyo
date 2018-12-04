import React, { Component } from 'react';
import { Modal, Form, Input, Checkbox, InputNumber } from 'antd';

const FormItem = Form.Item;

class SetProtoModal extends Component {
    constructor(props) {
        super(props);
        
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOK = this.handleOK.bind(this);
    }

    handleCancel(e) {
        this.props.closeModal();
    }

    handleOK(e) {
        const { validateFields } = this.props.form;
        console.log('lll');
        validateFields((err, fieldsValue) => {
            if(err){
                return;
            }
            this.props.closeModal();
            this.props.onConfirm(fieldsValue);
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title="设置你的原型"
                visible={this.props.visible}
                onCancel={this.handleCancel}
                onOk={this.handleOK}
                cancelText="取消"
                okText="确认"
            >
                <Form>
                    <FormItem
                        label="宽度"
                        labelCol={{span: 3}}
                        wrapperCol={{span: 10}}
                    >
                        {getFieldDecorator('width', {
                            rules: [{required: true, message: '请输入宽度'}]
                        })(
                            <InputNumber
                                option={{initialValue: 100}}
                            />
                        )} px
                    </FormItem>
                    <FormItem
                        label="高度"
                        labelCol={{span: 3}}
                        wrapperCol={{span: 10}}
                    >
                        {getFieldDecorator('height', {
                            rules: [{required: true, message: '请输入宽度'}]
                        })(
                            <InputNumber
                                option={{initialValue: 100}}
                            />
                        )} px
                    </FormItem>
                </Form>

            </Modal>
        );
    }
};

export default Form.create()(SetProtoModal);