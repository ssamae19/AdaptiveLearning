import React from 'react';
import { Space, Table } from 'antd';
import {
  EyeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const AdminExamSubjectsListTable = (({data}) => {
  const user = JSON.parse(localStorage.getItem("userStore"))
  
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: (id) => (
        <Space size="middle">
          {user.userType === "REVIEWEE" ? (
            <Link to={`/exams/subjects/${id}/topics`}><EyeOutlined /> View Exam Topics</Link>
          ): (
            <Link to={`/admin/exams/subjects/${id}/topics`}><EyeOutlined /> View Exam Topics</Link>
          )}
        </Space>
      ),
  },
  ];

  return (
    <Table columns={columns} dataSource={cloneDeep(data)} loading={false}/>
  );
});

export default inject()(observer(AdminExamSubjectsListTable));