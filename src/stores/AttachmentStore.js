import { observable, action } from "mobx";
import axios from "axios";

class AttachmentStore {
    @observable file = {};
    @observable isSuccess = false;


    @action
    uploadFile = (data) => {
        this.loading = true;

        axios
            .post(`/uploads/upload.php`, data)
            .then((response) => {
                if(response.status === 200) {
                    this.file = response.data.data
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

export default AttachmentStore