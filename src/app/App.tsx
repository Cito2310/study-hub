import { Provider } from "react-redux";
import { store } from "./store";
import { SubjectsPage } from "../features/subjects/SubjectsPage";

export const App = () => {
    return (
        <Provider store={store}>
            <div className="min-h-screen bg-gray-50">
                <SubjectsPage />
            </div>
        </Provider>
    );
};
