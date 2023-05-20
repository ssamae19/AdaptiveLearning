import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Divider, Form, Input, Layout, Modal, Radio, Result, Space, Tag, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

// START OF BORROWER SCREENS AND NAVBAR
import NavBar from '../../../../components/NavBar';
import SideNav from '../../../../components/SideNav';

import { inject, observer } from 'mobx-react';
import moment from 'moment';

const ExamRoom = (({examStore, questionBankStore, examResultStore}) => {
    const user = JSON.parse(localStorage.getItem("userStore"))

    const {id} = useParams()
    const navigate = useNavigate()
  
    const { Content } = Layout;
    const [form] = Form.useForm()
    const [collapsed, setCollapsed] = useState(false);
    const [joinExamModal, setJoinExamModal] = useState(true);
    const [beginnerQ, setBeginnerQ] = useState()
    const [averageQ, setAverageQ] = useState()
    const [advancedQ, setAdvancedQ] = useState()

    const [currentQuestion, setCurrentQuestion] = useState()
    const [answers, setAnswers] = useState([])
    const [totalAnswers, setTotalAnswers] = useState(0)

    const [score, setScore] = useState(0)
    const [totalBeginnerScore, setTotalBeginnerScore] = useState(0)
    const [totalIntermediateScore, setTotalIntermediateScoreScore] = useState(0)
    const [totalAdvancedScore, setTotalAdvancedScoreScore] = useState(0)

    const [isAfter, setIsAfter] = useState(false);
    

    useEffect(() => {
        examStore.getExam(id)
    },[])

    useEffect(() => {
        questionBankStore.getQuestionsBySubject(examStore.exam.subjectID)
    },[examStore.exam])

    useEffect(() => {
        if(questionBankStore.questions.length > 0) {
            const beginner = questionBankStore.questions.filter((question) => question.difficultyLevel === "1")
            const question = beginner[0]
            setCurrentQuestion(question)
            setBeginnerQ(beginner.filter((begq) => begq.id !== question.id))
            setAverageQ(questionBankStore.questions.filter((question) => question.difficultyLevel === "2"))
            setAdvancedQ(questionBankStore.questions.filter((question) => question.difficultyLevel === "3"))
        }
    },[questionBankStore.questions])

    useEffect(() => {
        if(totalAnswers === parseInt(examStore.exam.totalItems)){
            submitData()
        }
    },[totalAnswers])

    const submitData = () => {
        let performanceRate = ""
        const advance = totalAdvancedScore * 3
        const average = totalIntermediateScore * 2
        const beginner = totalBeginnerScore * 1


        if(advance >= average && advance >= beginner){
            performanceRate = "ADVANCED"
        } else if (average >= advance && average >= beginner) {
            performanceRate = "AVERAGE"
        } else {
            performanceRate = "BEGINNER"
        }

        const data = {
            examID: id,
            revieweeID: user.userID,
            score: score,
            totalBeginnerScore: totalBeginnerScore,
            totalIntermediateScore: totalIntermediateScore,
            totalAdvancedScore: totalAdvancedScore,
            status: score > (parseInt(examStore.exam.totalItems) / 2) ? "PASSED" : "FAILED",
            performanceRate: performanceRate,
            answers: answers
        }

        examResultStore.createExamResult(data)
    }

    const onSubmit = async(values) => {
        const data = {
            questionID: currentQuestion.id,
            answer: values.answer
        }

        await setAnswers([...answers, data])
        
        if(values.answer === currentQuestion.answer) {
            // IF CORRECT ANSWER

            // POP UP SUCCESS MESSAGE
            message.success("Answer correct!")
            // GET NEXT QUESTION
            nextQuestion(true)
        } else {
            // IF WRONG ANSWER

            // POP UP ERROR MESSAGE
            message.error("Wrong answer!")
            // GET NEXT QUESTION
            nextQuestion(false)
        }

        // GET END TIME
        const endTime = moment(examStore.exam.endTime, 'HH:mm');
        // GET CURRENT TIME
        const currentTime = moment();

        currentTime.set({
            'hour': endTime.get('hour'),
            'minute': endTime.get('minute'),
            'second': 0,
            'millisecond': 0
        });


        // CHECK IF CURRENT TIME IS AFTER END TIME
        const isAfter = currentTime.isAfter(endTime);

        if(isAfter) {
            // IF IS AFTER SUBMIT RESULT TO BACKEND
            setIsAfter(true)
            submitData()
        }

        setTotalAnswers(totalAnswers + 1)
        form.setFieldsValue({
            answer: ""
        })
    }

    const nextQuestion = (isCorrect) => {
        if(isCorrect) {
            // IF CORRECT ANSWER
            setScore(score + 1)

            if(currentQuestion.difficultyLevel === "1") {
                // IF BEGINNER GET AVERAGE LEVEL QUESTION
                getAverageQuestion()
                setTotalBeginnerScore(totalBeginnerScore + 1)
            } else if (currentQuestion.difficultyLevel === "2" || currentQuestion.difficultyLevel === "3") {
                // IF AVERAGE OR ADVANCED GET ADVANCED LEVEL QUESTION
                getAdvancedQuestion()
                if(currentQuestion.difficultyLevel === "2") {
                    setTotalIntermediateScoreScore(totalIntermediateScore + 1)
                } else {
                    setTotalAdvancedScoreScore(totalAdvancedScore + 1)
                }
            }
        } else {
            // IF WRONG ANSWER
            if(currentQuestion.difficultyLevel === "1" || currentQuestion.difficultyLevel === "2") {
                getBeginnerQuestion()
            } else if (currentQuestion.difficultyLevel === "3") {
                getAverageQuestion()
            }
        }
    }

    const getBeginnerQuestion = () => {
        const question = beginnerQ[0]
        setCurrentQuestion(question)
        setBeginnerQ(beginnerQ.filter((begq) => begq.id !== question.id))
    }

    const getAverageQuestion = () => {
        const question = averageQ[0]
        setCurrentQuestion(question)
        setAverageQ(averageQ.filter((begq) => begq.id !== question.id))
    }

    const getAdvancedQuestion = () => {
        const question = advancedQ[0]
        setCurrentQuestion(question)
        setAdvancedQ(advancedQ.filter((begq) => begq.id !== question.id))
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
                        <Alert
                            message="Warning"
                            description="Do not refresh. Answer will not be saved."
                            type="warning"
                            showIcon
                            closable
                        />
                        <br/>
                        <br/>
                        {!isAfter ? (
                            <Col>
                                {totalAnswers !== parseInt(examStore.exam.totalItems) ? (
                                    <Form onFinish={onSubmit} form={form}>
                                        {currentQuestion ? (
                                            <>
                                                
                                                <div>
                                                    <span style={{marginRight: 10}}>Current Question Difficulty Level:</span>
                                                    <Tag
                                                        color={
                                                            currentQuestion.difficultyLevel === "1"
                                                            ? "orange"
                                                            : currentQuestion.difficultyLevel === "2"
                                                            ? "volcano"
                                                            : "red"
                                                        }
                                                    >
                                                        {currentQuestion.difficultyLevel === "1" ? "BEGINNER" : (currentQuestion.difficultyLevel === "2" ? "AVERAGE" : "ADVANCED")}
                                                    </Tag>
                                                    <Divider/>
                                                </div>
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
                        ): (
                            <Result
                                status="success"
                                title="Time is finished!"
                                subTitle="Please see your score on results page."
                                extra={[
                                    <Button type="primary" onClick={() => navigate("/results")}>
                                        Go to Results
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

export default inject('examStore','questionBankStore','examResultStore')(observer(ExamRoom))