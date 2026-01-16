import React from 'react';
import type { Goal } from '../../../types';

interface GoalSectionProps {
    goal: Goal;
    onChange: (newGoal: Goal) => void;
}

export const GoalSection: React.FC<GoalSectionProps> = ({ goal, onChange }) => {
    const handleChange = (field: keyof Goal, value: string) => {
        onChange({ ...goal, [field]: value });
    };

    return (
        <div className="card" style={{ marginBottom: '2rem', borderTop: '4px solid var(--color-primary)' }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                私のゴール (Goal)
            </h2>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color-text-sub)' }}>
                        ① 人生をかけて
                    </label>
                    <textarea
                        value={goal.lifetime}
                        onChange={(e) => handleChange('lifetime', e.target.value)}
                        placeholder="家族との時間を大切にしながら..."
                        rows={2}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color-text-sub)' }}>
                            ② 今年
                        </label>
                        <textarea
                            value={goal.year}
                            onChange={(e) => handleChange('year', e.target.value)}
                            placeholder="息子の就学準備で..."
                            rows={3}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color-text-sub)' }}>
                            ③ 今月
                        </label>
                        <textarea
                            value={goal.month}
                            onChange={(e) => handleChange('month', e.target.value)}
                            placeholder="AI活用した仕事を増やす..."
                            rows={3}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
