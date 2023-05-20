import { Layout } from 'antd';
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Protected from "../config/ProtectedRoutes";

// START OF BORROWER SCREENS AND NAVBAR
// import NavBar from '../components/Borrower/NavBar';
// import SideNav from '../components/Borrower/SideNav';

import Login from './Login'
import UserList from './Admin/Users/UserList';
import AddUser from './Admin/Users/AddUser';
import EmployeeList from './Admin/Employees/EmployeeList';
import AddEmployee from './Admin/Employees/AddEmployee';
import SubjectsList from './Admin/Subjects/SubjectsList';
import AddSubject from './Admin/Subjects/AddSubject';
import QuestionareSubjectList from './Admin/Questionare/QuestionareSubjectList';
import QuestionaresList from './Admin/Questionare/QuestionaresList';
import AddQuestion from './Admin/Questionare/AddQuestion';
import ExamsList from './Admin/Exams/ExamsList';
import AdminViewExam from './Admin/Exams/AdminViewExam';
import AddExam from './Admin/Exams/AddExam';
import ResultsExamsList from './Admin/Results/ResultsExamsList';
import RevieweeResultsList from './Admin/Results/RevieweeResultsList';
import ViewRevieweeResult from './Admin/Results/ViewRevieweeResult';
import ExamRevieweesList from './Admin/Exams/ExamRevieweesList';
import RevieweeViewExam from './Reviewee/Exams/RevieweeViewExam';
import ResultsList from './Reviewee/Results/ResultsList';
import ViewResult from './Reviewee/Results/ViewResult';
import EditUser from './Admin/Users/EditUser';
import EditEmployee from './Admin/Employees/EditEmployee';
import EditSubject from './Admin/Subjects/EditSubject';
import EditQuestion from './Admin/Questionare/EditQuestion';
import ExamRoom from './Reviewee/Exams/ExamRoom';
import Register from './Register';
import TopicsList from './Admin/Topics/TopicsList';
import AddTopic from './Admin/Topics/AddTopic';
import EditTopic from './Admin/Topics/EditTopic';
import QuestionnareTopicsList from './Admin/Questionare/QuestionnareTopicsList';
import ViewQuestion from './Admin/Questionare/ViewQuestion';
import ExamSubjectList from './Admin/Exams/ExamSubjectList';
import ExamTopicsList from './Admin/Exams/ExamTopicsList';
import RevieweeExamSubjectList from './Reviewee/Exams/RevieweeExamSubjectList';
import RevieweeExamTopicsList from './Reviewee/Exams/RevieweeExamTopicsList';
import RevieweeExamsList from './Reviewee/Exams/RevieweeExamsList';


