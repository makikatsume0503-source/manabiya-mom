import React, { useState } from 'react';
import type { CoachingItem } from '../../../types';
import { Plus, X, Check } from 'lucide-react';

interface ItemListProps {
    items: CoachingItem[];
    onChange: (items: CoachingItem[]) => void;
    placeholder?: string;
}

export const ItemList: React.FC<ItemListProps> = ({ items, onChange, placeholder }) => {
    const [newItemText, setNewItemText] = useState('');

    const handleAdd = () => {
        if (!newItemText.trim()) return;
        const newItem: CoachingItem = {
            id: Date.now().toString(),
            text: newItemText,
            completed: false,
        };
        onChange([...items, newItem]);
        setNewItemText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAdd();
        }
    };

    const handleDelete = (id: string) => {
        onChange(items.filter(item => item.id !== id));
    };

    const handleToggle = (id: string) => {
        onChange(items.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    return (
        <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                {items.map(item => (
                    <li key={item.id} style={{ display: 'flex', alignItems: 'start', marginBottom: '0.5rem', gap: '0.5rem' }}>
                        <button
                            onClick={() => handleToggle(item.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: item.completed ? 'var(--color-primary)' : '#ccc',
                                padding: '2px'
                            }}
                        >
                            <Check size={18} />
                        </button>
                        <span style={{
                            flex: 1,
                            textDecoration: item.completed ? 'line-through' : 'none',
                            color: item.completed ? '#aaa' : 'inherit'
                        }}>
                            {item.text}
                        </span>
                        <button
                            onClick={() => handleDelete(item.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc' }}
                        >
                            <X size={16} />
                        </button>
                    </li>
                ))}
            </ul>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder || "項目を追加..."}
                    style={{ flex: 1 }}
                />
                <button
                    onClick={handleAdd}
                    className="btn btn-primary"
                    style={{ padding: '0.5rem', minWidth: 'auto' }}
                >
                    <Plus size={20} />
                </button>
            </div>
        </div>
    );
};
