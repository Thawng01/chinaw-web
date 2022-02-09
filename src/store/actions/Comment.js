import {
    getDoc,
    doc,
    collection,
    query,
    where,
    arrayUnion,
    onSnapshot,
    writeBatch,
    arrayRemove,
    updateDoc,
} from "firebase/firestore";

import {
    ref,
    getStorage,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
} from "firebase/storage";

import uuid from "react-uuid";

import { db } from "../../db/db";

export const FETCH_COMMENTS = "FETCH_COMMENTS";
const storage = getStorage();

export const fetchComments = (id) => {
    return async (dispatch) => {
        const q = query(collection(db, "Comments"), where("postId", "==", id));

        onSnapshot(q, (querySnapshot) => {
            const comments = [];
            querySnapshot?.forEach((documentSnapshot) => {
                comments.push(documentSnapshot.data());
            });
            dispatch({ type: FETCH_COMMENTS, payload: comments });
        });
    };
};

export const createNewComment = (
    comment,
    image,
    postId,
    uid,
    userImage,
    username
) => {
    return async (dispatch) => {
        const batch = writeBatch(db);
        const id = uuid();

        let url = null;

        if (image?.src) {
            const storageRef = ref(storage, `images/${image.file.name}`);
            await uploadBytesResumable(storageRef, image.file);

            url = await getDownloadURL(storageRef);
        }

        batch.set(doc(db, "Comments", id), {
            comment,
            image: url,
            commentedAt: new Date().getTime(),
            id,
            likes: [],
            postId,
            uid,
            userImage,
            username,
        });

        batch.update(doc(db, "Users", uid), {
            comments: arrayUnion(id),
        });

        batch.update(doc(db, "Posts", postId), {
            comments: arrayUnion(id),
        });

        await batch.commit();
    };
};

export const likeComment = (cid, uid) => {
    return async (dispatch) => {
        const cdoc = doc(db, "Comments", cid);

        const result = await getDoc(cdoc);

        if (result.exists === false)
            throw new Error("No comment found with the given id");

        const likes = result.data().likes;

        if (likes.includes(uid)) {
            updateDoc(cdoc, {
                likes: arrayRemove(uid),
            });
        } else {
            updateDoc(cdoc, {
                likes: arrayUnion(uid),
            });
        }
    };
};

export const deleteComment = (cid, pid, uid) => {
    return async (dispatch) => {
        const batch = writeBatch(db);

        const pdoc = doc(db, "Posts", pid);
        const cdoc = doc(db, "Comments", cid);
        const udoc = doc(db, "Users", uid);

        const result = await getDoc(cdoc);
        const image = result.data().image;

        if (image) {
            const ImageToDelete = ref(storage, image);
            await deleteObject(ImageToDelete);
        }

        batch.update(pdoc, {
            comments: arrayRemove(cid),
        });

        batch.update(udoc, {
            comments: arrayRemove(cid),
        });

        batch.delete(cdoc);

        await batch.commit();
    };
};
