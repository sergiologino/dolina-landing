interface FounderCompetencyTagsProps {
  tags: string[];
}

export function FounderCompetencyTags({ tags }: FounderCompetencyTagsProps) {
  return (
    <ul className="founder-tags" aria-label="Компетенции">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

