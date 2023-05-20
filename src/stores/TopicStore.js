import { observable, action } from "mobx";
import axios from "axios";

class TopicStore {
    @observable topics = [];
    @observable topic = {};
    @observable loading = false;
    @observable isSuccess = false;
    @observable onError = false;

    @action
    createTopic = (data) => {
        this.loading = true;

        axios
            .post(`/topics/create.php`, data)
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
    getTopics = (subjectID) => {
        this.loading = true;

        axios
            .get(`/topics/get_all.php?subjectID=${subjectID}`)
            .then((response) => {
                if(response.status === 200) {
                    this.topics = response.data.data;
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
    getTopic = (id) => {
        this.loading = true;

        axios
            .get(`/topics/get.php?id=${id}`)
            .then((response) => {
                if(response.status === 200) {
                    this.topic = response.data.data;
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
    updateTopic = (topicID, data) => {
        this.loading = true;

        axios
            .patch(`/topics/update.php?id=${topicID}`, data)
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
    deleteTopic = (topicID) => {
        this.loading = true;

        axios
            .delete(`/topics/delete.php?id=${topicID}`)
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

export default TopicStore