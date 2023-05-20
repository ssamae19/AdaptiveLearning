import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Divider, Form, Input, Layout, Modal, Radio, Result, Row, Space, Tag, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import { inject, observer } from 'mobx-react';
import moment from 'moment';

const ExamRoom = (({examStore, questionBankStore, examResultStore, currentLessonStore}) => {
    const user = JSON.parse(localStorage.getItem("userStore"))

    const {id, topicID, examID} = useParams()
    const navigate = useNavigate()
  
    const { Content } = Layout;
    const [form] = Form.useForm()
    const [collapsed, setCollapsed] = useState(false);

    const [joinExamModal, setJoinExamModal] = useState(true);
    const [startTime, setStartTime] = useState()

    const [questions, setQuestions] = useState()
    const [currentQuestion, setCurrentQuestion] = useState()
    
    const [totalAnswers, setTotalAnswers] = useState(0)
    const [score, setScore] = useState(0)
    const [wrongAnswers, setWrongAnswers] = useState([])

    const [noQuestionLeft, setNoQuestionLeft] = useState(false)

    useEffect(() => {
        examStore.getExam(examID)
        setStartTime(moment())
    },[])

    useEffect(() => {
        if(Object.keys(examStore.exam).length > 0) {
            questionBankStore.getQuestionsBySubjectTopicRandom(id, topicID, parseInt(examStore.exam?.totalItems), examStore.exam?.difficultyLevel)
        }
    },[examStore.exam])

    useEffect(() => {
        if(questionBankStore.questions.length > 0) {
            const cquestion = questionBankStore.questions[0]
            setCurrentQuestion(cquestion)
            setQuestions(questionBankStore.questions.filter((question) => question.id !== cquestion.id))
        }
    },[questionBankStore.questions])

    useEffect(() => {
        if(totalAnswers === parseInt(examStore.exam.totalItems)){
            submitData()
        }
        console.log(totalAnswers, examStore.exam.totalItems)
    },[totalAnswers])

    const submitData = () => {

        const data = {
            examID: examID,
            revieweeID: user.userID,
            score: score,
            averageScore: ((score / examStore.exam.totalItems) * 50) + 50,
            status: score > (parseInt(examStore.exam.totalItems) / 2) ? "PASSED" : "FAILED",
            startTime: startTime.format('hh:mm A'),
            endTime: moment().format('hh:mm A'),
            wrongAnswers: wrongAnswers
        }

        examResultStore.createExamResult(data)
        
        // IF REVIEWEE PASSED THE EXAM
        if(score > (parseInt(examStore.exam.totalItems) / 2)) {
            currentLessonStore.createCurrentLesson({
                subjectID: id,
                topicID: topicID,
                difficultyLevel: parseInt(examStore.exam.difficultyLevel),
                revieweeID: user.userID,
            })
        }
    }

    const onSubmit = (values) => {
        if(values.answer === currentQuestion.answer) {
            // IF CORRECT ANSWER
            setScore(score + 1)
            // POP UP SUCCESS MESSAGE
            message.success("Answer correct!")
            // GET NEXT QUESTION
            nextQuestion()
        } else {
            // IF WRONG ANSWER
            
            const data = {
                questionID: currentQuestion.id,
                answer: values.answer
            }
    
            setWrongAnswers([...wrongAnswers, data])

            // POP UP ERROR MESSAGE
            message.error("Wrong answer!")
            // GET NEXT QUESTION
            nextQuestion()
        }

        setTotalAnswers(totalAnswers + 1)
    }

    const nextQuestion = () => {
        if(questions.length > 0) {
            const cquestion = questions[0]
            setCurrentQuestion(cquestion)
            setQuestions(questions.filter((question) => question.id !== cquestion.id))
        } else {
            setNoQuestionLeft(true)
        }
    }


    return (
        <Layout className='main-container'>
            <SideNav collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className='main-container-content'>
                    <div className='borrower-loans'>
                        <h3>Exam Details</h3>
                        <Divider/>
                        
                        {questionBankStore.questions.length > 0 ? (
                            <Col>
                                {totalAnswers !== parseInt(examStore.exam.totalItems) ? (
                                    !noQuestionLeft ? (
                                        <Form onFinish={onSubmit} form={form}>
                                            <Row gutter={25}>
                                                <Col span={8}>
                                                    <strong>Subject: </strong><span>{examStore.exam.subject?.title}</span>
                                                </Col>
                                                <Col span={8}>
                                                    <strong>Topic: </strong><span>{examStore.exam.topic?.title}</span>
                                                </Col>
                                                <Col span={8}>
                                                    <span style={{marginRight: 10}}>Exam Difficulty Level:</span>
                                                    <Tag
                                                        color={
                                                            examStore.exam.difficultyLevel === "1"
                                                            ? "orange"
                                                            : examStore.exam.difficultyLevel === "2"
                                                            ? "volcano"
                                                            : "red"
                                                        }
                                                    >
                                                        {examStore.exam.difficultyLevel === "1" ? "BEGINNER" : (examStore.exam.difficultyLevel === "2" ? "AVERAGE" : "ADVANCED")}
                                                    </Tag>
                                                </Col>
                                            </Row>
                                            
                                            <Divider/>
                                            <Alert
                                                message="Warning"
                                                description="Do not refresh. Answer will not be saved."
                                                type="warning"
                                                showIcon
                                                closable
                                            />
                                            <br/>
                                            <br/>

                                            {currentQuestion ? (
                                                <>
                                                    <Col align="center">
                                                        <strong>{currentQuestion?.question}</strong>
                                                        <br/>
                                                        <br/>
                                                        <Form.Item name="answer">
                                                            {currentQuestion.type === "MULTIPLE_CHOICE" ? (
                                                                <Radio.Group>
                                                                    <Space direction="vertical">
                                                                        <Radio value={'A'}>{currentQuestion.options.a}</Radio>
                                                                        <Radio value={'B'}>{currentQuestion.options.b}</Radio>
                                                                        <Radio value={'C'}>{currentQuestion.options.c}</Radio>
                                                                        <Radio value={'D'}>{currentQuestion.options.d}</Radio>
                                                                    </Space>
                                                                </Radio.Group>
                                                            ) : currentQuestion.type === "TRUE_OR_FALSE" ? (
                                                                <Radio.Group>
                                                                    <Radio value={'TRUE'}>True</Radio>
                                                                    <Radio value={'FALSE'}>False</Radio>
                                                                </Radio.Group>
                                                            ) : <Input style={{width: 200}} onInput={e => e.target.value = e.target.value.toUpperCase()}/>}
                                                        </Form.Item>
                                                        <Form.Item style={{marginTop:50}}>
                                                            <Button type="primary" htmlType="submit" loading={false}>
                                                                Next Question
                                                            </Button>
                                                        </Form.Item>
                                                    </Col>
                                                </>
                                            ):<></>}
                                        </Form>
                                    ): (
                                        <Result
                                            status="warning"
                                            title="No Question Left. Exam successfully finished!"
                                            subTitle="Please see your score on results page."
                                            extra={[
                                                <Button type="primary" onClick={() => navigate("/results")}>
                                                    Go to Results
                                                </Button>
                                            ]}
                                        />
                                    )
                                ): (
                                    <Result
                                        status="success"
                                        title="Exam successfully finished!"
                                        subTitle="Please see your score on results page."
                                        extra={[
                                            <Button type="primary" onClick={() => navigate("/results")}>
                                                Go to Results
                                            </Button>
                                        ]}
                                    />
                                )}
                            </Col>
                        ):(
                            <Result
                                status="error"
                                title="No prepared questions!"
                                subTitle="Please wait for the advisor to fill the questions for this exam."
                                extra={[
                                    <Button type="primary" onClick={() => navigate(-1)}>
                                        back
                                    </Button>
                                ]}
                            />
                        )}
                        <Modal
                            title="Please read this before start"
                            open={joinExamModal}
                            onCancel={() => {
                                navigate(-1)
                            }}
                            okText={"Start Exam"}
                            cancelText={"Take Exam Later"}
                            onOk={() => setJoinExamModal(false)}
                        >
                            <p>When taking an online exam, it's important to have a stable internet connection and a fully charged device. Before starting the exam, carefully read the instructions and questions, and answer each question to the best of your ability. It's crucial not to refresh the page during the exam, as doing so may disrupt the connection with the exam server and result in the loss of your answers. If you encounter any technical issues, don't panic. Remember not to close the exam window or navigate away from the page until you receive confirmation that your exam has been successfully submitted. Following these instructions will ensure that your exam is recorded accurately. </p>
                            <p>Additionally, the difficulty level of the questions may change based on your answers. This means that if you answer correctly, the next question may be more challenging, and if you answer incorrectly, the next question may be less challenging. Please keep this in mind while answering the questions.</p>
                        </Modal>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
})

export default inject('examStore','questionBankStore','examResultStore','currentLessonStore')(observer(ExamRoom))