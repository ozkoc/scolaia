import type { BlogPost } from '../types/content'
import { TagList } from './TagList'

interface BlogCardProps {
  post: BlogPost
}

export const BlogCard = ({ post }: BlogCardProps) => (
  <article className="card blog-card">
    <div className="card__body">
      <h3>{post.title}</h3>
      <p>{post.summary}</p>
      <TagList tags={post.tags} />
    </div>
    <a className="link-button" href={post.url} target="_blank" rel="noreferrer">
      Read discussion
    </a>
  </article>
)
