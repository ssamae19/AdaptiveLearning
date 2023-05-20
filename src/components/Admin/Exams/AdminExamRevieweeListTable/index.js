import React, { useState } from 'react';
import { message, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserDeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const AdminExamRevieweeListTable = (({data, examRevieweesStore}) => {
  const user = JSON.parse(localStorage.getItem("userStore"))
  const {id} = useParams()

  const onChangeUserStatus = (user) => {
    let deactivated

    if(user.deactivated === "0") {
      deactivated = 1
    } else if(user.deactivated === "1") {
       deactivated = 0
    }

    // userStore.updateUser(
    //   user.id,
    //   {
    //     ...user,
    //     'deactivated': deactivated
    //   }
    // )

    // userStore.getUsers('BORROWER')
  }

  const columns = [
    {
      title: 'Student Number',
      dataIndex: 'reviewee',
      key: 'idNumber',
      render: (reviewee) => (
        <span>{reviewee.idNumber}</span>
      )
    },
    {
      title: 'Username',
      dataIndex: 'reviewee',
      key: 'username',
      render: (reviewee) => (
        <span>{reviewee.username}</span>
      )
    },
    {
      title: 'First Name',
      dataIndex: 'reviewee',
      key: 'firstName',
      render: (reviewee) => (
        <span>{reviewee.firstName}</span>
      )
    },
    {
      title: 'Middle Name',
      dataIndex: 'reviewee',
      key: 'middleName',
      render: (reviewee) => (
        <span>{reviewee.middleName}</span>
      )
    },
    {
      title: 'Last Name',
      dataIndex: 'reviewee',
      key: 'lastName',
      render: (reviewee) => (
        <span>{reviewee.lastName}</span>
      )
    },
    {
        title: 'Action',
        dataIndex: 'id',
        key: 'action',
        render: (examRevieweeID, record) => (
        <Space size="middle">
            <Popconfirm
              title="Remove"
              description="Are you sure to remore this reviewee on exam?"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={async() => {
                await examRevieweesStore.deleteExamReviewee(examRevieweeID)
                setTimeout(() => {
                  examRevieweesStore.getExamReviewees(id)
                },1000)
              }}
              okText="Yes"
            >
              <Typography.Link type='danger'><DeleteOutlined /> Remove</Typography.Link>
            </Popconfirm>
        </Space>
        ),
    },
  ];

  return (
    <Table columns={columns} dataSource={cloneDeep(data)} loading={false}/>
  );
});

export default inject('examRevieweesStore')(observer(AdminExamRevieweeListTable));