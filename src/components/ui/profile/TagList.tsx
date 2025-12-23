// 프로필 자유 태그 UI

interface TagListProps {
  tags?: string[];
  max?: number; // 최대 태그 5개
  className?: string;
}

export default function TagList({
  tags = [],
  max = 5,
  className = "",
}: TagListProps) {
  const visibleTags = tags.slice(0, max);

  if (visibleTags.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {visibleTags.map((tag) => (
        <li
          key={tag}
          className="px-3 py-1 rounded-full text-12 bg-gray-100 text-gray-700"
        >
          # {tag}
        </li>
      ))}
    </ul>
  );
}
