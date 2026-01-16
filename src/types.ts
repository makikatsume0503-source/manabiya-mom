export interface Goal {
    lifetime: string;
    year: string;
    month: string;
}

export interface CoachingItem {
    id: string;
    text: string;
    completed: boolean;
}

export interface CoachingPhase {
    pre: CoachingItem[];   // Plan
    on: CoachingItem[];    // Result
    post: string;          // Reflection
    action: CoachingItem[];// Next Action
}

// Helper to create empty phases
export const initialCoachingPhase: CoachingPhase = {
    pre: [],
    on: [],
    post: '',
    action: []
};
