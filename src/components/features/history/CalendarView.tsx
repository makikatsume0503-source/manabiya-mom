import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';
import type { CoachingPhase } from '../../../types';

interface CalendarViewProps {
    selectedDate: Date;
    onChange: (date: Date) => void;
    history: Record<string, CoachingPhase>;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ selectedDate, onChange, history }) => {

    const formatDateKey = (date: Date): string => {
        return date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    };

    const hasData = (date: Date) => {
        const key = formatDateKey(date);
        const data = history[key];
        if (!data) return false;

        return (
            data.pre.length > 0 ||
            data.on.length > 0 ||
            data.post.trim() !== '' ||
            data.action.length > 0
        );
    };

    return (
        <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{
                marginTop: 0,
                marginBottom: '1rem',
                color: 'var(--color-primary)',
                fontSize: '1.25rem',
                borderBottom: '2px solid var(--color-accent)',
                paddingBottom: '0.5rem'
            }}>
                日付選択 (History)
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Calendar
                    onChange={(value) => onChange(value as Date)}
                    value={selectedDate}
                    locale="ja-JP"
                    formatDay={(locale, date) => new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date)}
                    tileClassName={({ date, view }) => {
                        if (view === 'month' && hasData(date)) {
                            return 'has-data';
                        }
                        return null;
                    }}
                />
            </div>
            <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--color-text-sub)' }}>
                選択中の日付: {selectedDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
            </p>
        </div>
    );
};
