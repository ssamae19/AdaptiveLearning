import React from 'react';
import { Button, Popconfirm, Space, Table, Typography } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const TopicsListTable = (({data, topicStore}) => {
  const {id} = useParams()

  const handleDownload = (fileUrl) => {
    window.open(`http://192.168.1.94${fileUrl}`, '_blank');
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Action',
      dataIndex: ['id','attachment'],
      key: 'action',
      render: (text, record) => (
      <Space size="middle">
          <Typography.Link onClick={() => handleDownload(record.attachment)}>
            <DownloadOutlined /> Download Lesson to Review
          </Typography.Link>
          <Link to={`/admin/subjects/${id}/topics/${record.id}/edit`}><EditOutlined /> Edit</Link>
          <Popconfirm
            title="Delete topic"
            description="Are you sure to delete this topic?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={async() => {
              await topicStore.deleteTopic(record.id)
              setTimeout(() => {
                topicStore.getTopics(id)
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

export default inject('topicStore')(observer(TopicsListTable));