import React, { useState } from 'react';
import { Space, Table } from 'antd';
import {
  EyeOutlined,
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const AdminExamTopicsListTable = (({data, currentLessonStore}) => {
  const user = JSON.parse(localStorage.getItem("userStore"))

  const {id} = useParams()

  const [lastTopic, setLastTopic] = useState(0)
  const [openNewTopicIndex, setOpenNewTopicIndex] = useState(0)
  const [difficultyLevel, setDifficultyLevel] = useState(0)


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
      render: (topicID, record, index) => {
        const topic = currentLessonStore.currentLessons.find((currentLesson) => currentLesson.topicID === topicID)
        if(topic) {
          setLastTopic(topic)
          setOpenNewTopicIndex(index + 1)
          setDifficultyLevel(parseInt(topic.difficultyLevel))
        }
        return (
          <Space size="middle">
            {user.userType === "REVIEWEE" ? (
              currentLessonStore.currentLessons.length> 0 ? (
                topic ? (
                  <Link to={`/exams/subjects/${id}/topics/${topicID}/exams`}><EyeOutlined /> View Exams</Link>
                ):(
                  (openNewTopicIndex === index && parseInt(lastTopic.difficultyLevel) === 3) ? (
                    <Link to={`/exams/subjects/${id}/topics/${topicID}/exams`}><EyeOutlined /> View Exams</Link>
                  ):<></>
                )
              ):(
                index === 0 ? (
                  <Link to={`/exams/subjects/${id}/topics/${topicID}/exams`}><EyeOutlined /> View Exams</Link>
                ): <></>
              )
            ):(
              <Link to={`/admin/exams/subjects/${id}/topics/${topicID}/exams`}><EyeOutlined /> View Exams</Link>
            )}
          </Space>
        )
      },
  },
  ];

  return (
    <Table columns={columns} dataSource={cloneDeep(data)} loading={false}/>
  );
});

export default inject('topicStore','currentLessonStore')(observer(AdminExamTopicsListTable));