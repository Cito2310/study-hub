import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import { SubjectsPage } from "../features/subjects/SubjectsPage";
import { SubjectDetailPage } from "../features/units/SubjectDetailPage";
import { UnitDetailPage } from "../features/units/UnitDetailPage";

export const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="min-h-screen bg-gray-50">
                    <Routes>
                        <Route path="/" element={<SubjectsPage />} />
                        <Route path="/subjects/:subjectId" element={<SubjectDetailPage />} />
                        <Route path="/subjects/:subjectId/units/:unitId" element={<UnitDetailPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
};
