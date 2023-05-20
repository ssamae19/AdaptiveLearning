import { createContext } from 'react'
import { create } from "mobx-persist";
import UserStore from './UserStore'
import SubjectStore from './SubjectStore';
import QuestionBankStore from './QuestionBankStore';
import ExamStore from './ExamStore';
import ExamRevieweesStore from './ExamRevieweesStore';
import ExamResultStore from './ExamResultStore';
import TopicStore from './TopicStore';
import AttachmentStore from './AttachmentStore';
import CurrentLessonStore from './CurrentLessonStore';

const hydrate = create({
    storage: localStorage,
    jsonify: true,
});

class RootStore {
    userStore = new UserStore()
    subjectStore = new SubjectStore()
    questionBankStore = new QuestionBankStore()
    examStore = new ExamStore()
    examRevieweesStore = new ExamRevieweesStore()
    examResultStore = new ExamResultStore()
    topicStore = new TopicStore()
    attachmentStore = new AttachmentStore()
    currentLessonStore = new CurrentLessonStore()
    

    constructor() {
        hydrate("userStore", this.userStore)
        .then((userStore) => {
            console.log("data persisted");
        })
    }
}

export const RootStoreContext = createContext(new RootStore())