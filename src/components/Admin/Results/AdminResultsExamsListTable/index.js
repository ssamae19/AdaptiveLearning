import React, { useState } from 'react';
import { message, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';
import moment from 'moment';

const AdminResultsExamsListTable = (({data}) => {

  const columns = [
    {
      title: 'Exam ID',
      dataIndex: 'examNumber',
      key: 'examNumber',
    },
    {
      title: 'Advisor',
      dataIndex: 'subject',
      key: 'employee',
      render: (subject) => (
        <span>{subject.employee?.firstName} {subject.employee?.middleName} {subject.employee?.lastName}</span>
      )
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (subject) => (
        <span>{subject.title}</span>
      )
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      key: 'topic',
      render: (topic) => (
        <span>{topic.title}</span>
      )
    },
    {
      title: 'Difficulty Level',
      dataIndex: 'difficultyLevel',
      key: 'difficultyLevel',
      render: (difficultyLevel) => (
        <Tag
          color={
            difficultyLevel === "1"
            ? "orange"
            : difficultyLevel === "2"
            ? "volcano"
            : "red"
          }
        >
          {difficultyLevel === "1" ? "BEGINNER" : (difficultyLevel === "2" ? "AVERAGE" : "ADVANCED")}
        </Tag>
      )
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: (id, record) => (
        <Space size="middle">
          <Link to={`/admin/results/${id}`}><EyeOutlined /> View Reviewee Results</Link>
        </Space>
        ),
    },
  ];

  return (
    <Table columns={columns} dataSource={cloneDeep(data)} loading={false}/>
  );
});

export default inject()(observer(AdminResultsExamsListTable));