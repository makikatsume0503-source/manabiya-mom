import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { GoalSection } from './components/features/goals/GoalSection';
import { CoachingCycle } from './components/features/coaching/CoachingCycle';
import { CalendarView } from './components/features/history/CalendarView';
import useLocalStorage from './hooks/useLocalStorage';
import type { Goal, CoachingPhase } from './types';
import { initialCoachingPhase } from './types';

// Helper to format date key YYYY-MM-DD
const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

function App() {
  const [goal, setGoal] = useLocalStorage<Goal>('manabiya-goal', {
    lifetime: '',
    year: '',
    month: ''
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Store history as a map of date string -> data
  const [history, setHistory] = useLocalStorage<Record<string, CoachingPhase>>(
    'manabiya-history',
    {}
  );

  // Also keep the legacy key for migration or fallback, initially
  // On real app we might migrate once. Here simple logic:
  // If today's entry is missing in history, check if there is old single-data.
  // For simplicity in this iteration, we start fresh with history-based model.

  const dateKey = formatDateKey(selectedDate);
  const currentCoachingData = history[dateKey] || initialCoachingPhase;

  const handleCoachingChange = (newData: CoachingPhase) => {
    setHistory(prev => ({
      ...prev,
      [dateKey]: newData
    }));
  };

  return (
    <Layout>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <GoalSection goal={goal} onChange={setGoal} />

        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>

          <CalendarView selectedDate={selectedDate} onChange={setSelectedDate} history={history} />

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
            <CoachingCycle data={currentCoachingData} onChange={handleCoachingChange} />
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default App;
