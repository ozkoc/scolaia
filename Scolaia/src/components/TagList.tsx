interface TagListProps {
  tags: string[]
}

export const TagList = ({ tags }: TagListProps) => (
  <ul className="tag-list">
    {tags.map((tag) => (
      <li key={tag}>{tag}</li>
    ))}
  </ul>
)
