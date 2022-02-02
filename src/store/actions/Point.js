import {
    setDoc,
    getDoc,
    doc,
    writeBatch,
    query,
    where,
    onSnapshot,
    collection,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import uuid from "react-uuid";

import { db } from "../../db/db";

export const FETCH_POINT_CLAIM = "FETCH_POINT_CLAIM";

export const addNewClaimPoint = (number, amount, name) => {
    return async (dispatch) => {
        const batch = writeBatch(db);
        const id = uuid();

        const auth = getAuth();
        const { uid } = auth.currentUser;
        const udoc = doc(db, "Users", uid);
        const result = await getDoc(udoc);
        if (result.exists === false)
            throw new Error("No user found with the given id");

        const user = result.data();
        const username = user.username;
        const userImage = user.image;
        const points = user.points;

        const pdoc = doc(db, "Claims", id);

        batch.set(pdoc, {
            id,
            name,
            amount,
            number,
            username,
            userImage,
            uid,
            date: new Date().getTime(),
            paid: false,
        });

        batch.update(udoc, {
            points: points - Number(amount),
        });

        await batch.commit();
    };
};

export const fetchPointClaim = (uid) => {
    return async (dispatch) => {
        const q = query(collection(db, "Claims"), where("uid", "==", uid));

        onSnapshot(q, (querySnapshot) => {
            const pointClaim = [];

            querySnapshot?.forEach((documentSnapshot) => {
                pointClaim.push(documentSnapshot.data());
            });

            dispatch({ type: FETCH_POINT_CLAIM, payload: pointClaim });
        });
    };
};
