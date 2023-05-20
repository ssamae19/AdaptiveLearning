
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  WalletOutlined,
  HistoryOutlined,
  CreditCardOutlined,
  UserOutlined,
  ClusterOutlined,
  MailOutlined,
  QrcodeOutlined,
  QuestionCircleOutlined,
  OrderedListOutlined,
  StockOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import logo from "../../assets/images/logo.png"

import './styles.scss'
import { useNavigate } from 'react-router-dom';

const SideNav = ({collapsed}) => {
    const { Sider } = Layout;
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userStore"))


    const revieweeItems = [
        {
            key: 'exams/subjects',
            icon: <OrderedListOutlined />,
            label: 'Exams',
        },
        {
            key: 'results',
            icon: <StockOutlined />,
            label: 'Results',
        },
    ]

    const adminItems = [
        {
            key: 'admin/users',
            icon: <UserOutlined />,
            label: 'Reviewees',
        },
        {
            key: 'admin/employees',
            icon: <ClusterOutlined />,
            label: 'Employees',
        },
        {
            key: 'admin/subjects',
            icon: <InfoCircleOutlined />,
            label: 'Subjects',
        },
        {
            key: 'admin/questionnaires/subjects',
            icon: <QuestionCircleOutlined />,
            label: 'Questionnaire',
        },
        {
            key: 'admin/exams/subjects',
            icon: <OrderedListOutlined />,
            label: 'Exams',
        },
        {
            key: 'admin/results',
            icon: <StockOutlined />,
            label: 'Reviewee Results',
        },
    ]

    const employeeItems = [
        {
            key: 'admin/users',
            icon: <UserOutlined />,
            label: 'Reviewees',
        },
        {
            key: 'admin/subjects',
            icon: <InfoCircleOutlined />,
            label: 'Subjects',
        },
        {
            key: 'admin/questionnaires/subjects',
            icon: <QuestionCircleOutlined />,
            label: 'Questionnaire',
        },
        {
            key: 'admin/exams/subjects',
            icon: <OrderedListOutlined />,
            label: 'Exams',
        },
        {
            key: 'admin/results',
            icon: <StockOutlined />,
            label: 'Reviewee Results',
        },
    ]

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo">
                {!collapsed ? <img src={logo} alt=''/> : <></>}
            </div>
            <div className='space'/>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                onClick={({ item, key, keyPath, domEvent }) => navigate(`/${key}`)}
                items={user.userType === "REVIEWEE" ? revieweeItems : (user.userType === "SUPERADMIN" ? adminItems : (user.userType === "EMPLOYEE" ? employeeItems : []))}
            />
        </Sider>
    );
};
export default SideNav;