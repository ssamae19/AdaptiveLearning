import { observable, action } from "mobx";
import axios from "axios";

class ExamResultStore
 {
    @observable examResults = [];
    @observable examResult = {};
    @observable loading = false;
    @observable isSuccess = false;
    @observable onError = false;

    @action
    createExamResult = (data) => {
        this.loading = true;

        axios
            .post(`/exam_reviewees_results/create.php`, data)
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
    getExamResults = (examID) => {
        this.loading = true;

        axios
            .get(`/exam_reviewees_results/get_all.php?examID=${examID}`)
            .then((response) => {
                if(response.status === 200) {
                    this.examResults = response.data.data;
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
    getExamResultsByRevieweeID = (revieweeID) => {
        this.loading = true;

        axios
            .get(`/exam_reviewees_results/get_all.php?revieweeID=${revieweeID}`)
            .then((response) => {
                if(response.status === 200) {
                    this.examResults = response.data.data;
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
    getExamResult = (id) => {
        this.loading = true;

        axios
            .get(`/exam_reviewees_results/get.php?id=${id}`)
            .then((response) => {
                if(response.status === 200) {
                    this.examResult = response.data.data;
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
    updateExamResult = (examResultID, data) => {
        this.loading = true;

        axios
            .patch(`/exam_reviewees_results/update.php?id=${examResultID}`, data)
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
    deleteExamResult = (examResultID) => {
        this.loading = true;

        axios
            .delete(`/exam_reviewees_results/delete.php?id=${examResultID}`)
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

export default ExamResultStore
