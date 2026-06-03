import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { Founder } from '../data/founders';
import { FounderCompetencyTags } from './FounderCompetencyTags';

interface FounderAvatarProps {
  founder: Founder;
}

function FounderAvatar({ founder }: FounderAvatarProps) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const imageUrl = founder.imageCandidates[candidateIndex];

  if (!imageUrl) {
    return (
      <div className="founder-initials" aria-hidden="true">
        {founder.initials}
      </div>
    );
  }

  return (
    <img
      className="founder-photo"
      src={imageUrl}
      alt={founder.name}
      onError={() => setCandidateIndex((index) => index + 1)}
    />
  );
}

interface FounderCardProps {
  founder: Founder;
  variant: 'preview' | 'profile';
}

export function FounderCard({ founder, variant }: FounderCardProps) {
  if (variant === 'preview') {
    return (
      <a className={`founder-card founder-card-preview founder-card-${founder.id}`} href={`/team#${founder.id}`}>
        <div className="founder-card-top">
          <FounderAvatar founder={founder} />
          <div>
            <h3>{founder.name}</h3>
            <p>{founder.role}</p>
          </div>
        </div>
        <p className="founder-short">{founder.shortDescription}</p>
        <FounderCompetencyTags tags={founder.tags.slice(0, 4)} />
        <span className="founder-card-link">
          Открыть профиль <ArrowRight size={16} aria-hidden="true" />
        </span>
      </a>
    );
  }

  return (
    <article className="founder-profile-card" id={founder.id}>
      <div className="founder-profile-aside">
        <FounderAvatar founder={founder} />
        <blockquote>{founder.quote}</blockquote>
      </div>
      <div className="founder-profile-body">
        <div className="section-kicker">основатель</div>
        <h2>{founder.name}</h2>
        <p className="founder-role">{founder.role}</p>
        <div className="founder-description">
          {founder.fullDescription.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <FounderCompetencyTags tags={founder.tags} />
        <div className="founder-project-role">
          <h3>Роль в проекте</h3>
          <p>{founder.projectRole}</p>
        </div>
        {founder.links?.length ? (
          <div className="founder-links">
            {founder.links.map((link) => (
              <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                {link.label} <ExternalLink size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

