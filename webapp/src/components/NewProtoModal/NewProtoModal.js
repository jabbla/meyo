import React from 'react';
import { 
    Modal, Form, Radio, Input
} from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const NewProtoModal = (context) => {
    let _this = context;
    let showNewProtoModal = false;

    const {validateFields} = _this.props.form;
    
    let handleOk = () => {
        validateFields((err, fieldsValue) => {
            if(err){
                return;
            }
            console.log(fieldsValue);

            _this.setState(state => ({
                showNewProtoModal: false
            }));
        });
    };
  
    let handleCancel = () => {
        _this.setState(state => (
        {
          showNewProtoModal: false
        }
      ))
      
    };
  
    return (modalState) => {
      showNewProtoModal = modalState;
      
      const { getFieldDecorator } = _this.props.form;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 4 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 16 },
          sm: { span: 16 },
        },
      };
      return (
        <Modal
          centered
          title="新建原型"
          visible={showNewProtoModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form 
            layout="vertical"
          >
            <FormItem
              {...formItemLayout}
              label="原型类型"
            >
              {getFieldDecorator('type', {
                rules: [{
                  required: true, message: '原型描述不能为空',
                }],
              })(
                <RadioGroup 
                >
                  <Radio value={1}>模块原型</Radio>
                  <Radio value={2}>页面原型</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="原型名称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '原型名称不能为空',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="原型描述"
            >
              {getFieldDecorator('desc', {
                rules: [{
                  required: true, message: '原型描述不能为空',
                }],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
};

function install(fn){
    return Form.create()(fn);
}

export { install, NewProtoModal };