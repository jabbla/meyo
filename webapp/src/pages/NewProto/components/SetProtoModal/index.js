import React, { Component } from 'react';
import { Modal, Form, Input, Checkbox, InputNumber } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class SetProtoModal extends Component {
    constructor(props) {
        super(props);
        
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOK = this.handleOK.bind(this);
    }

    handleCancel(e) {
        this.props.closeModal();
    }

    validateJson(rule, value, callback){
        try{
            value && JSON.parse(value);
            callback();
        }catch(err){
            callback('手写样式应为正确的JSON格式');
        }
        
    }

    handleOK(e) {
        const { validateFields } = this.props.form;
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
                        {getFieldDecorator('width', {})(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        label="高度"
                        labelCol={{span: 3}}
                        wrapperCol={{span: 10}}
                    >
                        {getFieldDecorator('height', {})(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        label="内容"
                        labelCol={{span: 3}}
                        wrapperCol={{span: 20}}
                    >
                        {getFieldDecorator('content', {})(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        label="手写样式"
                        labelCol={{span: 3}}
                        wrapperCol={{span: 20}}
                    >
                        {getFieldDecorator('cssText', {
                            rules: [{
                                validator: this.validateJson
                            }]
                        })(
                            <TextArea autosize/>   
                        )}
                    </FormItem>
                </Form>

            </Modal>
        );
    }
};

export default Form.create()(SetProtoModal);