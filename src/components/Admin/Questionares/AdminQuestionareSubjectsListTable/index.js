import React from 'react';
import { Space, Table } from 'antd';
import {
  EyeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const AdminQuestionareSubjectsListTable = (({data}) => {
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
            <Link to={`/admin/questionnaires/subjects/${id}/topics`}><EyeOutlined /> View Questionnaire Topics</Link>
        </Space>
      ),
  },
  ];

  return (
    <Table columns={columns} dataSource={cloneDeep(data)} loading={false}/>
  );
});

export default inject()(observer(AdminQuestionareSubjectsListTable));