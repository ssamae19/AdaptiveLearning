import { observable, action } from "mobx";
import axios from "axios";

class QuestionBankStore {
    @observable questions = [];
    @observable question = {};
    @observable loading = false;
    @observable isSuccess = false;
    @observable onError = false;

    @action
    createQuestion = (data) => {
        this.loading = true;

        axios
            .post(`/question_bank/create.php`, data)
            .then((response) => {
                if(response.status === 200) {
                    this.isSuccess = true;
                }
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
            .finally(() => {
                this.loading = false;
                this.onError = false;
            });
    };

    @action
    uploadFile = (data) => {
        this.loading = true;

        axios
            .post(`/question_bank/upload.php`, data)
            .then((response) => {
                if(response.status === 200) {
                    this.isSuccess = true;
                }
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
            .finally(() => {
                this.loading = false;
                this.onError = false;
            });
    };
    

    @action
    getQuestionsBySubjectTopic = (subjectID, topicID) => {
        this.loading = true;

        axios
            .get(`/question_bank/get_all.php?subjectID=${subjectID}&topicID=${topicID}`)
            .then((response) => {
                if(response.status === 200) {
                    this.questions = response.data.data;
                }
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
            .finally(() => {
                this.loading = false;
                this.onError = false;
            });
    };
    
    @action
    getQuestionsBySubjectTopicRandom = (subjectID, topicID, limit, difficultyLevel) => {
        this.loading = true;

        axios
            .get(`/question_bank/get_all.php?subjectID=${subjectID}&topicID=${topicID}&limit=${limit}&difficultyLevel=${difficultyLevel}`)
            .then((response) => {
                if(response.status === 200) {
                    this.questions = response.data.data;
                }
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
            .finally(() => {
                this.loading = false;
                this.onError = false;
            });
    };

    @action
    getQuestions = () => {
        this.loading = true;

        axios
            .get(`/question_bank/get_all.php`)
            .then((response) => {
                if(response.status === 200) {
                    this.questions = response.data.data;
                }
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
            .finally(() => {
                this.loading = false;
                this.onError = false;
            });
    };

    @action
    getQuestion = (id) => {
        this.loading = true;

        axios
            .get(`/question_bank/get.php?id=${id}`)
            .then((response) => {
                if(response.status === 200) {
                    this.question = response.data.data;
                }
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
            .finally(() => {
                this.loading = false;
                this.onError = false;
            });
    };

    @action
    updateQuestion = (questionID, data) => {
        this.loading = true;

        axios
            .patch(`/question_bank/update.php?id=${questionID}`, data)
            .then((response) => {
                if(response.status === 201) {
                    this.isSuccess = true;
                }
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
            .finally(() => {
                this.loading = false;
                this.onError = false;
            });
    };

    @action
    deleteQuestion = (questionID) => {
        this.loading = true;

        axios
            .delete(`/question_bank/delete.php?id=${questionID}`)
            .then((response) => {
                if(response.status === 200) {
                    this.isSuccess = true;
                }
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
            .finally(() => {
                this.loading = false;
                this.onError = false;
            });
    };
}

export default QuestionBankStore