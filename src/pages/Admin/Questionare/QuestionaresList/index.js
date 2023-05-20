import React, { useEffect, useState } from 'react';
import { Button, Divider, Row, Layout, Popconfirm, Upload, message, Col } from 'antd';
import {
  UserAddOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import AdminQuestionaresListTable from '../../../../components/Admin/Questionares/AdminQuestionaresListTable';

import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';
import CSVReader from 'react-csv-reader';

const QuestionaresList = (({questionBankStore}) => {
    const navigate = useNavigate()
    const { id, topicID } = useParams();
    const { Content } = Layout;
    const user = JSON.parse(localStorage.getItem("userStore"))

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        questionBankStore.getQuestionsBySubjectTopic(id, topicID)
    },[])

    const props = {
        name: 'document',
        multiple: false,
        beforeUpload: (file) => {
            console.log(file.type)
            const isCSV = file.type === 'text/csv';
                if (!isCSV) {
                    message.error('You can only upload CSV file!');
                    return false;
                } else {
                    return true;
                }
        },
        customRequest: async (info) => {
            let formData = new FormData();
            formData.append('subjectID', id)
            formData.append('topicID', topicID)
            formData.append('document', info.file)
            
            await questionBankStore.uploadFile(formData)

            setTimeout(() => {
                if(questionBankStore.isSuccess) {
                    info.onSuccess("ok")
                    message.success("Questions Successfully Uploaded!")

                    setTimeout(() => {
                        questionBankStore.isSuccess = false
                        questionBankStore.getQuestionsBySubjectTopic(id, topicID)
                    }, 500)
                } else {
                    info.onError("error")
                }
            }, 1000);

        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log("uploading")
            }
            if (status === 'done') {
                console.log("done")
            } else if (status === 'error') {
                console.log("error")
            }
        },
        onDrop(e) {
            console.log("drop")
        },
    };

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='borrower-loans'>
                        <Row justify={'space-between'}>
                            <h3>List of Questionnaire</h3>
                            <Row gutter={10}>
                                <Col>
                                    <Link to={`/admin/questionnaires/subjects/${id}/topics/${topicID}/questions/add`}>
                                        <Button type='primary'><UserAddOutlined /> Add New Question</Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Upload {...props} showUploadList={false}>
                                        <Button type='primary' danger ghost className='upload-btn' icon={<UploadOutlined />}> Bulk Upload Questions (CSV File)</Button>
                                    </Upload>
                                </Col>
                            </Row>
                        </Row>
                        <Divider/>
                        <AdminQuestionaresListTable data={cloneDeep(questionBankStore.questions)} />
                        <Row justify={'end'}>
                            <Button type='primary' onClick={()=> navigate(-1)}>Back</Button>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('questionBankStore')(observer(QuestionaresList))