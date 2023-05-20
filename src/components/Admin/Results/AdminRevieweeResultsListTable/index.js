import React, { useState } from 'react';
import { Progress, Space, Table, Tag } from 'antd';
import {
  EyeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const AdminRevieweeResultsListTable = (({data}) => {
  const columns = [
    {
      title: 'Reviewee ID',
      dataIndex: 'reviewee',
      key: 'idNumber',
      render: (reviewee) =>(
        <span>{reviewee.idNumber}</span>
      )
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Average Score',
      dataIndex: 'averageScore',
      key: 'averageScore',
      render: (averageScore) => (
        <Progress percent={parseFloat(averageScore)} size="small" status={parseFloat(averageScore) > 50 ? "active" : "exception"} />
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === "PASSED" ? "green" : "red"}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: (id, record) => (
        <Space size="middle">
          <Link to={`/admin/results/${id}/reviewee/${id}`}><EyeOutlined /> View</Link>
        </Space>
        ),
    },
  ];

  return (
    <Table columns={columns} dataSource={cloneDeep(data)} loading={false}/>
  );
});

export default inject()(observer(AdminRevieweeResultsListTable));