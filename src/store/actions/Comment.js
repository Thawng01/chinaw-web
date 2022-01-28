import {
    getDoc,
    doc,
    collection,
    query,
    where,
    getDocs,
    setDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import uuid from "react-uuid";

import { db } from "../../db/db";

export const FETCH_COMMENTS = "FETCH_COMMENTS";

export const fetchComments = (id) => {
    return async (dispatch) => {
        const result = await getDocs(
            query(collection(db, "Comments"), where("postId", "==", id))
        );

        const comment = result.docs.map((doc) => doc.data());

        dispatch({ type: FETCH_COMMENTS, payload: comment });
    };
};

export const createNewComment = (comment, postId, uid, userImage, username) => {
    return async (dispatch) => {
        const id = uuid();

        await setDoc(doc(db, "Comments", id), {
            comment,
            commentedAt: new Date().getTime(),
            id,
            likes: [],
            postId,
            uid,
            userImage,
            username,
        });

        await updateDoc(doc(db, "Users", uid), {
            comments: arrayUnion(id),
        });

        await updateDoc(doc(db, "Posts", postId), {
            comments: arrayUnion(id),
        });
    };
};
