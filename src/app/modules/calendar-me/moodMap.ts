export type Mood = 'happy' | 'sad' | 'stressed' | 'neutral' | 'angry';

export interface MoodItem {
  name: Mood;
  emoji: string;
  class: string;
}

export const moodList: MoodItem[] = [
  { name: 'happy', emoji: '😊', class: 'bg-green-300' },
  { name: 'neutral', emoji: '😐', class: 'bg-yellow-300' },
  { name: 'sad', emoji: '😞', class: 'bg-blue-300' },
  { name: 'stressed', emoji: '😟', class: 'bg-orange-300' },
  { name: 'angry', emoji: '😠', class: 'bg-red-300' },
];

const moodEmojiMap: Record<Mood, string> = moodList.reduce((acc, item) => {
  acc[item.name] = item.emoji;
  return acc;
}, {} as Record<Mood, string>);

export function getEmojiByMood(mood: Mood): string {
  return moodEmojiMap[mood];
}
