import { observable, action } from "mobx";
import axios from "axios";

class SubjectStore {
    @observable subjects = [];
    @observable subject = {};
    @observable loading = false;
    @observable isSuccess = false;
    @observable onError = false;

    @action
    createSubject = (data) => {
        this.loading = true;

        axios
            .post(`/subjects/create.php`, data)
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
    getSubjects = () => {
        this.loading = true;

        axios
            .get(`/subjects/get_all.php`)
            .then((response) => {
                if(response.status === 200) {
                    this.subjects = response.data.data;
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
    getSubjectsByEmployee = (employeeID) => {
        this.loading = true;

        axios
            .get(`/subjects/get_all.php?employeeID=${employeeID}`)
            .then((response) => {
                if(response.status === 200) {
                    this.subjects = response.data.data;
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
    getSubject = (id) => {
        this.loading = true;

        axios
            .get(`/subjects/get.php?id=${id}`)
            .then((response) => {
                if(response.status === 200) {
                    this.subject = response.data.data;
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
    updateSubject = (subjectID, data) => {
        this.loading = true;

        axios
            .patch(`/subjects/update.php?id=${subjectID}`, data)
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
    deleteSubject = (subjectID) => {
        this.loading = true;

        axios
            .delete(`/subjects/delete.php?id=${subjectID}`)
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

export default SubjectStore