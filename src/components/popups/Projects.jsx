import { projects } from '../../data/projects'

export default function Projects() {
  return (
    <div className="card-grid">
      {projects.map((project) => (
        <article key={project.id} className="card">
          <h3 className="card__title">{project.title}</h3>
          <p className="card__desc">{project.description}</p>
          <ul className="tag-list">
            {project.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
          {(project.demo || project.repo) && (
            <div className="card__links">
              {project.demo && (
                <a className="btn-link" href={project.demo} target="_blank" rel="noopener noreferrer">
                  Demo
                </a>
              )}
              {project.repo && (
                <a className="btn-link" href={project.repo} target="_blank" rel="noopener noreferrer">
                  Repo
                </a>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  )
}