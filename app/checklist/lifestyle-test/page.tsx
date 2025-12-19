'use client';

import React from 'react';
import { StepTabs } from '@/components/survey/StepTabs';
import { CheckboxGroup, TextAreaWithPreview, TagInput } from '@/components/survey/QuestionControls';
import { getAccessToken } from 'lib/auth';

const STEPS = [
    '기본정보 4문항',
    '생활루틴 2문항',
    '위생청결 2문항',
    '생활습관 5문항',
    '취미여가 4문항',
    '룸메기대 1문항',
];

type Phase = 'form' | 'selfTag' | 'complete';

type BasicInfo = {
    age: string;
    department: string;
    gender: 'male' | 'female' | '';
    mbti: string;
};

const MBTI_PAIRS: [string, string][] = [
    ['E', 'I'],
    ['N', 'S'],
    ['T', 'F'],
    ['J', 'P'],
];

type LifestyleSurveyPayload = {
    age: number;
    department: string;

    gender: 'MALE' | 'FEMALE';

    mbti1: 'E' | 'I';
    mbti2: 'N' | 'S';
    mbti3: 'T' | 'F';
    mbti4: 'J' | 'P';

    wakeTimeMinutes: number;
    sleepTimeMinutes: number;

    showerFreq: 'ONCE' | 'TWICE' | 'TWO_DAYS' | 'RARE';
    cleaningFreq: 'ONCE' | 'TWICE' | 'TWO_DAYS' | 'RARE';

    activityLevel: 'SMOKER' | 'NON_SMOKER';

    roomTraits: string[];

    coldSensitivity: boolean;
    hotSensitivity: boolean;

    outgoingFreq: 'EVERY_WEEK' | 'TWO_WEEKS' | 'WEEKENDS' | 'VACATION';

    mealPlace: 'DORM' | 'OUTSIDE' | null;
    mealNote: string | null;

    gamingTime: 'NONE' | 'ONE_MINUS' | 'ONE_TO_THREE' | 'THREE_PLUS';
    drinkFreq: 'NONE' | 'RARE' | 'ONE_TWO' | 'THREE_PLUS';

    homeStyle: string[];
    hobbies: string[];

    roommateWish: string;
    selfTags: string[];
};

const mapGender = (v: BasicInfo['gender']): 'MALE' | 'FEMALE' => {
    if (v === 'male') return 'MALE';
    return 'FEMALE';
};

const mapShowerFreq = (v: string): 'ONCE' | 'TWICE' | 'TWO_DAYS' | 'RARE' => {
    switch (v) {
        case '1':
            return 'ONCE';
        case '2+':
            return 'TWICE';
        case '2days':
            return 'TWO_DAYS';
        default:
            return 'RARE';
    }
};

const mapCleaningFreq = (v: string): 'ONCE' | 'TWICE' | 'TWO_DAYS' | 'RARE' => {
    switch (v) {
        case '1':
            return 'ONCE';
        case '2+':
            return 'TWICE';
        case '2days':
            return 'TWO_DAYS';
        default:
            return 'RARE';
    }
};

const mapActivityLevel = (v: string): 'SMOKER' | 'NON_SMOKER' => {
    return v === 'smoker' ? 'SMOKER' : 'NON_SMOKER';
};

const mapOutgoingFreq = (v: string): 'EVERY_WEEK' | 'TWO_WEEKS' | 'WEEKENDS' | 'VACATION' => {
    switch (v) {
        case 'every-week':
            return 'EVERY_WEEK';
        case 'two-weeks':
            return 'TWO_WEEKS';
        case 'weekends':
            return 'WEEKENDS';
        default:
            return 'VACATION';
    }
};

const mapMealPlace = (v: string): 'DORM' | 'OUTSIDE' | null => {
    if (!v) return null;
    return v === 'dorm' ? 'DORM' : 'OUTSIDE';
};

const mapGamingTime = (v: string): 'NONE' | 'ONE_MINUS' | 'ONE_TO_THREE' | 'THREE_PLUS' => {
    switch (v) {
        case 'none':
            return 'NONE';
        case '1-':
            return 'ONE_MINUS';
        case '1-3':
            return 'ONE_TO_THREE';
        default:
            return 'THREE_PLUS';
    }
};

const mapDrinkFreq = (v: string): 'NONE' | 'RARE' | 'ONE_TWO' | 'THREE_PLUS' => {
    switch (v) {
        case 'none':
            return 'NONE';
        case 'rare':
            return 'RARE';
        case '1-2':
            return 'ONE_TWO';
        default:
            return 'THREE_PLUS';
    }
};

const mapYesNoToBool = (v: string): boolean => v === 'yes';

