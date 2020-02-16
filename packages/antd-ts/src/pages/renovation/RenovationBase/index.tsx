import React, { useState, useEffect } from 'react'
import { Table, Button, Icon, message, Modal } from 'antd'
import ModalItem from './modalItem'
import ChartModal from './chart'
import { getRenovationBaseList, ITableSetting, deleteRenovationBaseItem, IItemDataSource } from '../../../api/renovation'
import { IResponse } from '../../../api/initHttp'

const { confirm } = Modal

export interface IDataSource {
  key: string,
  type: string,
  name: string,
  typeName: string,
  price: number,
  total: number,
}

const createDataSource = (data: Array<IItemDataSource> | undefined): Array<IDataSource> | [] => {
  if (!data) return []
  const types = [...new Set(data.map((item: IItemDataSource) => item.type))]
  const dataSource = types.map(item => {
    const typeNameItem = data.find((itemData: IItemDataSource) => itemData.type === item)
    return {
      key: item,
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
  const [itemKey, setItemKey] = useState('')
  const [visibleTableDataModal, setVisibleTableDataModal] = useState(false)
  const [visibleChartModal, setVisibleChartModal] = useState(false)
  const [tableSetting, setTableSetting] = useState<ITableSetting>({ page: 1, size: 10 })
  const [chartData, setChartData] = useState<Array<IItemDataSource | IDataSource>>([])

  const itemColumns = [
    { title: '名称',  dataIndex: 'name',  key: 'name' },
    { title: '金额', dataIndex: 'price', key: 'price' },
    {
      title: '操作',
      dataIndex: '',
      key: 'action',
      render: (record: IItemDataSource) => (
        <span>
          <Button style={{ marginRight: '8px' }} onClick={() => {
            setItemKey(record.key)
            setVisibleTableDataModal(true)
          }}>编辑</Button>
          <Button onClick={() => {
            confirm({
              title: `确定删除 ${record.name}， 这条记录吗？`,
              icon: <Icon type="close-circle" />,
              async onOk() {
                const response = await deleteRenovationBaseItem(record.key)
                if (response.data.result) {
                  getData()
                  message.success('删除成功')
                } else {
                  message.error('删除失败')
                }
              },
              onCancel() {},
            });
            
          }}>删除</Button>
        </span>
      )
    }
  ]

  const columns = [
    { title: '类型', dataIndex: 'typeName', key: 'typeName' },
    { title: '合计金额', dataIndex: 'price', key: 'price' },
    { title: '项目数量', dataIndex: 'total', key: 'total' },
    {
      title: '操作',
      dataIndex: '',
      key: 'action',
      render: (record: IDataSource) => (
        <Button style={{ marginRight: '12px' }} onClick={() => {
          const data = itemDataSource.filter((item: IItemDataSource) => item.type === record.type)
          setChartData(data)
          setVisibleChartModal(true)
        }}><Icon type={'bar-chart'} />分类图表展示</Button>
      )
    }
  ]

  const getData = () => {
    const payload = tableSetting
    getRenovationBaseList(payload).then((res: IResponse) => {
      if(res.code === 0) {
        setItemDataSource(res.data.list)
        setDataSource(createDataSource(res.data.list))
      }
    })
  }

  useEffect(() => {getData() }, []) 

  return (
    <div>
      <ModalItem
        itemKey={itemKey}
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
        <Button onClick={() => setVisibleTableDataModal(true)} style={{ marginRight: '12px' }}><Icon type={'plus'} />新增项目</Button>
        <Button onClick={() => {
          setChartData(createDataSource(itemDataSource))
          setVisibleChartModal(true)
        }}><Icon type={'bar-chart'} />类型图表展示</Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
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
          return <Table pagination={false} dataSource={itemDataSource.filter((item: IItemDataSource) => item.type === record.type)} columns={itemColumns} />
        }}
      />
    </div>
  )
}



export default RenovationBase