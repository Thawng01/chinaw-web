import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import "./home.css";
import { fetchPosts } from "../../store/actions/Post";
import Feed from "../../components/feed/Feed";
import RightSide from "../../components/sides/rightSide/RightSide";
import useAuthContext from "../../hook/useAuthContext";

const Home = () => {
    const posts = useSelector((state) => state.post.posts);
    const { setMessage } = useAuthContext();

    const dispatch = useDispatch();

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
            <Feed posts={posts} home />
            <RightSide />
        </>
    );
};

export default Home;
