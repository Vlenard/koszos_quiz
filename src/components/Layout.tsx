import { Component, For, createContext } from "solid-js";
import { getCloudData } from "./Cloud";

type LayoutContext = {

};

const Context = createContext<LayoutContext>();

const Layout: Component = () => {

    const { quizList, setQuizInfo } = getCloudData();

    return (
        <Context.Provider value={{}}>
            {!quizList.loading && (
                <div class="flex flex-col">
                    <For each={quizList()}>
                        {quiz => (
                            <div class="my-5">
                                <hr />
                                <h2>{quiz.name}</h2>
                                <p>{quiz.des}</p>
                                <button onClick={() => setQuizInfo(quiz)}>Play</button>
                                <hr />
                            </div>
                        )}
                    </For>
                </div>
            )}
        </Context.Provider>
    );
};

export default Layout;