import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { GoalSection } from './components/features/goals/GoalSection';
import { CoachingCycle } from './components/features/coaching/CoachingCycle';
import { CalendarView } from './components/features/history/CalendarView';
// import useLocalStorage from './hooks/useLocalStorage'; // Deprecated for Firebase
import { useFirebaseData } from './hooks/useFirebaseData';
import { useFirebaseCollection } from './hooks/useFirebaseCollection';
import { LoginButton } from './components/auth/LoginButton';
import { auth } from './lib/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import type { Goal, CoachingPhase } from './types';
import { initialCoachingPhase } from './types';

// Helper to format date key YYYY-MM-DD using Local Time
const formatDateKey = (date: Date): string => {
  return date.toLocaleDateString('en-CA');
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Goals: Sync with 'users/{uid}/goals/current'
  const [goal, setGoal] = useFirebaseData<Goal>(
    user?.uid,
    'goals',
    'current',
    { lifetime: '', year: '', month: '' }
  );

  // History: Sync with 'users/{uid}/history/{dateKey}'
  // Note: For the Calendar dots (history view), we ideally need to fetch ALL history keys.
  // The current useFirebaseData only fetches ONE document.
  // For now, let's keep the single fetch for the *selected date* editing.
  // For the *dots*, we might need a separate hook or a collection listener.
  // To keep it simple for this iteration: We will only sync the *currently selected date* to Firebase.
  // The "History" prop for calendar dots might act differently or we need to fetch fetched history.
  // Let's implement a limitation: The "dots" might initially disappear until we load them.
  // OR: We create a separate hook to load the ENTIRE history collection for the dots? 
  // Let's assume we want to just sync the basic editing first.

  // Actually, to make the calendar dots work, we need a map of ALL history.
  // Let's use a "history" collection listener for the whole collection?
  // It might be too much data if years pass.
  // Alternative: Just load the *current month*?
  // For now, let's try to load the *entire* history into a Record<string, CoachingPhase> 
  // by listening to the collection 'users/{uid}/history'.
  // But useFirebaseData fetches a DOCUMENT.

  // Modification: Let's use a specialized hook here or just fetch the single doc for editing 
  // and maybe lose the "dots" feature temporarily on other devices?
  // User asked for dots specifically.
  // Let's create a specialized hook for fetching collection list for dots in the next step if needed.
  // For now, let's replace the editing logic.

  const dateKey = formatDateKey(selectedDate);
  const [currentCoachingData, setCurrentCoachingData] = useFirebaseData<CoachingPhase>(
    user?.uid,
    'history',
    dateKey,
    initialCoachingPhase
  );

  // Fetch entire history collection for calendar dots
  const historyForDots = useFirebaseCollection<CoachingPhase>(user?.uid, 'history');

  if (authLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (!user) {
    return <LoginButton />;
  }

  return (
    <Layout>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* User Info Header? */}
        <div style={{ textAlign: 'right', marginBottom: '1rem', fontSize: '0.8rem', color: '#666' }}>
          Logged in as: {user.displayName || user.email}
          <button onClick={() => auth.signOut()} style={{ marginLeft: '1rem', cursor: 'pointer', background: 'none', border: 'none', color: 'blue', textDecoration: 'underline' }}>Logout</button>
        </div>

        <GoalSection goal={goal} onChange={setGoal} />

        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>

          <CalendarView selectedDate={selectedDate} onChange={setSelectedDate} history={historyForDots} />

          <div>
            <h2 style={{
              textAlign: 'center',
              marginBottom: '2rem',
              color: 'var(--color-text-main)',
              position: 'relative'
            }}>
              <span style={{ borderBottom: '4px solid var(--color-accent)', paddingBottom: '0.5rem' }}>
                {selectedDate.toLocaleDateString('ja-JP')} のサイクル
              </span>
            </h2>
            <CoachingCycle data={currentCoachingData} onChange={setCurrentCoachingData} />
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default App;
