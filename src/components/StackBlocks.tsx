import type { CSSProperties } from 'react'

type Technology = { id: string; name: string; kind: string }

const aurexStack: Technology[] = [
  { id: 'react', name: 'React', kind: 'FRONT END' },
  { id: 'mongodb', name: 'MongoDB', kind: 'DATABASE' },
  { id: 'android', name: 'Android Studio', kind: 'MOBILE' },
  { id: 'mysql', name: 'MySQL', kind: 'DATABASE' },
  { id: 'html', name: 'HTML5', kind: 'WEB' },
  { id: 'css', name: 'CSS3', kind: 'WEB' },
  { id: 'java', name: 'Java', kind: 'LANGUAGE' },
  { id: 'python', name: 'Python', kind: 'LANGUAGE' },
]

const techStack: Technology[] = [
  { id: 'node', name: 'Node.js', kind: 'BACK END' },
  { id: 'typescript', name: 'TypeScript', kind: 'LANGUAGE' },
  { id: 'postgres', name: 'PostgreSQL', kind: 'DATABASE' },
  { id: 'git', name: 'Git', kind: 'VERSION CONTROL' },
]

function TechLogo({ id }: { id: string }) {
  if (id === 'react') return <svg viewBox="0 0 32 32" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="16" cy="16" rx="14" ry="5.4"/><ellipse cx="16" cy="16" rx="14" ry="5.4" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="14" ry="5.4" transform="rotate(120 16 16)"/></g><circle cx="16" cy="16" r="2.4" fill="currentColor"/></svg>
  if (id === 'mongodb') return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 2c-1.8 3.6-7.1 8.1-7.1 15.2 0 5.6 3 9.6 6.1 11.6l1 1.2 1-1.2c3.1-2 6.1-6 6.1-11.6C23.1 10.1 17.8 5.6 16 2Z"/><path d="M16 8v19" fill="none" stroke="#09090a" strokeOpacity=".7" strokeWidth="1.2"/></svg>
  if (id === 'android') return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M8.1 11.2a8 8 0 0 1 15.8 0H8.1ZM6.5 13h19v9.5a2 2 0 0 1-2 2h-1v3.2a1.5 1.5 0 0 1-3 0v-3.2h-6v3.2a1.5 1.5 0 0 1-3 0v-3.2h-2a2 2 0 0 1-2-2V13Zm.2-1.9L4.2 7.4a.8.8 0 1 1 1.4-.8l2.6 4.1h-1.5Zm17 0 2.6-4.1a.8.8 0 1 1 1.4.8l-2.5 3.7h-1.5Z"/><circle cx="12.5" cy="8.5" r=".9" fill="#09090a"/><circle cx="19.5" cy="8.5" r=".9" fill="#09090a"/></svg>
  if (id === 'mysql') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 21c5-1 6-7 12-8 4-.7 6 1.3 8 3.3 1.4 1.4 2.7 1.9 4 1.7-1.8 2.9-4.3 4.5-7.1 3.7-2.1-.6-3.3-2.8-5.4-2.8-2.5 0-4.2 2.5-7.4 2.7-1.4.1-2.7-.2-4.1-.6Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M19 13c1.8-2 3.7-2.7 5.8-2.4M23.5 18l3 .2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
  if (id === 'html' || id === 'css') return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M5 3h22l-2 23-9 3-9-3L5 3Z"/><path fill="#09090a" d="M16 6v20l7-2.3L24.5 6H16Z"/><text x="16" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" fontFamily="Arial">{id === 'html' ? '5' : '3'}</text></svg>
  if (id === 'java') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 7c3-2 4-3.4 2.5-5M18 9c3-2.5 3.5-4 1.2-6M9 14h15l-1.5 9H10.5L9 14Zm-2 11c5 2 12 2 17 0M12 27h11" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
  if (id === 'python') return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M15.6 3C10 3 9 5 9 8v4h8v2H6.8A3.8 3.8 0 0 0 3 17.8v3.4A3.8 3.8 0 0 0 6.8 25H10v-4c0-3 2-5 5-5h6c2 0 3-1.4 3-3V8c0-3-2.1-5-8.4-5ZM12 7a1.4 1.4 0 1 1 0 2.8A1.4 1.4 0 0 1 12 7Z"/><path fill="#f0c35e" d="M16.4 29C22 29 23 27 23 24v-4h-8v-2h10.2a3.8 3.8 0 0 0 3.8-3.8v-3.4A3.8 3.8 0 0 0 25.2 7H22v4c0 3-2 5-5 5h-6c-2 0-3 1.4-3 3v5c0 3 2.1 5 8.4 5ZM20 25a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Z"/></svg>
  if (id === 'api' || id === 'http') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 8 4 16l7 8M21 8l7 8-7 8M18 5l-4 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  if (id === 'node') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m16 3 11 6.4v13.2L16 29 5 22.6V9.4L16 3Z" fill="none" stroke="currentColor" strokeWidth="1.5"/><text x="16" y="19.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor" fontFamily="Arial">JS</text></svg>
  if (id === 'typescript') return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M4 4h24v24H4z"/><text x="16" y="21" textAnchor="middle" fontSize="11" fontWeight="700" fill="#09090a" fontFamily="Arial">TS</text></svg>
  if (id === 'next') return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M10 22V10l12 13V10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
  if (id === 'postgres') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 25c-2-3-2-8-1-12 1-5 5-8 11-8s9 3 9 8c0 4-2 7-5 8l1 5-5-3-5 3v-5l-5 1Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="20" cy="12" r="1" fill="currentColor"/></svg>
  if (id === 'figma') return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#f26b5b" d="M10 3h6v8h-6a4 4 0 1 1 0-8Z"/><path fill="#ff9a64" d="M16 3h6a4 4 0 1 1 0 8h-6V3Z"/><path fill="#a879ff" d="M10 11h6v8h-6a4 4 0 1 1 0-8Z"/><circle cx="20" cy="15" r="4" fill="#36c5f0"/><path fill="#18a881" d="M10 19h6v6a4 4 0 1 1-6-3.5V19Z"/></svg>
  if (id === 'javascript' || id === 'typescript') return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M4 4h24v24H4z"/><text x="16" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="#09090a" fontFamily="Arial">{id === 'javascript' ? 'JS' : 'TS'}</text></svg>
  if (id === 'kotlin') return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M5 4h22L15 16l12 12H5V4Zm0 22 11-10 6 6-5 6H5Z"/></svg>
  if (id === 'flutter') return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="m18 3 10 0-16 16-5-5L18 3ZM18 17l10 10H18l-5-5 5-5ZM10 19l5 5-5 5-5-5 5-5Z"/></svg>
  if (id === 'firebase') return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M7 25 10 5l5 9 5-10 5 21-9 5-9-5Zm8-11 5-10-2 16-3-6Z"/></svg>
  if (id === 'aws') return <svg viewBox="0 0 32 32" aria-hidden="true"><text x="16" y="19" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor" fontFamily="Arial">aws</text><path d="M7 23c6 4 13 4 19 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  if (id === 'docker') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 16h24c0 7-4 11-11 11S6 24 4 16Zm4-6h4v4H8zm5 0h4v4h-4zm5 0h4v4h-4zm-5-5h4v4h-4z" fill="currentColor"/><path d="M25 13c2-2 4-1 5 0-1 2-3 3-6 2" fill="currentColor"/></svg>
  if (id === 'express') return <svg viewBox="0 0 32 32" aria-hidden="true"><text x="16" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor" fontFamily="Arial">ex</text></svg>
  if (id === 'tailwind') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 13c2-5 6-7 11-5 2 1 3 3 4 5-2-2-4-2-6-1-2 1-3 3-5 4-2 1-4 0-6-3Zm0 8c2-5 6-7 11-5 2 1 3 3 4 5-2-2-4-2-6-1-2 1-3 3-5 4-2 1-4 0-6-3Z" fill="currentColor"/></svg>
  if (id === 'redis') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m4 11 12-6 12 6-12 6-12-6Zm0 6 12 6 12-6M4 23l12 6 12-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
  if (id === 'graphql') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m16 4 11 6v12l-11 6-11-6V10l11-6Zm0 0v24m11-18L5 22m0-12 22 12M5 10h22M5 22h22" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>
  if (id === 'github') return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-4.1 25.3c.7.1.9-.3.9-.7v-2.5c-3.7.8-4.5-1.6-4.5-1.6-.6-1.5-1.5-1.9-1.5-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.4 2 1.4 1.2 2 3.1 1.4 3.9 1.1.1-.9.5-1.4.9-1.8-3-.3-6.1-1.5-6.1-6.6 0-1.5.5-2.7 1.4-3.7-.1-.3-.6-1.7.1-3.6 0 0 1.1-.4 3.7 1.4a12.8 12.8 0 0 1 6.7 0c2.6-1.8 3.7-1.4 3.7-1.4.7 1.9.2 3.3.1 3.6.9 1 1.4 2.2 1.4 3.7 0 5.1-3.1 6.3-6.1 6.6.5.4.9 1.2.9 2.4v3.7c0 .4.2.8.9.7A13 13 0 0 0 16 3Z"/></svg>
  if (id === 'rest') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 9h17m0 0-5-5m5 5-5 5M26 23H9m0 0 5-5m-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m12 7-9 9 9 9M20 7l9 9-9 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function StackCard({ item }: { item: Technology }) {
  return <div className={`stack-card stack-${item.id}`}>
    <span className="stack-logo"><TechLogo id={item.id} /></span>
    <span className="stack-copy"><b>{item.name}</b><small>{item.kind}</small></span>
  </div>
}

export default function StackBlocks() {
  return <div className="aurex-morph stack-assembly" role="img" aria-label="Technology stack cards assemble into the Aurex Technovation logo">
    <div className="stack-group stack-group-aurex">{[...aurexStack, ...techStack].map((item, index) => <div className="stack-orbit" key={item.id} style={{ '--orbit-angle': `${index * 30}deg` } as CSSProperties}><StackCard item={item} /></div>)}</div>
    <div className="stack-lockup"><div className="stack-aurex"><span className="stack-mark">A</span><b>AUREX</b></div><small className="stack-technovation">TECHNOVATION</small></div>
  </div>
}
