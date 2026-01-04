// src/types/lifestyleSurvey.ts

export type Gender = "MALE" | "FEMALE";

export type EI = "E" | "I";
export type NS = "N" | "S";
export type TF = "T" | "F";
export type JP = "J" | "P";

export type ShowerFreq = "ONCE" | "TWICE" | "TWO_DAYS" | "RARE";
export type CleaningFreq = "ONCE" | "TWICE" | "TWO_DAYS" | "RARE";

export type ActivityLevel = "SMOKER" | "NON_SMOKER";

export type OutgoingFreq = "EVERY_WEEK" | "TWO_WEEKS" | "WEEKENDS" | "VACATION";

export type MealPlace = "DORM" | "OUTSIDE";

export type GamingTime = "NONE" | "ONE_MINUS" | "ONE_TO_THREE" | "THREE_PLUS";

export type DrinkFreq = "NONE" | "RARE" | "ONE_TWO" | "THREE_PLUS";

export interface LifestyleSurvey {
  age: number;
  department: string;
  gender: Gender;

  // MBTI
  mbti1: EI;
  mbti2: NS;
  mbti3: TF;
  mbti4: JP;

  // time (minutes)
  wakeTimeMinutes: number;
  sleepTimeMinutes: number;

  showerFreq: ShowerFreq;
  cleaningFreq: CleaningFreq;
  activityLevel: ActivityLevel;

  roomTraits: string[];
  coldSensitivity: boolean;
  hotSensitivity: boolean;

  outgoingFreq: OutgoingFreq;
  mealPlace: MealPlace;
  mealNote: string;

  gamingTime: GamingTime;
  drinkFreq: DrinkFreq;

  homeStyle: string[];
  hobbies: string[];

  roommateWish: string;
  selfTags: string[];
}
