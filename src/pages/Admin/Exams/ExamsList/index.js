import React, { useEffect, useState } from 'react';
import { Button, Divider, Row, Layout } from 'antd';
import {
  UserAddOutlined
} from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import AdminExamsListTable from '../../../../components/Admin/Exams/AdminExamsListTable';

import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';

const ExamsList = (({examStore}) => {
    const user = JSON.parse(localStorage.getItem("userStore"))

    const {id, topicID} = useParams()
    const navigate = useNavigate()
    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [hasAllLevel, setHasAllLevel] = useState(false);


    useEffect(() => {
        examStore.getExams(topicID);
    },[])

    useEffect(() => {
        if(examStore.exams?.length === 3) {
            setHasAllLevel(true)
        } else {
            setHasAllLevel(false)
        }
    },[examStore.exams])

    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='borrower-loans'>
                        <Row justify={'space-between'}>
                            <h3>List of Exams</h3>
                            {!hasAllLevel ? (
                                <Link to={`/admin/exams/subjects/${id}/topics/${topicID}/exams/add`}>
                                    <Button type='primary'><UserAddOutlined /> Add New Exam</Button>
                                </Link>
                            ):<></>}
                        </Row>
                        <Divider/>
                        <AdminExamsListTable 
                            data={user.userType === "SUPERADMIN" ?
                            cloneDeep(examStore.exams)
                            : cloneDeep(examStore.exams.filter((exam) => exam.subject?.employee?.id === parseInt(user.userID)))
                         } 
                        />
                    </div>
                    <Divider/>
                    <Row justify={'end'}>
                        <Button type='primary' onClick={()=> navigate(-1)}>Back</Button>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('examStore')(observer(ExamsList))