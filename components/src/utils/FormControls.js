import React from 'react'
import { Button, Form, Input } from 'antd'

const { Search } = Input

const FormControls = ({onSubmit}) => {

    return (
        <Search placeholder="Enter Wallet Address or ENS" onSearch={onSubmit} enterButton
        style={{
            width: 500,
        }}/>
    )
}

export default FormControls
