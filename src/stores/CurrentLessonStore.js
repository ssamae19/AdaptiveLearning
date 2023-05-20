import { observable, action } from "mobx";
import axios from "axios";

class CurrentLessonStore
 {
    @observable currentLessons = [];
    @observable currentLesson = {};
    @observable loading = false;
    @observable isSuccess = false;
    @observable onError = false;

    @action
    createCurrentLesson = (data) => {
        this.loading = true;

        axios
            .post(`/current_lessons/create.php`, data)
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
    getCurrentLessons = (revieweeID, subjectID) => {
        this.loading = true;

        axios
            .get(`/current_lessons/get_all.php?revieweeID=${revieweeID}&subjectID=${subjectID}`)
            .then((response) => {
                if(response.status === 200) {
                    this.currentLessons = response.data.data;
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
    getCurrentLesson = (revieweeID, topicID) => {
        this.loading = true;

        axios
            .get(`/current_lessons/get.php?revieweeID=${revieweeID}&topicID=${topicID}`)
            .then((response) => {
                if(response.status === 200) {
                    this.currentLesson = response.data.data;
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

export default CurrentLessonStore
