import React, { useState } from 'react';
import { message, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserDeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const AdminRevieweeListTable = (({data, userStore}) => {
  const user = JSON.parse(localStorage.getItem("userStore"))

  const onChangeUserStatus = async(user) => {
    let status

    if(user.status === "ACTIVE") {
      status = "DEACTIVATED"
    } else if(user.status === "DEACTIVATED") {
       status = "ACTIVE"
    }

    await userStore.updateUser(
      user.id,
      {
        ...user,
        'status': status
      }
    )

      userStore.getUsers('REVIEWEE')
  }

  const columns = [
    {
      title: 'Student Number',
      dataIndex: 'idNumber',
      key: 'idNumber',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Middle Name',
      dataIndex: 'middleName',
      key: 'middleName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
          <>
            <Tag
              color={
                status === "PENDING"
                ? "blue"
                : status === "ACTIVE"
                ? "green"
                : "red"
              }
            >
              {status}
            </Tag>
          </>
        ),
    },
    {
        title: 'Action',
        dataIndex: 'id',
        key: 'action',
        render: (id, record) => (
        <Space size="middle">
            {/* <Link to={`/admin-users/view/${id}`}><EyeOutlined /> View</Link> */}
            {user.userType === "SUPERADMIN" ? (
              <>
                <Link to={`/admin/users/edit/${id}`}><EditOutlined />Edit</Link>
                  {record.status === "ACTIVE" ? (
                    <Popconfirm
                      title="Deactivate employee"
                      description="Are you sure to deactivate this employee?"
                      onConfirm={() => onChangeUserStatus(record)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Typography.Link type='danger'><UserDeleteOutlined /> Deactivate</Typography.Link>
                    </Popconfirm>
                  ):(
                    <Popconfirm
                      title="Activate employee"
                      description="Are you sure to activate this employee?"
                      onConfirm={() => onChangeUserStatus(record)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Typography.Link type='success'><UserDeleteOutlined /> Activate</Typography.Link>
                    </Popconfirm>
                  )}


                  <Popconfirm
                    title="Delete Employee"
                    description="Are you sure to delete this Employee?"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={async() => {
                      await userStore.deleteUser(id)
                      setTimeout(() => {
                        userStore.getUsers('REVIEWEE')
                      },1000)
                    }}
                    okText="Yes"
                  >
                    <Typography.Link type='danger'><DeleteOutlined /> Delete</Typography.Link>
                  </Popconfirm>
              </>
            ):<></>}
        </Space>
        ),
    },
  ];

  const columnsEmployee = [
    {
      title: 'Student Number',
      dataIndex: 'idNumber',
      key: 'idNumber',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Middle Name',
      dataIndex: 'middleName',
      key: 'middleName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
          <>
            <Tag
              color={
                status === "PENDING"
                ? "blue"
                : status === "ACTIVE"
                ? "green"
                : "red"
              }
            >
              {status}
            </Tag>
          </>
        ),
    },
  ];

  return (
    <Table columns={user.userType === "SUPERADMIN" ? columns : columnsEmployee} dataSource={cloneDeep(data)} loading={false}/>
  );
});

export default inject('userStore')(observer(AdminRevieweeListTable));