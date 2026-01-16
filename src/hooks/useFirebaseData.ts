import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Generic hook to sync data with Firestore
// T must be an object that can be saved to Firestore
export function useFirebaseData<T>(
    userId: string | undefined,
    collectionName: string,
    docId: string,
    initialValue: T
) {
    // Local state to hold the data
    const [data, setData] = useState<T>(initialValue);
    const [loading, setLoading] = useState(true);

    // 1. Subscribe to Firestore updates
    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        // Path: users/{userId}/{collectionName}/{docId}
        // Example: users/123/history/2026-01-16
        const docRef = doc(db, 'users', userId, collectionName, docId);

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.data() as T);
            } else {
                // If doc doesn't exist yet, keep initial value (or could set to initialValue)
                // We don't auto-create here to avoid empty writes on read, 
                // but setting local state to initialValue is safe.
                setData(initialValue);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId, collectionName, docId]);

    // 2. Function to update data
    const setValue = async (newValue: T | ((val: T) => T)) => {
        if (!userId) return;

        try {
            // Allow functional updates like useState
            const valueToStore =
                newValue instanceof Function ? newValue(data) : newValue;

            // Optimistic update
            setData(valueToStore);

            // Save to Firestore
            const docRef = doc(db, 'users', userId, collectionName, docId);
            await setDoc(docRef, valueToStore as any); // Cast to any to avoid complex Firestore type issues for now

        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    return [data, setValue, loading] as const;
}
