import { Provider } from "react-redux";
import { store } from "./store";

export const App = () => {
    return (
        <Provider store={store}>
            <div className="min-h-screen bg-white">
                {/* App content goes here */}
            </div>
        </Provider>
    );
};
