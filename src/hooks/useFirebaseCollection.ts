import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useFirebaseCollection<T>(userId: string | undefined, collectionName: string) {
    const [data, setData] = useState<Record<string, T>>({});

    useEffect(() => {
        if (!userId) return;

        // Listen to the entire collection (users/{uid}/history)
        const colRef = collection(db, 'users', userId, collectionName);

        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const newData: Record<string, T> = {};
            snapshot.forEach((doc) => {
                newData[doc.id] = doc.data() as T;
            });
            setData(newData);
        }, (error) => {
            console.error("Error fetching collection:", error);
        });

        return () => unsubscribe();
    }, [userId, collectionName]);

    return data;
}
