import Feed from "../../components/feed/Feed";
import RightSide from "../../components/sides/rightSide/RightSide";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../../store/actions/Post";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../components/auth/AuthContext";

const Home = () => {
    const posts = useSelector((state) => state.post.posts);
    const { user } = useContext(AuthContext);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    return (
        <>
            <Feed posts={posts} home user={user} />
            <RightSide />
        </>
    );
};

export default Home;
