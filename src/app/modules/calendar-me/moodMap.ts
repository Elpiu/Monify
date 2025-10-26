export type Mood = 'super-happy' | 'happy' | 'normal' | 'stressed-sad' | 'angry';

export interface MoodItem {
  name: Mood;
  emoji: string;
  class: string;
}

export const moodList: MoodItem[] = [
  { name: 'super-happy', emoji: '🤩', class: 'bg-green-200' },
  { name: 'happy', emoji: '😊', class: 'bg-green-400' },
  { name: 'normal', emoji: '😐', class: 'bg-yellow-300' },
  { name: 'stressed-sad', emoji: '😟', class: 'bg-orange-300' },
  { name: 'angry', emoji: '😡', class: 'bg-red-400' },
];

const moodEmojiMap: Record<Mood, string> = moodList.reduce((acc, item) => {
  acc[item.name] = item.emoji;
  return acc;
}, {} as Record<Mood, string>);

export function getEmojiByMood(mood: Mood): string {
  return moodEmojiMap[mood];
}
