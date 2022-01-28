import {
    getDocs,
    orderBy,
    onSnapshot,
    where,
    query,
    collection,
    doc,
    setDoc,
    getDoc,
    getFirestore,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    writeBatch,
    runTransaction,
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
export const CREATE_POST = "CREATE_POST";
export const FETCH_POSTS = "FETCH_POSTS";

export const FETCH_SINGLE_POST = "FETCH_SINGLE_POST";
export const FETCH_SAVED_POST = "FETCH_SAVED_POST";

const storage = getStorage();
const firestore = getFirestore();

export const addNewPost = (content, image, uid, pid, imageToUpdate) => {
    return async (dispatch) => {
        const id = uuid();

        const batch = writeBatch(db);

        const result = await getDoc(doc(db, "Users", uid));
        if (result.exists === false) {
            throw new Error("No post found with the given id!");
        }

        const user = result.data();

        if (user.restricted === true)
            throw new Error("Your account has been restricted.");

        if (user.postPowers === 0)
            throw new Error("You can create only three posts per day.");

        const username = user.username;
        const email = user.email;
        const userImage = user.image;
        const fileToDelete = ref(storage, imageToUpdate);

        let url = null;
        if (image?.src) {
            if (image.src.includes("https://firebasestorage.googleapis.com")) {
                url = image.src;
            } else {
                const storageRef = ref(storage, `images/${image.file.name}`);
                await uploadBytesResumable(storageRef, image.file);

                url = await getDownloadURL(storageRef);

                if (pid && imageToUpdate) {
                    await deleteObject(fileToDelete);
                }
            }
        }

        if (pid) {
            if (image === null && imageToUpdate) {
                await deleteObject(fileToDelete);
            }
        }

        if (pid) {
            batch.update(doc(db, "Posts", pid), {
                content,
                image: url,
            });
        } else {
            batch.set(doc(db, "Posts", id), {
                id: id,
                content,
                image: url,
                createdAt: new Date().getTime(),
                comments: [],
                likes: [],
                uid: uid,
                savedBy: [],
                userImage,
                username: username ? username : email,
            });
        }

        const postPower = user.postPowers;
        const userDocRef = doc(db, "Users", uid);

        batch.update(userDocRef, {
            post: arrayUnion(id),
            postPowers: postPower - 1,
        });

        await batch.commit();
    };
};

export const fetchPosts = () => {
    return async (dispatch) => {
        const q = query(collection(db, "Posts"), orderBy("createdAt", "desc"));
        onSnapshot(q, (querySnapshot) => {
            const posts = [];
            querySnapshot?.forEach((snapshot) => posts.push(snapshot.data()));

            dispatch({ type: FETCH_POSTS, payload: posts });
        });
    };
};

export const fetchSinglePost = (id) => {
    return async (dispatch) => {
        const result = await getDoc(doc(firestore, "Posts", id));
        if (result.exists === false)
            throw new Error("No post found with the given id");
        const post = result.data();

        dispatch({ type: FETCH_SINGLE_POST, payload: post });
    };
};

export const deletePost = (id) => {
    return async (dispatch) => {
        const batch = writeBatch(db);
        const result = await getDoc(doc(firestore, "Posts", id));
        if (result.exists === false)
            throw new Error("No post found with the given id!");

        const post = result.data();

        const uid = post.uid;
        const comments = post.comments;
        const commentsL = comments.length;

        if (commentsL > 0) {
            for (let i = 0; i < commentsL; i++) {
                const comment = await getDoc(doc(db, "Comments", comments[i]));
                if (comment.exists === false)
                    throw new Error("No comment with the given id");

                const uid = comment.data().uid;

                batch.update(doc(db, "Users", uid), {
                    comments: arrayRemove(comments[i]),
                });

                batch.delete(doc(db, "Comments", comments[i]));
            }
        }

        const docRef = doc(db, "Users", uid);

        const likes = post.likes;

        let point = 0;

        if (likes.length > 0) {
            point = likes.length * 10;
            const user = await getDoc(docRef);
            let points = user.data().points;
            batch.update(docRef, {
                points: points - point,
            });
        }

        batch.update(docRef, {
            post: arrayRemove(id),
        });

        let image = post.image;
        if (image) {
            const imageToDelete = ref(storage, image);
            await deleteObject(imageToDelete);
        }
        batch.delete(doc(db, "Posts", id));

        await batch.commit();
    };
};

export const likePost = (uid, pid) => {
    return async (dispatch) => {
        const batch = writeBatch(db);
        // create user ref
        const docRef = doc(db, "Users", uid);

        // create post ref
        const postRef = doc(db, "Posts", pid);

        const post = await getDoc(postRef);
        if (post.exists === false) throw new Error("No post with the given id");

        const isLiked = post.data().likes;

        if (isLiked?.includes(uid) === false) {
            // check if a user has power to like post or not
            const result = await getDoc(docRef);
            if (result.exists === false)
                throw new Error("No user with the given id");
            const power = result.data().powers;
            if (power === 0) throw new Error("You have no power to like post");

            // decrease power by 1
            batch.update(docRef, {
                powers: power - 1,
            });
        }

        // update like array
        if (isLiked?.includes(uid)) {
            batch.update(postRef, {
                likes: arrayRemove(uid),
            });
        } else {
            batch.update(postRef, {
                likes: arrayUnion(uid),
            });
        }

        // increase point
        await runTransaction(db, async (transaction) => {
            const uDoc = await transaction.get(docRef);

            if (isLiked?.includes(uid)) {
                const newPoint = uDoc.data().points - 10;
                transaction.update(docRef, { points: newPoint });
            } else {
                const point = uDoc.data().points;
                const newPoint = point + 10;
                transaction.update(docRef, { points: newPoint });
            }
        });

        await batch.commit();
    };
};

export const savePost = (uid, pid) => {
    return async (dispatch) => {
        const postRef = doc(db, "Posts", pid);

        const post = await getDoc(postRef);
        if (post.exists === false)
            throw new Error("No post width the given id");

        const isSaved = post.data().savedBy;

        if (isSaved?.includes(uid) === false) {
            await updateDoc(postRef, {
                savedBy: arrayUnion(uid),
            });
        } else {
            await updateDoc(postRef, {
                savedBy: arrayRemove(uid),
            });
        }
    };
};

export const fetchSavedPost = (uid) => {
    return async (dispatch) => {
        const q = query(
            collection(db, "Posts"),
            where("savedBy", "array-contains", uid)
        );

        onSnapshot(q, (querySnapshot) => {
            const savedPosts = [];
            querySnapshot?.forEach((documentSnapshot) => {
                savedPosts.push(documentSnapshot.data());
            });

            dispatch({ type: FETCH_SAVED_POST, payload: savedPosts });
        });
    };
};