const Pages = () => {
    const login = JSON.parse(localStorage.getItem("userStore"))
    const userType = login ? login.userType : "";
    const isLoggedIn = login ? login.loginStatus : false

    console.log(userType);

    return (
        <>
            <BrowserRouter>
                <Routes>

                    

                    {/* REVIEWEE */}
                   

                    {/* ResultsList */}

                </Routes>
            { userType === "" ? (
                <Routes>
                    <Route path={"/"} element={<Login />} />
                    <Route path={"/register"} element={<Register />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            ) : userType === "REVIEWEE" ? (
               <>
                {
                    <Routes>
                        <Route path={"/exams/subjects"} element={<RevieweeExamSubjectList />} />
                        <Route path={"/exams/subjects/:id/topics"} element={<RevieweeExamTopicsList />} />
                        <Route path={"/exams/subjects/:id/topics/:topicID/exams"} element={<RevieweeExamsList />} />
                        <Route path={"/exams/subjects/:id/topics/:topicID/exams/:examID/exam-room"} element={<ExamRoom />} />
                        
                        <Route path={"/exams/:id"} element={<RevieweeViewExam />} />

                        <Route path={"/results"} element={<ResultsList />} />
                        <Route path={"/results/:id"} element={<ViewResult />} />
                        <Route path='*' element={<Navigate to='/exams/subjects' />} />
                    </Routes>
                }
               </>
            ) : (
                <>
                    {
                        userType === 'SUPERADMIN' ? (
                            <Routes>
                                <Route path={"/admin/users"} element={<UserList />} />
                                <Route path={"/admin/users/add"} element={<AddUser />} />
                                <Route path={"/admin/users/edit/:id"} element={<EditUser />} />

                                <Route path={"/admin/employees"} element={<EmployeeList />} />
                                <Route path={"/admin/employees/add"} element={<AddEmployee />} />
                                <Route path={"/admin/employees/edit/:id"} element={<EditEmployee />} />

                                <Route path={"/admin/subjects"} element={<SubjectsList />} />
                                <Route path={"/admin/subjects/add"} element={<AddSubject />} />
                                <Route path={"/admin/subjects/:id/topics"} element={<TopicsList />} />
                                <Route path={"/admin/subjects/:id/topics/:topicID/edit"} element={<EditTopic />} />
                                <Route path={"/admin/subjects/:id/topics/add"} element={<AddTopic />} />
                                <Route path={"/admin/subjects/edit/:id"} element={<EditSubject />} />

                                <Route path={"/admin/questionnaires/subjects"} element={<QuestionareSubjectList />} />
                                {/* <Route path={"/admin/questionnaires/subjects/:id"} element={<QuestionaresList />} /> */}
                                <Route path={"/admin/questionnaires/subjects/:id/topics"} element={<QuestionnareTopicsList />} />
                                <Route path={"/admin/questionnaires/subjects/:id/topics/:topicID/questions"} element={<QuestionaresList />} />
                                <Route path={"/admin/questionnaires/subjects/:id/topics/:topicID/questions/add"} element={<AddQuestion />} />
                                <Route path={"/admin/questionnaires/subjects/:id/topics/:topicID/questions/:questionID/view"} element={<ViewQuestion />} />
                                <Route path={"/admin/questionnaires/subjects/:id/topics/:topicID/questions/:questionID/edit"} element={<EditQuestion />} />
                                <Route path={"/admin/questionnaires/subjects/:id/edit/:questionID"} element={<EditQuestion />} />

                                <Route path={"/admin/exams/subjects"} element={<ExamSubjectList />} />
                                <Route path={"/admin/exams/subjects/:id/topics"} element={<ExamTopicsList />} />
                                <Route path={"/admin/exams/subjects/:id/topics/:topicID/exams"} element={<ExamsList />} />
                                <Route path={"/admin/exams/subjects/:id/topics/:topicID/exams/add"} element={<AddExam />} />
                                <Route path={"/admin/exams/:id/reviewee-list"} element={<ExamRevieweesList />} />
                                <Route path={"/admin/exams/view/:id"} element={<AdminViewExam />} />

                                <Route path={"/admin/results"} element={<ResultsExamsList />} />
                                <Route path={"/admin/results/:id"} element={<RevieweeResultsList />} />
                                <Route path={"/admin/results/:id/reviewee/:id"} element={<ViewRevieweeResult />} />
                                <Route path='*' element={<Navigate to='/admin/users' />} />
                            </Routes>
                        ) : (
                            <Routes>
                                <Route path={"/admin/users"} element={<UserList />} />

                                <Route path={"/admin/subjects"} element={<SubjectsList />} />
                                <Route path={"/admin/subjects/:id/topics"} element={<TopicsList />} />
                                <Route path={"/admin/subjects/:id/topics/add"} element={<AddTopic />} />
                                <Route path={"/admin/subjects/:id/topics/:topicID/edit"} element={<EditTopic />} />

                                <Route path={"/admin/questionnaires/subjects"} element={<QuestionareSubjectList />} />
                                <Route path={"/admin/questionnaires/subjects/:id/topics"} element={<QuestionnareTopicsList />} />
                                <Route path={"/admin/questionnaires/subjects/:id/topics/:topicID/questions"} element={<QuestionaresList />} />
                                <Route path={"/admin/questionnaires/subjects/:id/topics/:topicID/questions/:questionID/view"} element={<ViewQuestion />} />
                                <Route path={"/admin/questionnaires/subjects/:id/topics/:topicID/questions/:questionID/edit"} element={<EditQuestion />} />
                                <Route path={"/admin/questionnaires/subjects/:id/edit/:questionID"} element={<EditQuestion />} />

                                <Route path={"/admin/exams/subjects"} element={<ExamSubjectList />} />
                                <Route path={"/admin/exams/subjects/:id/topics"} element={<ExamTopicsList />} />
                                <Route path={"/admin/exams/subjects/:id/topics/:topicID/exams"} element={<ExamsList />} />
                                <Route path={"/admin/exams/subjects/:id/topics/:topicID/exams/add"} element={<AddExam />} />
                                <Route path={"/admin/exams/:id/reviewee-list"} element={<ExamRevieweesList />} />
                                {/* <Route path={"/admin/exams/view/:id"} element={<AdminViewExam />} /> */}

                                <Route path={"/admin/results"} element={<ResultsExamsList />} />
                                <Route path={"/admin/results/:id"} element={<RevieweeResultsList />} />
                                <Route path={"/admin/results/:id/reviewee/:id"} element={<ViewRevieweeResult />} />
                                <Route path='*' element={<Navigate to='/admin/users' />} />
                            </Routes>
                        )
                    }
                </>
            )}
            </BrowserRouter>
        </>
    )
}

export default Pages;