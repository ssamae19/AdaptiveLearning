import { observable, action } from "mobx";
import axios from "axios";

class ExamRevieweesStore {
    @observable examReviewees = [];
    @observable loading = false;
    @observable isSuccess = false;
    @observable onError = false;

    @action
    createExamReviewee = (data) => {
        this.loading = true;

        axios
            .post(`/exam_reviewees/create.php`, data)
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
    getExamReviewees = (examID) => {
        this.loading = true;

        axios
            .get(`/exam_reviewees/get_all.php?examID=${examID}`)
            .then((response) => {
                if(response.status === 200) {
                    this.examReviewees = response.data.data;
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
    getExamRevieweeExams = (revieweeID) => {
        this.loading = true;

        axios
            .get(`/exam_reviewees/get_all.php?revieweeID=${revieweeID}`)
            .then((response) => {
                if(response.status === 200) {
                    this.examReviewees = response.data.data;
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
    getExamRevieweeExamsByStatus = (revieweeID, status) => {
        this.loading = true;

        axios
            .get(`/exam_reviewees/get_all.php?revieweeID=${revieweeID}&status=${status}`)
            .then((response) => {
                if(response.status === 200) {
                    this.examReviewees = response.data.data;
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
    deleteExamReviewee = (examRevieweeID) => {
        this.loading = true;

        axios
            .delete(`/exam_reviewees/delete.php?id=${examRevieweeID}`)
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

export default ExamRevieweesStore