import React from 'react';
import { Popconfirm, Space, Table, Tag, Typography } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const AdminExamsListTable = (({data, examStore}) => {
  const {id, topicID} = useParams()

  const columns = [
    {
      title: 'Exam ID',
      dataIndex: 'examNumber',
      key: 'examNumber',
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
      render: (examID) => (
        <Space size="middle">
          {/* <Link to={`/admin/exams/subjects/${id}/topics/${topicID}/exams/${examID}/view`}><EyeOutlined /> View</Link> */}
          {/* <Link to={`/admin/exams/subjects/${id}/topics/${topicID}/exams/${examID}/edit`}><EditOutlined /> Edit</Link> */}
          <Popconfirm
            title="Delete Exam"
            description="Are you sure to delete this exam?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={async() => {
              await examStore.deleteExam(examID)
              setTimeout(() => {
                examStore.getExams(topicID)
              },1000)
            }}
            okText="Yes"
          >
            <Typography.Link type='danger'><DeleteOutlined /> Delete</Typography.Link>
          </Popconfirm>
        </Space>
        ),
    },
  ];

  return (
    <Table columns={columns} dataSource={cloneDeep(data)} loading={false}/>
  );
});

export default inject('examStore')(observer(AdminExamsListTable));