import { observable, action } from "mobx";
import { persist } from "mobx-persist";
import axios from "axios";

class UserStore {
  @observable users = [];
  @observable user = {};
  @observable loading = false;
  @observable isSuccess = false;
  @observable onError = false;
  @observable errorMessage = null;

  @persist @observable id = "";
  @persist @observable loginStatus = false;
  @persist @observable userID = ""
  @persist @observable userIDNumber = ""
  @persist @observable firstName = ""
  @persist @observable middleName = ""
  @persist @observable lastName = ""
  // @persist @observable school = ""
  @persist @observable department = ""
  @persist @observable userType = ""
  @persist @observable username = ""
  @persist @observable status = ""
  @persist @observable createdAt = ""

  @action
  createUser = (data) => {
      this.loading = true;

      axios
        .post(`/users/create.php`, data)
        .then((response) => {
            if(response.status === 200) {
              this.isSuccess = true;
            }
        })
        .catch((error) => {
            console.log(error.response.data.error);
            this.onError = true;
            
        })
        .finally(() => {
            this.loading = false;
            this.onError = false;
        });
  };

  @action
  login = (data) => {
    this.loading = true;

    axios
      .post(`/users/login.php`, data)
      .then((response) => {

        if (response.status === 200) {
          let user = response.data.data;

          this.loginStatus = true;
          this.userID = user.id;
          this.userIDNumber = user.idNumber;
          this.firstName = user.firstName;
          this.middleName = user.middleName;
          this.lastName = user.lastName;
          // this.school = user.school;
          this.department = user.department;
          this.userType = user.userType;
          this.username = user.username;
          this.status = user.status;
          this.createdAt = user.createdAt;

          this.isSuccess = true;

          window.location.href = "/";
        } else {
          console.log("here")
        }
      })
      .catch((error) => {
        this.errorMessage = error.response.data.message.toString()
        setTimeout(() => {
          this.errorMessage = null
        }, 500)
        console.log(error.response.data);
      })
      .finally(() => {
        // this.loading = false;
        this.onError = false;
      });

  };

  @action
  getUsers = (userType) => {
    this.loading = true;

    axios
      .get(`/users/get_all.php?userType=${userType}`)
      .then((response) => {
          if(response.status === 200) {
            this.users = response.data.data;

            this.users.forEach(user => {
              user.key = user.id
            });

            console.log(this.users)
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
  getUser = (id) => {
    this.loading = true;

    axios
      .get(`/users/get.php?id=${id}`)
      .then((response) => {
          if(response.status === 200) {
              this.user = response.data.data;
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
  updateUser = (userID, data) => {
    this.loading = true;

    axios
      .patch(`/users/update.php?id=${userID}`, data)
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
  deleteUser = (userID) => {
    this.loading = true;

    axios
      .delete(`/users/delete.php?id=${userID}`)
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
  updatePassword = (username, data) => {
    this.loading = true;

    axios
      .patch(`/users/update_password.php?username=${username}`, data)
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
}

export default UserStore;
