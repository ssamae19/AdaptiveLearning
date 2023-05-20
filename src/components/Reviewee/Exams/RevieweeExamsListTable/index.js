import React from 'react';
import { Space, Table, Tag, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const RevieweeExamsListTable = (({data, currentLessonStore}) => {
  const {id, topicID} = useParams() 
  const { Text } = Typography;

  const columns = [
    {
      title: 'Exam ID',
      dataIndex: 'examNumber',
      key: 'examNumber',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subjectID',
      render: (subject) => (
        <span>{subject.title}</span>
      )
    },
    {
      title: 'Advisor',
      dataIndex: 'subject',
      key: 'advisor',
      render: (subject) => (
        <span>{subject.employee?.firstName} {subject.employee?.middleName} {subject.employee?.lastName}</span>
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
      dataIndex: ['id', 'difficultyLevel', 'examNumber'],
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {Object.keys(currentLessonStore.currentLesson).length > 0 ? (
            (parseInt(record.difficultyLevel) <= (parseInt(currentLessonStore.currentLesson.difficultyLevel) + 1)) ? (
              <Link to={`/exams/subjects/${id}/topics/${topicID}/exams/${record.id}/exam-room`}>
                <Text type="success">Start Exam</Text>
              </Link>
            ):<></>
          ):(
            parseInt(record.difficultyLevel) === 1 ? (
              <Link to={`/exams/subjects/${id}/topics/${topicID}/exams/${record.id}/exam-room`}>
                <Text type="success">Start Exam</Text>
              </Link>
            ):<></>
          )}
        </Space>
        ),
    },
  ];

  return (
    <Table columns={columns} dataSource={data} loading={false}/>
  );
});

export default inject('currentLessonStore')(observer(RevieweeExamsListTable));