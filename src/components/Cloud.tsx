import { ParentComponent, Resource, Setter, createContext, createEffect, createResource, createSignal, useContext } from "solid-js";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, getDoc, QuerySnapshot, DocumentReference } from "firebase/firestore";
import { Quiz, QuizInfo, QuizList } from "../game/types/Quiz";


//#region types
type CloudContext = {
    setQuizInfo: Setter<QuizInfo>;
    quizList: Resource<QuizList>;
};
//#endregion

//#region firebase config & vairables
const firebaseConfig = {
  apiKey: "AIzaSyBiupN7TDtDoYptirlRlzH2AQpIPdjCIrI",
  authDomain: "quiz-game-a283c.firebaseapp.com",
  databaseURL: "https://quiz-game-a283c-default-rtdb.firebaseio.com",
  projectId: "quiz-game-a283c",
  storageBucket: "quiz-game-a283c.appspot.com",
  messagingSenderId: "559679834708",
  appId: "1:559679834708:web:3d25c3e66148152d8abbc1",
  measurementId: "G-82X1GE6N5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//#endregion

//#region Context and fetch methods
const Context = createContext<CloudContext>();

/**
 * Select a quiz by name from cloud, execute when quizName signal change 
 * @param {QuizInfo} name
 * @returns {romise<Quiz>} result
 */
const getQuizes = async (info: QuizInfo): Promise<Quiz> => {
    if(!info) return {} as Quiz;

    const ref: DocumentReference = info.quiz;
    const doc = await getDoc(ref);

    if(!doc.exists){
        console.error("Something goes wrong while getting quiz");
        return {} as Quiz;
    }

    return doc.data() as Quiz;
};

const getQuizList = async (): Promise<QuizList> => {
    const listRef = collection(db, "quizList");
    const querySnapshot = await getDocs(listRef);
    let result: QuizList = [];

    if(querySnapshot.empty){
        console.error("Something goes wrong");
        return []
    }

    querySnapshot.docs.forEach(item => result.push(item.data() as QuizInfo));

    return result;
};
//#endregion

//#region Component
/**
 * Generates a context to share cloud functions for sub components
 */
const Cloud: ParentComponent = (props) => {

    const [quizInfo, setQuizInfo] = createSignal<QuizInfo>();
    //@ts-ignore
    const [quiz] = createResource<Quiz>(quizInfo, getQuizes);
    const [quizList, modifyQuizList] = createResource<QuizList>(getQuizList);

    //in production you will not find
    createEffect((): void => {
        console.log(quiz());
    });

    return (
        <Context.Provider value={{
            setQuizInfo,
            quizList
        }}>
            {props.children}
        </Context.Provider>
    );
};
//#endregion

export const getCloudData = () => useContext(Context) as CloudContext;
export default Cloud;