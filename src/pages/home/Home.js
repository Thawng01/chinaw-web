import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";

import "./home.css";
import { fetchPosts } from "../../store/actions/Post";
import Feed from "../../components/feed/Feed";
import { AuthContext } from "../../components/auth/AuthContext";
import Message from "../../components/message/Message";
import RightSide from "../../components/sides/rightSide/RightSide";
import useOnline from "../../hook/useOnline";

const Home = () => {
    const posts = useSelector((state) => state.post.posts);
    const { user, setMessage, message } = useContext(AuthContext);

    const dispatch = useDispatch();

    const isOnline = useOnline();

    useEffect(() => {
        const getPosts = async () => {
            try {
                await dispatch(fetchPosts());
            } catch (error) {
                setMessage(error.message);
            }
        };
        getPosts();
    }, [dispatch, setMessage]);

    useEffect(() => {}, []);

    return (
        <>
            {message && <Message />}
            <Feed posts={posts} home user={user} />
            <RightSide />
        </>
    );
};

export default Home;
