import React, { useRef, useEffect } from 'react'
import { Modal } from 'antd'
import echarts from 'echarts/lib/echarts'
import { IDataSource } from './index'
import { IItemDataSource } from '../../../api/renovation'

interface IProps {
  data: Array<IDataSource | IItemDataSource>,
  visible: boolean,
  setVisible: (params: boolean) => void,
}

const ChartModal = (props: IProps) => {
  const { visible, setVisible, data } = props
  const chartRef:any = useRef(undefined)

  useEffect(() => {
    setTimeout(() => {
      if (visible) {
        const charts = echarts.init(chartRef.current)
        charts.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}（{d}%）',
          },
          series: [{
            name: '金额',
            type: 'pie',
            data: data.map((item: (IDataSource | IItemDataSource)) => ({ name: item.name, value: item.price }))
          }]
        })
      }
    })
  })

  return (
    <Modal
      width={'70vw'}
      footer={undefined}
      title={'硬装金额统计表'}
      destroyOnClose
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div ref={chartRef} style={{ width: '70vw', height: '60vh' }}></div>
    </Modal>
  )
}

export default ChartModal