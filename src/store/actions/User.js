import {
    getDoc,
    collection,
    doc,
    where,
    onSnapshot,
    query,
    writeBatch,
    updateDoc,
    getDocs,
} from "firebase/firestore";

import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";

import {
    getAuth,
    updateEmail,
    signInWithEmailAndPassword,
    updatePassword,
} from "firebase/auth";

import { orderBy } from "lodash";

import { db } from "../../db/db";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_POST = "FETCH_USER_POST";
export const FILTERED_USER = "FILTERED_USER";

const storage = getStorage();

export const fetchUser = (uid) => {
    return async (dispatch) => {
        onSnapshot(doc(db, "Users", uid), (querySnapshot) => {
            const user = querySnapshot?.data();

            dispatch({ type: FETCH_USER, payload: user });
        });
    };
};

export const fetchUserPost = (uid) => {
    return async (dispatch) => {
        const result = await getDoc(doc(db, "Users", uid));
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

export const updateUserProfile = (username, image, bio, uid) => {
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

export const updateUserEmail = (email, newEmail, password) => {
    return async (dispatch) => {
        const auth = getAuth();
        const { uid } = auth.currentUser;

        if (!newEmail || !password)
            throw new Error("Please the required field");

        await signInWithEmailAndPassword(auth, email, password);

        await updateEmail(auth.currentUser, newEmail);
        await updateDoc(doc(db, "Users", uid), {
            email: newEmail,
        });
    };
};

export const updateUserPassword = (currentP, password) => {
    return async (dispatch) => {
        const auth = getAuth();
        const { email } = auth.currentUser;

        await signInWithEmailAndPassword(auth, email, currentP);

        await updatePassword(auth.currentUser, password);
    };
};

export const updateProfileBg = (bgImage, uid) => {
    return async (dispatch) => {
        const docRef = doc(db, "Users", uid);
        const filename = bgImage.name;
        const ext = filename.split(".").pop();

        const actualFile = uid + "background." + ext;
        let url = null;

        if (bgImage) {
            const bgRef = ref(storage, `background/${actualFile}`);
            await uploadBytesResumable(bgRef, bgImage);

            url = await getDownloadURL(bgRef);
        }

        await updateDoc(docRef, {
            background: url,
        });
    };
};

export const searchForUser = (value) => {
    return async (dispatch) => {
        const result = await getDocs(collection(db, "Users"));

        const users = result.docs.map((doc) => doc.data());

        const map_users = users?.map((user) => {
            let res;
            if (user?.username) {
                const regexp = new RegExp(value, "gi");
                const result = user.username.match(regexp);
                if (result) {
                    res = user;
                }
            }

            return res;
        });

        const filteredUser = map_users.filter((user) => user !== undefined);

        dispatch({ type: FILTERED_USER, payload: filteredUser });
    };
};
