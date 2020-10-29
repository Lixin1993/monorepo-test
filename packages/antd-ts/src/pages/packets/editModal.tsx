import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, DatePicker, Input, Button, InputNumber, Row, Col, Icon, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { addPacketsItem, updatePacketsItem } from '../../api/packets'
import moment from 'moment'
import { Idata, IListItem } from './index'

const { Option } = Select

type IProps = FormComponentProps & {
  rowData?: Idata,
  visible: boolean,
  getList: () => void,
  setVisible: (payload: boolean) => void,
}

const emptyList = { name: '', value: null, id: '', pid: '' }

const EditModal = (props: IProps) => {
  const { visible, setVisible, form, rowData, getList } = props
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
      if (!error) {
        const result = { ...values, date: values.date.format('YYYY-MM-DD') }
        if (!rowData) {
          addPacketsItem(result).then(res => {
            if (res.data.result) {
              message.success('添加成功')
              getList()
            } else {
              message.error('添加失败')
            }
          })
        } else {
          result.id = rowData.id
          updatePacketsItem(result).then(res => {
            if (res.data.result) {
              message.success('更新成功')
              getList()
            } else {
              message.error('更新失败')
            }
          })
        }
      }
      closeModal()
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
      <Form className='packetsModal' labelCol={{ span: 5 }} wrapperCol={{ span: 13 }}>
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
                  <Col span={0}>
                    <Form.Item>
                      {getFieldDecorator(`list[${index}].id`, { initialValue: item.id })(<Input />)}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator(`list[${index}].pid`, { initialValue: item.pid })(<Input />)}
                    </Form.Item>
                  </Col>
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