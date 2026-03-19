import React from 'react'
import TheatreList from './TheatreList/TheatreList'
import {Tabs} from 'antd'

const Partner = () => {
    const items = [
        {
            key: 'theatres',
            label: 'Theatres',
            children: <TheatreList />
        }
    ]
  return (
    <div style={{ padding: "25px" }}>
        <h1>Partner Page</h1>
        <Tabs items={items} />
    </div>
  )
}

export default Partner