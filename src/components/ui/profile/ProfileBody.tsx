import TimeRow from "./TimeRow";
import TagList from "./TagList";

interface ProfileBodyProps {
  major: string;
  age: number;
  wakeTime: string;
  sleepTime: string;
  tags?: string[];
}

export default function ProfileBody({
  major,
  age,
  wakeTime,
  sleepTime,
  tags,
}: ProfileBodyProps) {

  return (
    <div className="flex flex-col gap-4">
      {/* 전공 + 나이 */}
      <p className="font-medium text-16 text-gray-900">
        {major} {age} 살
      </p>

      {/* 기상, 취침 시간 */}
      <div className="flex flex-col gap-2">
        <TimeRow icon="/sun.svg" label="기상 시간" value={wakeTime} />
        <TimeRow icon="/moon.svg" label="취침 시간" value={sleepTime} />
      </div>

      {/* 태그 */}
      <TagList tags={tags} />
    </div>
  );
}
