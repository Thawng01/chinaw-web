import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import "./home.css";
import { fetchPosts } from "../../store/actions/Post";
import Feed from "../../components/feed/Feed";
import RightSide from "../../components/sides/rightSide/RightSide";
import useAuthContext from "../../hook/useAuthContext";
import Loading from "../../components/loading/Loading";
import { IoArrowUpOutline } from "react-icons/io5";

import useScroll from "../../hook/useScroll";

const Home = () => {
    const posts = useSelector((state) => state.post.posts);
    const loading = useSelector((state) => state.post.status);

    const { setMessage } = useAuthContext();
    const { buttonVisible, handleScroll } = useScroll();

    const dispatch = useDispatch();

    useEffect(() => {
        const getPosts = async () => {
            try {
                if (posts.length === 0 && loading === "idle") {
                    await dispatch(fetchPosts());
                }
            } catch (error) {
                setMessage({ text: error.message, type: "error" });
            }
        };

        getPosts();
    }, [dispatch, loading, setMessage]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <>
            {loading === "loading" && <Loading />}
            <Feed posts={posts} home />
            <RightSide />
            <div
                onClick={scrollToTop}
                style={{ bottom: buttonVisible ? "3%" : -40 }}
                className="up"
            >
                <IoArrowUpOutline />
            </div>
        </>
    );
};

export default Home;
