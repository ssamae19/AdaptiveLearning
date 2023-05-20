import React from 'react';
import { Popconfirm, Space, Table, Typography } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const AdminSubjectsListTable = (({data, subjectStore}) => {
  const user = JSON.parse(localStorage.getItem("userStore"))

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Advisor',
      dataIndex: 'employee',
      key: 'title',
      render: (employee) => (
        <span>{employee.firstName} {employee.middleName} {employee.lastName}</span>
      )
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: (id) => (
      <Space size="middle">
          <Link to={`/admin/subjects/${id}/topics`}><EyeOutlined /> View Topics</Link>
          {user.userType === "SUPERADMIN" ? (
            <>
              <Link to={`/admin/subjects/edit/${id}`}><EditOutlined />Edit</Link>
              <Popconfirm
                title="Delete subject"
                description="Are you sure to delete this subject?"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={async() => {
                  await subjectStore.deleteSubject(id)
                  setTimeout(() => {
                    subjectStore.getSubjects()
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

  return (
    <Table columns={columns} dataSource={cloneDeep(data)} loading={false}/>
  );
});

export default inject('subjectStore')(observer(AdminSubjectsListTable));