export interface Suggestion {
  rowId: number;
  timestamp: string;
  suggestion: string;
  category: 'New Feature Request' | 'Improvement' | 'Bug Report' | 'Other';
  upvotes: number;
  downvotes: number;
}

export interface SuggestionsApiResponse {
  success: boolean;
  suggestions: Suggestion[];
}

export interface VotePayload {
  rowId: number;
  voteType: 'upvote' | 'downvote';
}
