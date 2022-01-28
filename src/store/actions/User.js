import {
    getDoc,
    collection,
    doc,
    getFirestore,
    where,
    onSnapshot,
    query,
    writeBatch,
} from "firebase/firestore";

import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";

import { orderBy } from "lodash";

import { db } from "../../db/db";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_POST = "FETCH_USER_POST";

const firestore = getFirestore();

export const fetchUser = (uid) => {
    return async (dispatch) => {
        onSnapshot(doc(firestore, "Users", uid), (querySnapshot) => {
            const user = querySnapshot?.data();

            dispatch({ type: FETCH_USER, payload: user });
        });
    };
};

export const fetchUserPost = (uid) => {
    return async (dispatch) => {
        const result = await getDoc(doc(firestore, "Users", uid));
        const user = result.data();

        const q = query(collection(db, "Posts"), where("uid", "==", uid));
        onSnapshot(q, (querySnapshot) => {
            const posts = [];
            querySnapshot?.forEach((documentSnapshot) =>
                posts.push(documentSnapshot.data())
            );

            user.post = orderBy(posts, "createdAt", "desc");

            dispatch({ type: FETCH_USER_POST, payload: user });
        });
    };
};

export const updateProfile = (username, image, bio, uid) => {
    return async (dispatch) => {
        const batch = writeBatch(db);
        const userRef = doc(db, "Users", uid);

        const result = await getDoc(userRef);
        if (result.exists === false)
            throw new Error("No user found with the given id");

        const user = result.data();

        const pid = user.post;
        const cid = user.comments;

        let url = image.src;
        if (image && image.src.includes("https://") === false) {
            let filename = image.file.name;
            let ext = filename.split(".").pop();
            const actualFile = uid + "profile." + ext;

            const storage = getStorage();
            const imageRef = ref(storage, `profiles/${actualFile}`);

            await uploadBytesResumable(imageRef, image.file);
            url = await getDownloadURL(imageRef);
        }

        batch.update(userRef, {
            username,
            image: url,
            bio,
        });

        const postL = pid.length;
        if (postL > 0) {
            for (let i = 0; i < postL; i++) {
                const pRef = doc(db, "Posts", pid[i]);
                batch.update(pRef, {
                    username,
                    userImage: url,
                });
            }
        }

        const commentL = cid.length;
        if (commentL > 0) {
            for (let i = 0; i < commentL; i++) {
                const cRef = doc(db, "Comments", cid[i]);
                batch.update(cRef, {
                    username,
                    userImage: url,
                });
            }
        }

        await batch.commit();
    };
};