const splitMbti = (mbti: string) => {
    if (mbti.length !== 4) throw new Error('MBTI가 4글자가 아니에요.');
    const [mbti1, mbti2, mbti3, mbti4] = mbti.toUpperCase().split('');
    return {
        mbti1: mbti1 as 'E' | 'I',
        mbti2: mbti2 as 'N' | 'S',
        mbti3: mbti3 as 'T' | 'F',
        mbti4: mbti4 as 'J' | 'P',
    };
};

const parseKoreanTimeToMinutes = (text: string): number => {
    const trimmed = text.trim();
    const isPM = trimmed.startsWith('오후');
    const isAM = trimmed.startsWith('오전');
    if (!isPM && !isAM) throw new Error('시간 형식이 올바르지 않아요.');

    const m = trimmed.match(/(오전|오후)\s*(\d{1,2})시\s*(\d{1,2})분/);
    if (!m) throw new Error('시간 형식이 올바르지 않아요.');

    let hour = Number(m[2]);
    const minute = Number(m[3]);

    if (Number.isNaN(hour) || Number.isNaN(minute)) throw new Error('시간 숫자가 올바르지 않아요.');
    if (hour < 0 || hour > 12) throw new Error('시(hour)는 1~12 범위로 입력해 주세요.');
    if (minute < 0 || minute > 59) throw new Error('분(minute)은 0~59 범위로 입력해 주세요.');

    if (isAM && hour === 12) hour = 0;
    if (isPM && hour !== 12) hour += 12;

    return hour * 60 + minute;
};

type CircleOptionProps = {
    label: string;
    selected: boolean;
    onClick: () => void;
};

