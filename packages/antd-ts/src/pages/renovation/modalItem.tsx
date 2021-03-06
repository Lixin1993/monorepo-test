import React from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { addRenovationBaseItem, updateRenovationBaseItem, IItemDataSource } from '../../api/renovation'

const { Option } = Select

interface IProps extends FormComponentProps {
  visible: boolean,
  id: string | undefined,
  data: Array<IItemDataSource>,
  getData: () => void,
  setVisible: (param: boolean) => void
}

interface ITypeMap {
  [propsName: string]: string
}

const typeMap: ITypeMap = {
  kitchen: '厨房',
  design: '设计',
  bathroom: '卫生间',
  airCondition: '空调',
  renovation: '装修队',
  window: '窗子',
  door: '门',
  floorboard: '地板地砖',
  stone: '石材',
  wardrobe: '定做柜子',
  soft: '软装',
  paint: '乳胶漆',
  others: '其他',
}

function CreateModal(props: IProps): JSX.Element {
  const { form, id, data, setVisible, getData } = props
  const { getFieldDecorator, validateFields } = form
  const rowData: IItemDataSource | undefined = id ? data.find(item => item.id === id) : undefined
  const onSubmit = () => {
    validateFields((error, values) => {
      if (!error) {
        const newRowData = { typeName: typeMap[values.type], ...values }
        if (id) {
          updateRenovationBaseItem({ id, ...newRowData }).then(res => {
            if (res.data.result) {
              getData()
              message.success('修改成功')
            } else {
              message.error('修改失败')
            }
          }).catch(() => message.error('修改失败'))
        } else {
          const payload = newRowData
          addRenovationBaseItem(payload).then(res => {
            if (res.data.result) {
              getData()
              message.success('添加成功')
            } else {
              message.error('添加失败')
            }
          }).catch(() => message.error('添加失败'))
        }
      }
      setVisible(false)
    })
  }

  return (
    <Modal
      width={'40vw'}
      title={id ? `${rowData && rowData.name}` : '新增项目'}
      destroyOnClose
      visible={props.visible}
      onOk={onSubmit}
      onCancel={() => props.setVisible(false)}
    >
      <Form layout='inline'>
        <Form.Item>
          {getFieldDecorator('name', {
            initialValue: rowData?.name,
            validateFirst: true,
            rules: [{ required: true, message: '请输入名称' }]
          })(<Input placeholder={'名称'} />)}
        </Form.Item>
        <Form.Item>
        {getFieldDecorator('type', {
          initialValue: rowData?.type,
          validateFirst: true,
          rules: [{ required: true, message: '请选择类型' }]
        })(
          <Select placeholder={'类型'} style={{ width: '8vw' }}>
            {Object.entries(typeMap).map((item) => {
              return <Option key={item[0]} value={item[0]}>{item[1]}</Option>
            })}
          </Select>
        )}
        </Form.Item>
        <Form.Item>
        {getFieldDecorator('price', {
          initialValue: rowData?.price,
          validateFirst: true,
          rules: [{ required: true, message: '请输入金额' }]
        })(<Input placeholder={'金额'} />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const CreateTableDataModal = Form.create<IProps>({})(CreateModal)

export default CreateTableDataModal