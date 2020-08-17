import React, { useState, useEffect } from 'react'
import { Table, Button, Icon, message, Modal } from 'antd'
import ModalItem from './modalItem'
import ChartModal from './chart'
import { getRenovationBaseList, ITableSetting, deleteRenovationBaseItem, IItemDataSource } from '../../api/renovation'
import { IResponse } from '../../api/initHttp'

const { confirm } = Modal

export interface IDataSource {
  id: string,
  type: string,
  name: string,
  typeName: string,
  price: number,
  total: number,
}

const createDataSource = (data: Array<IItemDataSource> | undefined): Array<IDataSource> | [] => {
  if (!data) {
    return []
  }
  const types = [...new Set(data.map((item: IItemDataSource) => item.type))]
  const dataSource = types.map(item => {
    const typeNameItem = data.find((itemData: IItemDataSource) => itemData.type === item)
    return {
      id: item,
      type: item,
      name: typeNameItem ? typeNameItem.typeName : '',
      typeName: typeNameItem ? typeNameItem.typeName : '',
      price: data.filter((itemData: IItemDataSource) => itemData.type === item).reduce((prv, itemData) => (prv + Number(itemData.price)), 0),
      total: data.filter((itemData: IItemDataSource) => itemData.type === item).length
    }
  })
  return dataSource
}

const RenovationBase = () => {
  const [itemDataSource, setItemDataSource] = useState<Array<IItemDataSource>>([])
  const [dataSource, setDataSource] = useState<Array<IDataSource>>([])
  const [itemId, setItemId] = useState('')
  const [visibleTableDataModal, setVisibleTableDataModal] = useState(false)
  const [visibleChartModal, setVisibleChartModal] = useState(false)
  const [tableSetting, setTableSetting] = useState<ITableSetting>({ page: 1, size: 10 })
  const [chartData, setChartData] = useState<Array<IItemDataSource | IDataSource>>([])

  const getData = () => {
    const payload = tableSetting
    getRenovationBaseList(payload).then((res: IResponse) => {
      if(res.code === 0) {
        setItemDataSource(res.data.list)
        setDataSource(createDataSource(res.data.list))
      }
    })
  }

  const createRowData = () => {
    setItemId('')
    setVisibleTableDataModal(true)
  }

  const itemColumns = [
    { title: '名称',  dataIndex: 'name' },
    { title: '金额', dataIndex: 'price' },
    {
      title: '操作',
      dataIndex: 'itemAction',
      render: (text: string, record: IItemDataSource) => (
        <span>
          <Button style={{ marginRight: '8px' }} onClick={() => {
            setItemId(record.id)
            setVisibleTableDataModal(true)
          }}>编辑</Button>
          <Button onClick={() => {
            confirm({
              title: `确定删除 ${record.name}， 这条记录吗？`,
              icon: <Icon type="close-circle" />,
              async onOk() {
                const response = await deleteRenovationBaseItem(record.id)
                if (response.data.result) {
                  getData()
                  message.success('删除成功')
                } else {
                  message.error('删除失败')
                }
              },
            });
          }}>删除</Button>
        </span>
      )
    }
  ]

  const columns = [
    { title: '类型', dataIndex: 'typeName' },
    { title: '合计金额', dataIndex: 'price' },
    { title: '项目数量', dataIndex: 'total' },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text: string, record: IDataSource) => (
        <Button style={{ marginRight: '12px' }} onClick={() => {
          const data = itemDataSource.filter((item: IItemDataSource) => item.type === record.type)
          setChartData(data)
          setVisibleChartModal(true)
        }}><Icon type={'bar-chart'} />分类图表展示</Button>
      )
    }
  ]

  useEffect(getData, [])

  return (
    <div>
      <ModalItem
        id={itemId}
        visible={visibleTableDataModal}
        setVisible={setVisibleTableDataModal}
        data={itemDataSource}
        getData={getData}
      />
      <ChartModal
        data={chartData}
        visible={visibleChartModal}
        setVisible={setVisibleChartModal}
      />
      <div style={{ marginBottom: '8px' }}>
        <Button onClick={createRowData} style={{ marginRight: '12px' }}><Icon type={'plus'} />新增项目</Button>
        <Button onClick={() => {
          setChartData(createDataSource(itemDataSource))
          setVisibleChartModal(true)
        }}><Icon type={'bar-chart'} />类型图表展示</Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={record => record.id}
        pagination={{
          defaultCurrent: tableSetting.page,
          pageSize: tableSetting.size,
          showSizeChanger: true,
          showQuickJumper: true,
          total: dataSource.length,
          onChange: (page, pageSize) => setTableSetting({ page, size: pageSize }),
          onShowSizeChange: (current, size) => setTableSetting({ page: current, size }),
          showTotal: total => `一共 ${total} 项`,
        }}
        expandedRowRender={(record: any) => {
          return <Table rowKey={record => record.id} pagination={false} dataSource={itemDataSource.filter((item: IItemDataSource) => item.type === record.type)} columns={itemColumns} />
        }}
      />
    </div>
  )
}

export default RenovationBase