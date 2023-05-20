import { observable, action } from "mobx";
import axios from "axios";

class ExamStore {
    @observable exams = [];
    @observable exam = {};
    @observable loading = false;
    @observable isSuccess = false;
    @observable onError = false;

    @action
    createExam = (data) => {
        this.loading = true;

        axios
            .post(`/exams/create.php`, data)
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
    getExams = (topicID) => {
        this.loading = true;

        axios
            .get(topicID ? `/exams/get_all.php?topicID=${topicID}` : `/exams/get_all.php`)
            .then((response) => {
                if(response.status === 200) {
                    this.exams = response.data.data;
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
    getExamsByEmployee = (employeeID) => {
        this.loading = true;

        axios
            .get(`/exams/get_all.php?employeeID=${employeeID}`)
            .then((response) => {
                if(response.status === 200) {
                    this.exams = response.data.data;
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
    getExamsByStatus = (status) => {
        this.loading = true;

        axios
            .get(`/exams/get_all.php?status=${status}`)
            .then((response) => {
                if(response.status === 200) {
                    this.exams = response.data.data;
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
    getExam = (id) => {
        this.loading = true;

        axios
            .get(`/exams/get.php?id=${id}`)
            .then((response) => {
                if(response.status === 200) {
                    this.exam = response.data.data;
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
    updateExam = (examID, data) => {
        this.loading = true;

        axios
            .patch(`/exams/update.php?id=${examID}`, data)
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
    deleteExam = (examID) => {
        this.loading = true;

        axios
            .delete(`/exams/delete.php?id=${examID}`)
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

export default ExamStore