import React from 'react';
import { Space, Table } from 'antd';
import {
  EyeOutlined,
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const AdminQuestionnaireListTable = (({data}) => {
  const {id} = useParams()

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
      render: (topicID) => (
      <Space size="middle">
          <Link to={`/admin/questionnaires/subjects/${id}/topics/${topicID}/questions`}><EyeOutlined /> View Questionnaires</Link>
      </Space>
      ),
  },
  ];

  return (
    <Table columns={columns} dataSource={cloneDeep(data)} loading={false}/>
  );
});

export default inject('topicStore')(observer(AdminQuestionnaireListTable));