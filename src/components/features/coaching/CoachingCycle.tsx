import React from 'react';
import type { CoachingPhase, CoachingItem } from '../../../types';
import { ItemList } from './ItemList';

interface CoachingCycleProps {
    data: CoachingPhase;
    onChange: (newData: CoachingPhase) => void;
}

export const CoachingCycle: React.FC<CoachingCycleProps> = ({ data, onChange }) => {

    const updateList = (field: keyof CoachingPhase, newItems: CoachingItem[]) => {
        onChange({ ...data, [field]: newItems });
    };

    const updateText = (field: keyof CoachingPhase, text: string) => {
        onChange({ ...data, [field]: text });
    };

    // Common card style with headers like the image (Red border-ish style, but using our theme colors)
    // Image headers: Pre (Red), On (Red), Post (Red), Action (Red)
    // We use Primary or Accent color for headers.

    const CardHeader = ({ title, sub }: { title: string, sub: string }) => (
        <h3 style={{
            margin: '0 0 1rem 0',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid var(--color-accent)',
            color: 'var(--color-primary)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline'
        }}>
            <span style={{ fontSize: '1.25rem' }}>{title}</span>
            <span style={{ fontSize: '1rem', color: 'var(--color-text-sub)' }}>{sub}</span>
        </h3>
    );

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

            {/* 1. Pre */}
            <div className="card">
                <CardHeader title="やると決めたこと" sub="Pre" />
                <ItemList
                    items={data.pre}
                    onChange={(items) => updateList('pre', items)}
                    placeholder="例: 継続案件の執筆..."
                />
            </div>

            {/* 2. On */}
            <div className="card">
                <CardHeader title="結果" sub="On" />
                <ItemList
                    items={data.on}
                    onChange={(items) => updateList('on', items)}
                    placeholder="例: 問題なく執筆できた..."
                />
            </div>

            {/* 3. Post (Reflection) - The user image usually has bullet points but the artifact plan said text area.
          Wait, the image shows bullet points for Post too. "・今週もAIを..."
          I will make it an ItemList too? Or a textarea that supports newlines. 
          The previous "Post" in the user image was text with bullets.
          Let's use a Textarea for free reflection as bullets might be restrictive for long thoughts.
      */}
            <div className="card">
                <CardHeader title="振り返り" sub="Post" />
                <textarea
                    value={data.post}
                    onChange={(e) => updateText('post', e.target.value)}
                    placeholder="例: 今週もAIを猛勉強した..."
                    rows={6}
                    style={{ width: '100%', resize: 'vertical' }}
                />
            </div>

            {/* 4. Action */}
            <div className="card">
                <CardHeader title="次のアクション" sub="Next" />
                <ItemList
                    items={data.action}
                    onChange={(items) => updateList('action', items)}
                    placeholder="例: 継続案件の執筆を..."
                />
            </div>

        </div>
    );
};
