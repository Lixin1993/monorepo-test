import React, { useState, useEffect } from 'react'
import { Timeline, Button, Table, Modal, Icon, message } from 'antd'
import EditModal from './editModal'
import { formatDate } from '../../utils'
import { getPacketsList, deletePacketsItem } from '../../api/packets'

import './index.css'

const { confirm } = Modal

export type IListItem = {
  id: string,
  pid: string,
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

const Packets = () => {
  const [type,  setType] = useState('all')
  const [rowData, setRowData] = useState<Idata|undefined>()
  const [visible, setVisible] = useState(false)
  const [totalVisible, setTotalVisible] = useState(false)
  const [showTable, setShowTable] = useState(true)
  const [dataSrouce, setDataSrouce] = useState<Array<Idata>>([])

  const showTotal = () => {
    setTotalVisible(!totalVisible)
  }

  const showModal = (id?: string) => {
    const curRow = dataSrouce.find(item => item.id === id)
    setRowData(curRow)
    setVisible(!visible)
  }

  const getList = (page=0, size=10) => {
    getPacketsList({ page, size }).then(res => setDataSrouce(res.data))
  }

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
            async onOk() {
              const response = await deletePacketsItem(record.id)
              if (response.data.result) {
                getList()
                message.success('删除成功')
              } else {
                message.error('删除失败')
              }
            }
          })
        }}>删除</Button>
      </div>)
    }
  ]

  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <div className='container'>
        <Button.Group>
          <Button onClick={() => setShowTable(!showTable)}>切换图形</Button>
          <Button onClick={showTotal}>统计</Button>
          <Button onClick={() => showModal()}>新增</Button>
        </Button.Group>
        {!showTable && <Button.Group style={{ marginBottom: '15px' }}>
          <Button onClick={() => setType('income')}>收入</Button>
          <Button onClick={() => setType('expend')}>支出</Button>
          <Button onClick={() => setType('all')}>全部</Button>
        </Button.Group>}
      </div>
      {!showTable && <Timeline>
        {dataSrouce.map((item, index) => {
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
        getList={getList}
      />
    </div>
  )
}

export default Packets