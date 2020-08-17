import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, DatePicker, Input, Button, InputNumber, Row, Col, Icon } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import moment from 'moment'
import { Idata, IListItem } from './index'

const { Option } = Select

type IProps = FormComponentProps & {
  rowData?: Idata,
  visible: boolean,
  setVisible: (payload: boolean) => void,
}

const emptyList = { name: '', value: null }

const EditModal = (props: IProps) => {
  const { visible, setVisible, form, rowData } = props
  const { getFieldDecorator, validateFields } = form
  const [itemList, setItemList] = useState(rowData ? rowData.list : [emptyList])

  useEffect(() => {
    if(visible) {
      setItemList(rowData ? rowData.list : [emptyList])
    }
  }, [visible])

  const closeModal = () => {
    setVisible(false)
    setItemList([emptyList])
  }

  const addListItem = () => {
    const curList = form.getFieldValue('list')
    setItemList([...curList, emptyList])
    form.setFieldsValue({ list: curList.push(emptyList) })
  }

  const removeListItem = (index: number) => {
    const curList = form.getFieldValue('list')
    curList.splice(index, 1)
    setItemList([...curList])
    form.setFieldsValue({ list: curList })
  }

  const submit = () => {
    validateFields((error, values) => {
      console.log('-----values', values)
    })
  }

  return (
    <Modal
      width={'65vw'}
      destroyOnClose
      visible={visible}
      title={rowData?.id ? '编辑' : '新增'}
      onOk={submit}
      onCancel={closeModal}
    >
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 13 }}>
        <Form.Item label={'日期'}>
          {getFieldDecorator('date', {
            initialValue: rowData && moment(rowData.date),
            validateFirst: true,
            rules: [{ required: true, message: '请选择日期' }]
          })(<DatePicker placeholder={'请选择日期'} />)}
        </Form.Item>
        <Form.Item label={'类型'}>
        {getFieldDecorator('type', {
          initialValue: rowData ? rowData.type : '',
          validateFirst: true,
          rules: [{ required: true, message: '请选择类型' }]
        })(
          <Select placeholder={'请选择类型'} style={{ width: '8vw' }}>
            <Option value={'expend'}>支出</Option>
            <Option value={'income'}>收入</Option>
          </Select>
        )}
        </Form.Item>
        {
          itemList.map((item: IListItem, index: number) => {
            return (
              <Form.Item label={'项目'} key={index}>
                <Row>
                  <Col span={8}>
                    {getFieldDecorator(`list[${index}].name`, {
                      initialValue: item.name,
                      validateFirst: true,
                      rules: [{ required: true, message: '请填写项目名称' }]
                    })(<Input placeholder='请填写项目名称' />)}
                  </Col>
                  <Col span={1} style={{ textAlign: 'center' }}> - </Col>
                  <Col span={8}>
                    <Form.Item style={{ marginBottom: 0 }}>
                      {getFieldDecorator(`list[${index}].value`, {
                        initialValue: item.value,
                        validateFirst: true,
                        rules: [{ required: true, message: '请填写项目金额' }]
                      })(<InputNumber placeholder='请填写项目金额' />)}
                    </Form.Item>
                  </Col>
                  <Col span={7}>
                    {itemList.length > 1 && <Button className='listBtn' shape="circle" icon="minus" onClick={() => removeListItem(index)} />}
                  </Col>
                </Row>
              </Form.Item>
            )
          })
        }
        <Form.Item wrapperCol={{ span: 13, offset: 5 }}>
          <Button type="dashed" onClick={addListItem}>
            <Icon type='plus' />添加项目
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const EditPacketsModal = Form.create<IProps>({})(EditModal)

export default EditPacketsModal