function CircleOption({ label, selected, onClick }: CircleOptionProps) {
    return (
        <button type="button" onClick={onClick} className="flex w-full items-center gap-3 py-2">
            <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
                    selected ? 'border-[#4CB7A5]' : 'border-gray-300'
                }`}
            >
                {selected && <span className="block h-2.5 w-2.5 rounded-full bg-[#4CB7A5]" />}
            </span>
            <span className="text-sm text-gray-800">{label}</span>
        </button>
    );
}

type ToggleYesNoProps = {
    label: string;
    value: string;
    onChange: (v: string) => void;
};

function ToggleYesNo({ label, value, onChange }: ToggleYesNoProps) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-800">{label}</span>
            <div className="inline-flex rounded-full bg-gray-100 p-1">
                <button
                    type="button"
                    onClick={() => onChange('yes')}
                    className={`h-8 px-4 rounded-full text-xs font-medium transition ${
                        value === 'yes' ? 'bg-[#4CB7A5] text-white' : 'text-gray-500'
                    }`}
                >
                    네
                </button>
                <button
                    type="button"
                    onClick={() => onChange('no')}
                    className={`h-8 px-4 rounded-full text-xs font-medium transition ${
                        value === 'no' ? 'bg-[#4CB7A5] text-white' : 'text-gray-500'
                    }`}
                >
                    아니요
                </button>
            </div>
        </div>
    );
}

export default function LifestyleTestPage() {
    const [phase, setPhase] = React.useState<Phase>('form');
    const [currentStep, setCurrentStep] = React.useState(0);

    const [basicInfo, setBasicInfo] = React.useState<BasicInfo>({
        age: '',
        department: '',
        gender: '',
        mbti: '',
    });

    const [wakeTime, setWakeTime] = React.useState('');
    const [sleepTime, setSleepTime] = React.useState('');

    const [showerFreq, setShowerFreq] = React.useState('');
    const [cleaningFreq, setCleaningFreq] = React.useState('');

    const [activityLevel, setActivityLevel] = React.useState('');
    const [roomTraits, setRoomTraits] = React.useState<string[]>([]);
    const [temperaturePref, setTemperaturePref] = React.useState<{ cold: string; hot: string }>({ cold: '', hot: '' });
    const [outgoingFreq, setOutgoingFreq] = React.useState('');
    const [mealPlace, setMealPlace] = React.useState('');
    const [mealNote, setMealNote] = React.useState('');
    const isMealAnswered = mealPlace !== '' || mealNote.trim().length > 0;

    const [gamingTime, setGamingTime] = React.useState('');
    const [drinkFreq, setDrinkFreq] = React.useState('');
    const [homeStyle, setHomeStyle] = React.useState<string[]>([]);
    const [hobbies, setHobbies] = React.useState<string[]>([]);

    const [roommateWish, setRoommateWish] = React.useState('');

    const [selfTags, setSelfTags] = React.useState<string[]>([]);

    const canGoNext = () => {
        if (phase !== 'form') return false;

        switch (currentStep) {
            case 0:
                return (
                    basicInfo.age !== '' &&
                    basicInfo.department !== '' &&
                    basicInfo.gender !== '' &&
                    basicInfo.mbti.length === 4
                );
            case 1:
                return wakeTime !== '' && sleepTime !== '';
            case 2:
                return showerFreq !== '' && cleaningFreq !== '';
            case 3:
                return (
                    activityLevel !== '' &&
                    roomTraits.length > 0 &&
                    temperaturePref.cold !== '' &&
                    temperaturePref.hot !== '' &&
                    outgoingFreq !== '' &&
                    isMealAnswered
                );
            case 4:
                return gamingTime !== '' && drinkFreq !== '' && homeStyle.length > 0 && hobbies.length > 0;
            case 5:
                return roommateWish.length > 0;
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (phase !== 'form') return;

        if (currentStep === STEPS.length - 1) {
            setPhase('selfTag');
            return;
        }
        setCurrentStep((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (phase === 'form') {
            if (currentStep === 0) return;
            setCurrentStep((prev) => prev - 1);
        } else if (phase === 'selfTag') {
            setPhase('form');
            setCurrentStep(STEPS.length - 1);
        }
    };

    const handleSubmitAll = async () => {
        if (selfTags.length < 5) return;

        try {
            const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
            if (!apiBase) throw new Error('NEXT_PUBLIC_API_BASE_URL 환경변수가 없어요.');

            const token = getAccessToken();
            if (!token) throw new Error('로그인이 필요해요(토큰 없음).');

            const { mbti1, mbti2, mbti3, mbti4 } = splitMbti(basicInfo.mbti);

            const payload: LifestyleSurveyPayload = {
                age: Number(basicInfo.age),
                department: basicInfo.department,

                gender: mapGender(basicInfo.gender),

                mbti1,
                mbti2,
                mbti3,
                mbti4,

                wakeTimeMinutes: parseKoreanTimeToMinutes(wakeTime),
                sleepTimeMinutes: parseKoreanTimeToMinutes(sleepTime),

                showerFreq: mapShowerFreq(showerFreq),
                cleaningFreq: mapCleaningFreq(cleaningFreq),

                activityLevel: mapActivityLevel(activityLevel),

                roomTraits,

                coldSensitivity: mapYesNoToBool(temperaturePref.cold),
                hotSensitivity: mapYesNoToBool(temperaturePref.hot),

                outgoingFreq: mapOutgoingFreq(outgoingFreq),

                mealPlace: mapMealPlace(mealPlace),
                mealNote: mealNote.trim() ? mealNote.trim() : null,

                gamingTime: mapGamingTime(gamingTime),
                drinkFreq: mapDrinkFreq(drinkFreq),

                homeStyle,
                hobbies,

                roommateWish,
                selfTags,
            };

            const res = await fetch(`${apiBase}/lifestyle-survey`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error(res.status, text);
                throw new Error(`서버 오류: ${res.status} ${text}`);
            }

            setPhase('complete');
            console.log('제출 성공 payload:', payload);
        } catch (e) {
            console.error(e);
            alert(e instanceof Error ? e.message : '제출 중 오류가 발생했어요.');
        }
    };

    if (phase === 'selfTag') {
        const canFinishMatching = selfTags.length >= 5;

        return (
            <div className="mx-auto px-4 py-10">
                <StepTabs steps={STEPS} currentStep={STEPS.length - 1} />
                <section className="mt-6 rounded-2xl bg-white px-6 py-10 shadow-sm">
                    <p className="mb-2 text-xs font-semibold text-[#4CB7A5]">라이프 스타일 테스트</p>
                    <h1 className="mb-2 text-2xl font-semibold">당신은 어떤 사람인가요?</h1>
                    <p className="mb-6 text-xl text-[#5F5F5F]">
                        룸메이트가 당신을 더 잘 이해할 수 있도록, 나를 표현하는 키워드를 5개 작성해 주세요. (6자 이하)
                    </p>

                    <TagInput tags={selfTags} onChange={setSelfTags} maxTags={5} />

                    <div className="mt-10 flex justify-between gap-4">
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="flex-1 rounded-full bg-gray-100 py-3 text-sm font-medium text-gray-500"
                        >
                            이전
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmitAll}
                            disabled={!canFinishMatching}
                            className={`flex-1 rounded-full py-3 text-sm font-medium transition ${
                                canFinishMatching
                                    ? 'bg-[#4CB7A5] text-white hover:bg-[#3aa594]'
                                    : 'cursor-not-allowed bg-gray-200 text-gray-400'
                            }`}
                        >
                            완료
                        </button>
                    </div>

                    <p className="mt-3 text-xs text-gray-400">태그 5개를 모두 입력하면 완료 버튼이 활성화됩니다.</p>
                </section>
            </div>
        );
    }

    if (phase === 'complete') {
        return (
            <div className="mx-auto px-4 py-10">
                <StepTabs steps={STEPS} currentStep={STEPS.length - 1} />

                <section className="mt-6 rounded-2xl bg-white px-6 py-10 shadow-sm">
                    <p className="mb-2 text-xs font-semibold text-[#4CB7A5]">라이프 스타일 테스트</p>
                    <h2 className="mb-2  text-m ">모든 준비가 끝났어요.</h2>
                    <p className="mb-8 text-2xl font-bold">나와 어울리는 룸메이트를 만나러 가볼까요?</p>

                    <div className="flex justify-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#E4F5F1] text-4xl">
                            🔔
                        </div>
                    </div>
                    <div className="mt-10 flex justify-center gap-4">
                        <button className="rounded-lg bg-gray-100 px-6 py-3 text-sm font-medium text-gray-400">
                            메인 홈으로 가기
                        </button>
                        <button className="rounded-lg bg-[#4CB7A5] px-6 py-3 text-sm font-medium text-white hover:bg-[#3aa594]">
                            지금 바로 매칭 시작
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="mx-auto px-4 py-10">
            <section className="mt-6 rounded-2xl bg-white px-6 py-10 shadow-sm">
                <p className="mb-2 text-xs text-[#4CB7A5]">라이프 스타일 테스트</p>
                <h1 className="mb-2 text-2xl font-semibold text-[#1B1B1B]">당신의 생활 습관에 맞게 선택해 주세요</h1>
                <StepTabs steps={STEPS} currentStep={currentStep} />
                <div className="mt-8 space-y-10">
                    {currentStep === 0 && <StepBasicInfo basicInfo={basicInfo} setBasicInfo={setBasicInfo} />}

                    {currentStep === 1 && (
                        <StepRoutine
                            wakeTime={wakeTime}
                            setWakeTime={setWakeTime}
                            sleepTime={sleepTime}
                            setSleepTime={setSleepTime}
                        />
                    )}

                    {currentStep === 2 && (
                        <StepHygiene
                            showerFreq={showerFreq}
                            setShowerFreq={setShowerFreq}
                            cleaningFreq={cleaningFreq}
                            setCleaningFreq={setCleaningFreq}
                        />
                    )}

                    {currentStep === 3 && (
                        <StepLifestyle
                            activityLevel={activityLevel}
                            setActivityLevel={setActivityLevel}
                            roomTraits={roomTraits}
                            setRoomTraits={setRoomTraits}
                            temperaturePref={temperaturePref}
                            setTemperaturePref={setTemperaturePref}
                            outgoingFreq={outgoingFreq}
                            setOutgoingFreq={setOutgoingFreq}
                            mealPlace={mealPlace}
                            setMealPlace={setMealPlace}
                            mealNote={mealNote}
                            setMealNote={setMealNote}
                        />
                    )}

                    {currentStep === 4 && (
                        <StepHobby
                            gamingTime={gamingTime}
                            setGamingTime={setGamingTime}
                            drinkFreq={drinkFreq}
                            setDrinkFreq={setDrinkFreq}
                            homeStyle={homeStyle}
                            setHomeStyle={setHomeStyle}
                            hobbies={hobbies}
                            setHobbies={setHobbies}
                        />
                    )}

                    {currentStep === 5 && (
                        <StepRoommateWish roommateWish={roommateWish} setRoommateWish={setRoommateWish} />
                    )}
                </div>

                <div className="mt-10 flex justify-between gap-4">
                    <button
                        type="button"
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className={`flex-1 rounded-full py-3 text-sm font-medium ${
                            currentStep === 0
                                ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        이전
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={!canGoNext()}
                        className={`flex-1 rounded-full py-3 text-sm font-medium transition ${
                            canGoNext()
                                ? 'bg-[#4CB7A5] text-white hover:bg-[#3aa594]'
                                : 'cursor-not-allowed bg-gray-200 text-gray-400'
                        }`}
                    >
                        다음 단계
                    </button>
                </div>
            </section>
        </div>
    );
}

