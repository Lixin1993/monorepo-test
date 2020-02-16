import React, { useState } from 'react'
import { Modal, Button } from 'antd'

const RenovationSoft = () => {
  const [visible,  setVisible] = useState(false)
  return (
    <div>
      <Button onClick={() => setVisible(true)}>open</Button>
      <Modal visible={visible} onCancel={() => setVisible(false)} />
    </div>
  )
  
}

export default RenovationSoft