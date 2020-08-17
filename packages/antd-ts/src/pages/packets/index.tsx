import React, { useState } from 'react'
import { Timeline, Button, Table, Modal, Icon } from 'antd'
import { formatDate } from '../../utils'
import EditModal from './editModal'

import './index.css'

const { confirm } = Modal

export type IListItem = {
  name: string,
  value: number | null,
}

export type Idata = {
  id: string,
  date: number,
  type: 'income' | 'expend',
  list: IListItem[],
}

const typeMap = { income: { color: 'green', name: '收入' }, expend: { color: 'red', name: '支出' } }

const data: Idata[] = [
{
  id: '231597327051',
  date: 231597327051,
  type: 'income',
  list: [{ name: '爸爸', value: 100 }, { name: '妈妈', value: 200 }]
},
{
  id: '211597327051',
  date: 211597327051,
  type: 'income',
  list: [{ name: '妈妈', value: 100 }]
},
{
  id: '221597327051',
  date: 221597327051,
  type: 'income',
  list: [{ name: '叔叔', value: 100 }]
},
{
  id: '431597327051',
  date: 431597327051,
  type: 'income',
  list: [{ name: '阿姨', value: 100 }]
},
{
  id: '1231597327051',
  date: 1231597327051,
  type: 'expend',
  list: [{ name: '买书', value: 20 }]
},
{
  id: '2041597327051',
  date: 2041597327051,
  type: 'expend',
  list: [{ name: '买玩具', value: 100 }]
},
{
  id: '2141597327051',
  date: 2141597327051,
  type: 'expend',
  list: [{ name: '买餐具', value: 50 }]
}
]

const Packets = () => {
  const [type,  setType] = useState('all')
  const [rowData, setRowData] = useState<Idata|undefined>()
  const [visible, setVisible] = useState(false)
  const [showTable, setShowTable] = useState(true)
  const [dataSrouce, setDataSrouce] = useState<Array<Idata>>(data)

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      render: (text: number) => formatDate(text, 'yyyy-MM-dd')
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (text: 'income' | 'expend') => <span style={{ color: typeMap[text].color }}>{typeMap[text].name}</span>
    },
    {
      title: '项目',
      dataIndex: 'list',
      render: (text: IListItem[], record: Idata) => text.map((item: IListItem, index) => {
        return (<p style={{ color: typeMap[record.type].color, marginBottom: 0 }} key={index}>{item.name} - {item.value}</p>)
      })
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text: string, record: Idata) => (<div>
        <Button style={{ marginRight: '15px' }} onClick={() => showModal(record.id)}>编辑</Button>
        <Button onClick={() => {
          confirm({
            title: `确定删除 ${formatDate(record.date, 'yyyy-MM-dd')}， 这条记录吗？`,
            icon: <Icon type="close-circle" />,
            onOk() {
              const index = dataSrouce.findIndex(item => item.id === record.id)
              const currentData = [...dataSrouce]
              currentData.splice(index, 1)
              setDataSrouce(currentData)
            }
          })
        }}>删除</Button>
      </div>)
    }
  ]

  const showModal = (id?: string) => {
    const curRow = dataSrouce.find(item => item.id === id)
    setRowData(curRow)
    setVisible(!visible)
  }

  return (
    <div>
      <div className='container'>
        <Button.Group>
          <Button onClick={() => showModal()}>新增</Button>
          <Button onClick={() => setShowTable(!showTable)}>切换图形</Button>
        </Button.Group>
        {!showTable && <Button.Group style={{ marginBottom: '15px' }}>
          <Button onClick={() => setType('income')}>收入</Button>
          <Button onClick={() => setType('expend')}>支出</Button>
          <Button onClick={() => setType('all')}>全部</Button>
        </Button.Group>}
      </div>
      {!showTable && <Timeline>
        {data.map((item, index) => {
          if (item.type === type || type === 'all') {
            return (
              <Timeline.Item color={typeMap[item.type].color} key={index}>
                <h3>{formatDate(item.date, 'yyyy-MM-dd')}</h3>
                {item.list.map((it, idx) =>(<p key={idx}>{it.name} - <span style={{ fontWeight: 600, color: typeMap[item.type].color }}>{it.value}</span></p>))}
              </Timeline.Item>
            )
          }
          return null
        })}
      </Timeline>}
      {showTable && <Table rowKey={(record, index) => `${index}`} dataSource={dataSrouce} columns={columns} />}
      <EditModal
        visible={visible}
        setVisible={setVisible}
        rowData={rowData}
      />
    </div>
  )
}

export default Packets