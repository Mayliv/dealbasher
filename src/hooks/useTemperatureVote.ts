
import { useState, useCallback } from 'react';

type VoteType = 'hot' | 'cold' | null;

interface VoteState {
  temperature: number;
  userVote: VoteType;
  lastDelta: number | null;
}

const STORAGE_KEY = 'dealbasher_votes';

function getStoredVotes(): Record<string, { vote: VoteType; delta: number; temp: number }> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function storeVote(dealId: number, vote: VoteType, delta: number, temp: number) {
  const votes = getStoredVotes();
  votes[String(dealId)] = { vote, delta, temp };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
}

export function getStoredTemp(dealId: number, baseTemp: number): number {
  const votes = getStoredVotes();
  const entry = votes[String(dealId)];
  return entry ? entry.temp : baseTemp;
}

export function useTemperatureVote(dealId: number, baseTemperature: number) {
  const stored = getStoredVotes()[String(dealId)];

  const [state, setState] = useState<VoteState>({
    temperature: stored ? stored.temp : baseTemperature,
    userVote: stored ? stored.vote : null,
    lastDelta: null,
  });

  const vote = useCallback(
    (type: 'hot' | 'cold') => {
      if (state.userVote) return; // already voted

      const delta = type === 'hot'
        ? Math.floor(Math.random() * 11) + 5   // +5..+15
        : -(Math.floor(Math.random() * 11) + 5); // -5..-15

      const newTemp = state.temperature + delta;

      setState({
        temperature: newTemp,
        userVote: type,
        lastDelta: delta,
      });

      storeVote(dealId, type, delta, newTemp);
    },
    [dealId, state.userVote, state.temperature]
  );

  return { ...state, vote };
}
