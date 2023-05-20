import React, { useState } from 'react';
import { Progress, Space, Table, Tag } from 'antd';
import {
  EyeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';
import moment from 'moment';

const RevieweeResultsListTable = (({data}) => {
  // data = [
  //   {
  //     id: '1',
  //     examID: 'EX-89187238',
  //     subjectID: 'MATH',
  //     score: '10 / 10',
  //     performanceRate: 'AVERAGE',
  //     status: 'PASSED',
  //     scheduledDate: 'May 9, 2023',
      
  //   }
  // ]
  const columns = [
    {
      title: 'Exam ID',
      dataIndex: 'exam',
      key: 'examNumber',
      render: (exam) => (
        <span>{exam.examNumber}</span>
      )
    },
    {
      title: 'Subject',
      dataIndex: 'exam',
      key: 'subject',
      render: (exam) => (
        <span>{exam.subject.title}</span>
      )
    },
    {
      title: 'Topic',
      dataIndex: 'exam',
      key: 'topic',
      render: (exam) => (
        <span>{exam.topic.title}</span>
      )
    },
    {
      title: 'Difficulty Level',
      dataIndex: 'exam',
      key: 'difficultyLevel',
      render: (exam) => (
        <Tag
          color={
            exam.difficultyLevel === 1
            ? "orange"
            : exam.difficultyLevel === 2
            ? "volcano"
            : "red"
          }
        >
          {exam.difficultyLevel === 1 ? "BEGINNER" : (exam.difficultyLevel === 2 ? "AVERAGE" : "ADVANCED")}
        </Tag>
      )
    },
    // {
    //   title: 'Score',
    //   dataIndex: 'score',
    //   key: 'score',
    // },
    // {
    //   title: 'Average Score',
    //   dataIndex: 'averageScore',
    //   key: 'averageScore',
    //   render: (averageScore) => (
    //     <Progress percent={parseFloat(averageScore)} size="small" status={parseFloat(averageScore) > 50 ? "active" : "exception"} />
    //   )
    // },
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
          <Link to={`/results/${id}`}><EyeOutlined /> View</Link>
        </Space>
        ),
    },
  ];

  return (
    <Table columns={columns} dataSource={cloneDeep(data)} loading={false}/>
  );
});

export default inject()(observer(RevieweeResultsListTable));