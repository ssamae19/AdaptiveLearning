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

const AdminQuestionaresListTable = (({data, questionBankStore}) => {
  const { id, topicID } = useParams();

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color='geekblue'>
          {type === "TRUE_OR_FALSE" ? "True or False" : (type === "MULTIPLE_CHOICE" ? "Multiple Choice" : "Definition")}
        </Tag>
      )
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
    },
    // {
    //   title: 'Answer',
    //   dataIndex: 'answer',
    //   key: 'answer',
    // },
    // {
    //   title: 'Options',
    //   dataIndex: 'options',
    //   key: 'options',
    //   render: (options) => (
    //     options ? (
    //       <div>
    //         <p><strong>A.</strong> {options.a}</p>
    //         <p><strong>B.</strong> {options.b}</p>
    //         <p><strong>C.</strong> {options.c}</p>
    //         <p><strong>D.</strong> {options.d}</p>
    //       </div>
    //     ): <span>N/A</span>
    //   )
    // },
    // {
    //   title: 'To Review',
    //   dataIndex: 'toLearn',
    //   key: 'toLearn',
    // },
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
      render: (qID) => (
        <Space size="middle">
          <Link to={`/admin/questionnaires/subjects/${id}/topics/${topicID}/questions/${qID}/view`}><EyeOutlined /> View</Link>
          <Link to={`/admin/questionnaires/subjects/${id}/topics/${topicID}/questions/${qID}/edit`}><EditOutlined /> Edit</Link>
          <Popconfirm
            title="Delete question"
            description="Are you sure to delete this question?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={async() => {
              await questionBankStore.deleteQuestion(qID)
              setTimeout(() => {
                questionBankStore.getQuestionsBySubject(id)
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

export default inject('questionBankStore')(observer(AdminQuestionaresListTable));