import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Points from "./pages/points/Points";
import DailyPoint from "./pages/dailypoints/DailyPoint";
import Settings from "./pages/settings/Settings";
import Faqs from "./pages/FAQs/Faqs";
import Contact from "./pages/contact/Contact";
import NoPage from "./pages/nopage/NoPage";
import Profile from "./pages/profile/Profile";
import Register from "./pages/auth/Register";
import Layout from "./pages/layout/Layout";
import CreateNewPost from "./pages/newpost/CreateNewPost";
import Header from "./components/header/Header";
import Comment from "./pages/comments/Comment";

const AppRoutes = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="register" element={<Register />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="create_new_post" element={<CreateNewPost />} />
                    <Route path="update_post/:id" element={<CreateNewPost />} />
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="comment/:id" element={<Comment />} />
                    <Route path="points" element={<Points />} />
                    <Route path="dailypoints" element={<DailyPoint />} />
                    <Route path="settings/*" element={<Settings />} />
                    <Route path="fqas" element={<Faqs />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