type StepBasicInfoProps = {
    basicInfo: BasicInfo;
    setBasicInfo: React.Dispatch<React.SetStateAction<BasicInfo>>;
};

function StepBasicInfo({ basicInfo, setBasicInfo }: StepBasicInfoProps) {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">1. 나이를 알려주세요.</span>
                </div>
                <input
                    type="number"
                    value={basicInfo.age}
                    onChange={(e) => setBasicInfo((prev) => ({ ...prev, age: e.target.value }))}
                    placeholder="예: 23"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#4CB7A5]"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">2. 학부를 선택해 주세요.</span>
                </div>
                <select
                    value={basicInfo.department}
                    onChange={(e) => setBasicInfo((prev) => ({ ...prev, department: e.target.value }))}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#4CB7A5]"
                >
                    <option value="">학부 선택</option>
                    <option value="기독교학부">기독교학부</option>
                    <option value="어문학부">어문학부</option>
                    <option value="사회복지학부">사회복지학부</option>
                    <option value="경찰학부">경찰학부</option>
                    <option value="경상학부">경상학부</option>
                    <option value="관광학부">관광학부</option>
                    <option value="사범학부">사범학부</option>
                    <option value="컴퓨터공학부">컴퓨터공학부</option>
                    <option value="보건학부">보건학부</option>
                    <option value="간호학과">간호학과</option>
                    <option value="디자인영상학부">디자인영상학부</option>
                    <option value="스포츠과학부">스포츠과학부</option>
                    <option value="문화예술학부">문화예술학부</option>
                    <option value="혁신교육플랫폼대학">혁신교육플랫폼대학</option>
                    <option value="첨단IT학부">첨단IT학부</option>
                    <option value="외식산업학부">외식산업학부</option>
                    <option value="자유전공학부">자유전공학부</option>
                    <option value="국제학부">국제학부</option>
                </select>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">3. 성별을 선택해 주세요.</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => setBasicInfo((prev) => ({ ...prev, gender: 'male' }))}
                        className={`h-11 rounded-full border text-sm transition ${
                            basicInfo.gender === 'male'
                                ? 'border-[#4CB7A5] bg-[#E4F5F1] text-[#20927E]'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-[#4CB7A5]/60'
                        }`}
                    >
                        남성
                    </button>
                    <button
                        type="button"
                        onClick={() => setBasicInfo((prev) => ({ ...prev, gender: 'female' }))}
                        className={`h-11 rounded-full border text-sm transition ${
                            basicInfo.gender === 'female'
                                ? 'border-[#4CB7A5] text-[#4CB7A5]'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-[#4CB7A5]/60'
                        }`}
                    >
                        여성
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">4. MBTI를 알려주세요.</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {MBTI_PAIRS.map(([left, right], rowIndex) => {
                        const selected = basicInfo.mbti[rowIndex] || '';

                        const handleClick = (ch: string) => {
                            const arr = basicInfo.mbti.padEnd(4, ' ').slice(0, 4).split('');
                            arr[rowIndex] = arr[rowIndex] === ch ? ' ' : ch;
                            const next = arr.join('').trimEnd();
                            setBasicInfo((prev) => ({ ...prev, mbti: next }));
                        };

                        const renderButton = (ch: string) => {
                            const isActive = selected === ch;
                            return (
                                <button
                                    key={ch}
                                    type="button"
                                    onClick={() => handleClick(ch)}
                                    className={`h-11 rounded-xl border text-sm font-medium transition ${
                                        isActive
                                            ? 'border-[#4CB7A5] bg-white text-[#4CB7A5]'
                                            : 'border-transparent bg-[#F3F4F6] text-[#BDBDBD]'
                                    }`}
                                >
                                    {ch}
                                </button>
                            );
                        };

                        return (
                            <React.Fragment key={rowIndex}>
                                {renderButton(left)}
                                {renderButton(right)}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

type StepRoutineProps = {
    wakeTime: string;
    setWakeTime: (v: string) => void;
    sleepTime: string;
    setSleepTime: (v: string) => void;
};

function StepRoutine({ setWakeTime, setSleepTime }: StepRoutineProps) {
    const [wakePeriod, setWakePeriod] = React.useState<'오전' | '오후'>('오전');
    const [wakeDetail, setWakeDetail] = React.useState('');
    const [sleepPeriod, setSleepPeriod] = React.useState<'오전' | '오후'>('오후');
    const [sleepDetail, setSleepDetail] = React.useState('');

    React.useEffect(() => {
        if (wakeDetail.trim()) setWakeTime(`${wakePeriod} ${wakeDetail.trim()}`);
        else setWakeTime('');
    }, [wakePeriod, wakeDetail, setWakeTime]);

    React.useEffect(() => {
        if (sleepDetail.trim()) setSleepTime(`${sleepPeriod} ${sleepDetail.trim()}`);
        else setSleepTime('');
    }, [sleepPeriod, sleepDetail, setSleepTime]);

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">5. 기상 시간대를 선택해주세요.</span>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setWakePeriod((prev) => (prev === '오전' ? '오후' : '오전'))}
                        className="h-9 w-20 rounded-full border border-gray-200 bg-white text-xs text-gray-700 outline-none"
                    >
                        {wakePeriod}
                    </button>

                    <input
                        type="text"
                        value={wakeDetail}
                        onChange={(e) => setWakeDetail(e.target.value)}
                        placeholder="00시 00분"
                        className="h-9 flex-1 rounded-full border border-gray-200 bg-white px-4 text-xs text-gray-700 outline-none focus:border-[#4CB7A5]"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">6. 취침 시간대를 선택해주세요.</span>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setSleepPeriod((prev) => (prev === '오전' ? '오후' : '오전'))}
                        className="h-9 w-20 rounded-full border border-gray-200 bg-white text-xs text-gray-700 outline-none"
                    >
                        {sleepPeriod}
                    </button>

                    <input
                        type="text"
                        value={sleepDetail}
                        onChange={(e) => setSleepDetail(e.target.value)}
                        placeholder="00시 00분"
                        className="h-9 flex-1 rounded-full border border-gray-200 bg-white px-4 text-xs text-gray-700 outline-none focus:border-[#4CB7A5]"
                    />
                </div>
            </div>
        </div>
    );
}

type StepHygieneProps = {
    showerFreq: string;
    setShowerFreq: (v: string) => void;
    cleaningFreq: string;
    setCleaningFreq: (v: string) => void;
};

function StepHygiene({ showerFreq, setShowerFreq, cleaningFreq, setCleaningFreq }: StepHygieneProps) {
    return (
        <div className="space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">7. 샤워는 보통 얼마나 자주 하시나요?</span>
                </div>
                <div className="flex flex-col">
                    <CircleOption
                        label="하루에 한 번 정도"
                        selected={showerFreq === '1'}
                        onClick={() => setShowerFreq('1')}
                    />
                    <CircleOption
                        label="하루에 두 번 이상"
                        selected={showerFreq === '2+'}
                        onClick={() => setShowerFreq('2+')}
                    />
                    <CircleOption
                        label="이틀에 한 번 정도"
                        selected={showerFreq === '2days'}
                        onClick={() => setShowerFreq('2days')}
                    />
                    <CircleOption
                        label="며칠에 한 번 하는 편"
                        selected={showerFreq === 'rare'}
                        onClick={() => setShowerFreq('rare')}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">8. 방 청소는 얼마나 자주 하시나요?</span>
                </div>
                <div className="flex flex-col">
                    <CircleOption
                        label="하루에 한 번 정도"
                        selected={cleaningFreq === '1'}
                        onClick={() => setCleaningFreq('1')}
                    />
                    <CircleOption
                        label="하루에 두 번 이상"
                        selected={cleaningFreq === '2+'}
                        onClick={() => setCleaningFreq('2+')}
                    />
                    <CircleOption
                        label="이틀에 한 번 정도"
                        selected={cleaningFreq === '2days'}
                        onClick={() => setCleaningFreq('2days')}
                    />
                    <CircleOption
                        label="며칠에 한 번 하는 편"
                        selected={cleaningFreq === 'rare'}
                        onClick={() => setCleaningFreq('rare')}
                    />
                </div>
            </div>
        </div>
    );
}

type StepLifestyleProps = {
    activityLevel: string;
    setActivityLevel: (v: string) => void;
    roomTraits: string[];
    setRoomTraits: (v: string[]) => void;
    temperaturePref: { cold: string; hot: string };
    setTemperaturePref: (v: { cold: string; hot: string }) => void;
    outgoingFreq: string;
    setOutgoingFreq: (v: string) => void;
    mealPlace: string;
    setMealPlace: (v: string) => void;
    mealNote: string;
    setMealNote: (v: string) => void;
};

function StepLifestyle({
    activityLevel,
    setActivityLevel,
    roomTraits,
    setRoomTraits,
    temperaturePref,
    setTemperaturePref,
    outgoingFreq,
    setOutgoingFreq,
    mealPlace,
    setMealPlace,
    mealNote,
    setMealNote,
}: StepLifestyleProps) {
    const toggleSleepHabit = (value: string) => {
        let next = [...roomTraits];

        if (value === 'none') {
            next = next.includes('none') ? [] : ['none'];
        } else {
            next = next.filter((v) => v !== 'none');
            if (next.includes(value)) next = next.filter((v) => v !== value);
            else next = [...next, value];
        }

        setRoomTraits(next);
    };

    return (
        <div className="space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">9. 흡연은 어느 정도 하시나요?</span>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setActivityLevel('smoker')}
                        className={`flex-1 rounded-full border py-2.5 text-sm transition ${
                            activityLevel === 'smoker'
                                ? 'border-[#4CB7A5] bg-[#E4F5F1] text-[#20927E]'
                                : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-[#4CB7A5]/60'
                        }`}
                    >
                        흡연자
                    </button>
                    <button
                        type="button"
                        onClick={() => setActivityLevel('non-smoker')}
                        className={`flex-1 rounded-full border py-2.5 text-sm transition ${
                            activityLevel === 'non-smoker'
                                ? 'border-[#4CB7A5] bg-[#E4F5F1] text-[#20927E]'
                                : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-[#4CB7A5]/60'
                        }`}
                    >
                        비흡연자
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">10. 잠버릇이 있다면 알려주세요. (중복 선택 가능)</span>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <CircleOption
                        label="코골이"
                        selected={roomTraits.includes('snore')}
                        onClick={() => toggleSleepHabit('snore')}
                    />
                    <CircleOption
                        label="이갈이"
                        selected={roomTraits.includes('grind')}
                        onClick={() => toggleSleepHabit('grind')}
                    />
                    <CircleOption
                        label="잠꼬대"
                        selected={roomTraits.includes('talk')}
                        onClick={() => toggleSleepHabit('talk')}
                    />
                    <CircleOption
                        label="발길질"
                        selected={roomTraits.includes('kick')}
                        onClick={() => toggleSleepHabit('kick')}
                    />
                    <CircleOption
                        label="잠귀가 예민한 편"
                        selected={roomTraits.includes('sensitive-ear')}
                        onClick={() => toggleSleepHabit('sensitive-ear')}
                    />
                    <CircleOption
                        label="밝으면 잘 못잠 (불빛, 조명)"
                        selected={roomTraits.includes('light-sensitive')}
                        onClick={() => toggleSleepHabit('light-sensitive')}
                    />
                    <CircleOption
                        label="뒤척임이 많은 편"
                        selected={roomTraits.includes('toss')}
                        onClick={() => toggleSleepHabit('toss')}
                    />
                    <CircleOption
                        label="잠버릇 없음"
                        selected={roomTraits.includes('none')}
                        onClick={() => toggleSleepHabit('none')}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">11. 추위와 더위 중 어떤 환경을 더 힘들어하시나요?</span>
                </div>
                <div className="space-y-3">
                    <ToggleYesNo
                        label="추위를 타요"
                        value={temperaturePref.cold}
                        onChange={(v) => setTemperaturePref({ ...temperaturePref, cold: v })}
                    />
                    <ToggleYesNo
                        label="더위를 타요"
                        value={temperaturePref.hot}
                        onChange={(v) => setTemperaturePref({ ...temperaturePref, hot: v })}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">12. 본가는 얼마나 자주 가시나요?</span>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <CircleOption
                        label="매주 가요"
                        selected={outgoingFreq === 'every-week'}
                        onClick={() => setOutgoingFreq('every-week')}
                    />
                    <CircleOption
                        label="2주에 한 번 가요"
                        selected={outgoingFreq === 'two-weeks'}
                        onClick={() => setOutgoingFreq('two-weeks')}
                    />
                    <CircleOption
                        label="주말마다 가요"
                        selected={outgoingFreq === 'weekends'}
                        onClick={() => setOutgoingFreq('weekends')}
                    />
                    <CircleOption
                        label="방학 때만 가요"
                        selected={outgoingFreq === 'vacation'}
                        onClick={() => setOutgoingFreq('vacation')}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">13. 식사는 보통 어떻게 해결하시나요?</span>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <select
                            value={mealPlace}
                            onChange={(e) => setMealPlace(e.target.value)}
                            className="h-10 w-32 rounded-full border border-gray-200 bg-white px-3 text-xs outline-none focus:border-[#4CB7A5]"
                        >
                            <option value="">장소 선택</option>
                            <option value="dorm">기숙사 안에서 먹어요</option>
                            <option value="school">기숙사 밖에서 먹어요</option>
                        </select>

                        <div className="flex-1">
                            <input
                                type="text"
                                value={mealNote}
                                onChange={(e) => setMealNote(e.target.value.slice(0, 15))}
                                placeholder="직접 입력: 예) 배달, 반찬 등"
                                className="h-10 w-full rounded-full border border-gray-200 bg-white px-4 text-xs outline-none focus:border-[#4CB7A5]"
                            />
                            <div className="mt-1 text-right text-[10px] text-gray-400">{mealNote.length}/15</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

type StepHobbyProps = {
    gamingTime: string;
    setGamingTime: (v: string) => void;
    drinkFreq: string;
    setDrinkFreq: (v: string) => void;
    homeStyle: string[];
    setHomeStyle: (v: string[]) => void;
    hobbies: string[];
    setHobbies: (v: string[]) => void;
};

function StepHobby({
    gamingTime,
    setGamingTime,
    drinkFreq,
    setDrinkFreq,
    homeStyle,
    setHomeStyle,
    hobbies,
    setHobbies,
}: StepHobbyProps) {
    const toggleHomeStyle = (value: string) => {
        const selected = homeStyle.includes(value);
        const next = selected ? homeStyle.filter((v) => v !== value) : [...homeStyle, value];
        setHomeStyle(next);
    };

    return (
        <div className="space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">14. 게임은 얼마나 자주 하시나요?</span>
                </div>
                <div className="flex flex-col">
                    <CircleOption
                        label="하지 않음"
                        selected={gamingTime === 'none'}
                        onClick={() => setGamingTime('none')}
                    />
                    <CircleOption
                        label="하루에 1시간 미만"
                        selected={gamingTime === '1-'}
                        onClick={() => setGamingTime('1-')}
                    />
                    <CircleOption
                        label="하루에 1~3시간 정도"
                        selected={gamingTime === '1-3'}
                        onClick={() => setGamingTime('1-3')}
                    />
                    <CircleOption
                        label="하루에 3시간 이상"
                        selected={gamingTime === '3+'}
                        onClick={() => setGamingTime('3+')}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">15. 음주는 어느 정도 하시나요?</span>
                </div>
                <div className="flex flex-col">
                    <CircleOption
                        label="안 마심"
                        selected={drinkFreq === 'none'}
                        onClick={() => setDrinkFreq('none')}
                    />
                    <CircleOption
                        label="가끔 (월 1~2회)"
                        selected={drinkFreq === 'rare'}
                        onClick={() => setDrinkFreq('rare')}
                    />
                    <CircleOption label="주 1~2회" selected={drinkFreq === '1-2'} onClick={() => setDrinkFreq('1-2')} />
                    <CircleOption
                        label="주 3회 이상"
                        selected={drinkFreq === '3+'}
                        onClick={() => setDrinkFreq('3+')}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">16. 술 마시면 어떤 스타일인가요? (중복 선택 가능)</span>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <CircleOption
                        label="말이 많아짐"
                        selected={homeStyle.includes('talkative')}
                        onClick={() => toggleHomeStyle('talkative')}
                    />
                    <CircleOption
                        label="구토"
                        selected={homeStyle.includes('vomit')}
                        onClick={() => toggleHomeStyle('vomit')}
                    />
                    <CircleOption
                        label="쉽게 잠듦"
                        selected={homeStyle.includes('sleepy')}
                        onClick={() => toggleHomeStyle('sleepy')}
                    />
                    <CircleOption
                        label="헛소리"
                        selected={homeStyle.includes('nonsense')}
                        onClick={() => toggleHomeStyle('nonsense')}
                    />
                    <CircleOption
                        label="감정적이 됨 (ex. 울음)"
                        selected={homeStyle.includes('emotional')}
                        onClick={() => toggleHomeStyle('emotional')}
                    />
                    <CircleOption
                        label="바닥에 드러눕음"
                        selected={homeStyle.includes('laydown')}
                        onClick={() => toggleHomeStyle('laydown')}
                    />
                    <CircleOption
                        label="목소리가 커짐"
                        selected={homeStyle.includes('loud')}
                        onClick={() => toggleHomeStyle('loud')}
                    />
                    <CircleOption
                        label="크게 달라지지 않음"
                        selected={homeStyle.includes('nochange')}
                        onClick={() => toggleHomeStyle('nochange')}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <span className="text-sm font-semibold">17. 어떤 취미가 있으신가요? (5개까지 선택 가능)</span>
                <div className="grid grid-cols-2 gap-2">
                    <CheckboxGroup
                        values={hobbies}
                        onChange={setHobbies}
                        maxSelected={5}
                        options={[
                            { label: 'OTT 시청', value: 'ott' },
                            { label: '카페/맛집 탐방', value: 'cafe' },
                            { label: '게임하기', value: 'game' },
                            { label: '여행', value: 'travel' },
                            { label: '독서', value: 'reading' },
                            { label: '음악 감상', value: 'music' },
                            { label: '운동/헬스', value: 'workout' },
                            { label: '수다 떨기', value: 'chat' },
                            { label: '요리하기', value: 'cook' },
                            { label: '사진 찍기', value: 'photo' },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

type StepRoommateWishProps = {
    roommateWish: string;
    setRoommateWish: (v: string) => void;
};

function StepRoommateWish({ roommateWish, setRoommateWish }: StepRoommateWishProps) {
    return (
        <div className="space-y-4">
            <span className="text-sm font-semibold">18. 룸메이트에게 바라는 점이 있나요?</span>
            <TextAreaWithPreview value={roommateWish} onChange={setRoommateWish} maxLength={150} />
        </div>
    );
}
