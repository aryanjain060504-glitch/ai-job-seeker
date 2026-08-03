/**
 * InFit™ AI Job Matcher, Resume Auto-Parser & Application Tracker
 * Fully interactive 4-mode application: Discover, Table Tracker, Kanban Board, Compare.
 */

// Known Master Skill Registry for AI Resume Extraction
const MASTER_SKILL_REGISTRY = [
  "Product Strategy", "SQL", "A/B Testing", "Roadmapping", "User Research", 
  "Figma", "Agile", "Stakeholder Management", "APIs", "Analytics", "Compliance", 
  "Python", "Data Analytics", "Supply Chain", "Scrum", "Jira", "Growth", 
  "Prototyping", "Customer Discovery", "System Design", "Market Research"
];

// Sample Resumes for 1-Click Auto-Parsing Demo
const DEMO_RESUMES = {
  pm: `ALEX MORGAN
Product Manager | Growth & Analytics
3.5 years of experience in product strategy, SQL data analysis, and user research.

KEY SKILLS:
- Product Strategy, SQL, A/B Testing, Roadmapping, User Research, Figma, Agile, Stakeholder Management

PROJECT HIGHLIGHTS:
- Led 0-to-1 onboarding redesign increasing activation by 28%
- Built pricing experiment framework using A/B testing and SQL dashboards
- Launched referral program resulting in 50k new users`,

  lead: `SAMANTHA VANCE
Senior Technical Product Lead
6.5 years of experience building high-scale platform APIs and payment compliance infrastructure.

CORE COMPETENCIES:
- Product Strategy, Roadmapping, Stakeholder Management, APIs, Analytics, SQL, Compliance, Python

KEY PROJECTS:
- Architected global multi-currency payment platform with strict financial compliance
- Managed cross-functional stakeholder alignment across 4 international business units
- Defined platform APIs serving over 50M API requests per day`,

  apm: `JORDAN LEE
Associate Product Manager Candidate
1.0 years of experience conducting user research and prototyping in Figma.

SKILLS:
- Figma, Agile, User Research, Prototyping, Customer Discovery

PROJECTS:
- Designed interactive Figma prototypes for mobile checkout user testing
- Facilitated 15+ user research interviews and usability synthesis sessions`
};

// ---------------------------------------------------------------------------
// Sample Job Catalog
// ---------------------------------------------------------------------------
const DEFAULT_JOBS = [
  {
    id: "job-1",
    title: "Senior Product Manager",
    company: "Nova Health",
    location: "San Francisco, CA (Hybrid)",
    posted: "2 days ago",
    easy_apply: true,
    required_skills: ["Product Strategy", "User Research", "Roadmapping", "Stakeholder Management"],
    min_experience: 3,
    description: "Lead 0-to-1 product development for core healthcare patient engagement systems and scale cross-functional teams."
  },
  {
    id: "job-2",
    title: "Product Manager, Growth",
    company: "Brightline",
    location: "New York, NY (Remote)",
    posted: "1 day ago",
    easy_apply: true,
    required_skills: ["SQL", "A/B Testing", "Product Strategy", "Analytics"],
    min_experience: 2,
    description: "Drive key conversion, onboarding funnel optimization, and experimental growth loops using rigorous data analytics."
  },
  {
    id: "job-3",
    title: "Associate Product Manager (APM)",
    company: "Kestrel Labs",
    location: "San Jose, CA (On-site)",
    posted: "Just now",
    easy_apply: true,
    required_skills: ["Agile", "Figma", "User Research"],
    min_experience: 0,
    description: "Collaborate closely with engineering and product designers to execute user stories and conduct usability testing."
  },
  {
    id: "job-4",
    title: "Product Manager, Payments",
    company: "Fintra",
    location: "Chicago, IL (Hybrid)",
    posted: "3 days ago",
    easy_apply: false,
    required_skills: ["SQL", "Stakeholder Management", "Compliance", "Roadmapping"],
    min_experience: 4,
    description: "Oversee payment gateway integrations, compliance auditing, and multi-currency payout roadmaps."
  },
  {
    id: "job-5",
    title: "Product Manager",
    company: "Loop Robotics",
    location: "Austin, TX (Hybrid)",
    posted: "4 days ago",
    easy_apply: true,
    required_skills: ["Product Strategy", "Roadmapping", "Supply Chain", "Agile"],
    min_experience: 3,
    description: "Coordinate hardware-software delivery milestones, supplier integration workflows, and product roadmaps."
  },
  {
    id: "job-6",
    title: "Product Manager II",
    company: "Verano Interactive",
    location: "Seattle, WA (Remote)",
    posted: "1 day ago",
    easy_apply: true,
    required_skills: ["A/B Testing", "SQL", "User Research", "Product Strategy"],
    min_experience: 3,
    description: "Scale marketplace operations, partner experience features, and data-driven product enhancements."
  },
  {
    id: "job-7",
    title: "PM, Developer Platform",
    company: "Dockside Infrastructure",
    location: "San Francisco, CA (Hybrid)",
    posted: "5 days ago",
    easy_apply: false,
    required_skills: ["APIs", "Stakeholder Management", "Agile", "SQL"],
    min_experience: 5,
    description: "Define developer experience APIs, internal platform architecture, and developer tools for enterprise clients."
  },
  {
    id: "job-8",
    title: "Junior Product Manager",
    company: "Millwork Systems",
    location: "Boston, MA (Remote)",
    posted: "2 days ago",
    easy_apply: true,
    required_skills: ["Figma", "Agile", "User Research"],
    min_experience: 1,
    description: "Support sprint planning, prototype review sessions, and user feedback synthesis for consumer web applications."
  }
];

// Presets for Candidate Personas
const CANDIDATE_PRESETS = {
  default: {
    name: "Alex Morgan",
    headline: "Associate Product Manager Candidate | Product Strategy & Analytics",
    skills: ["Product Strategy", "SQL", "A/B Testing", "Roadmapping", "User Research", "Figma", "Agile", "Stakeholder Management"],
    years_experience: 3,
    projects: [
      "Led 0-to-1 onboarding redesign",
      "Built pricing experiment framework using A/B testing",
      "Launched referral program"
    ]
  },
  senior: {
    name: "Samantha Vance",
    headline: "Senior Product Lead @ TechCorp | 6+ Yrs Exp",
    skills: ["Product Strategy", "Roadmapping", "Stakeholder Management", "APIs", "Analytics", "SQL", "Compliance"],
    years_experience: 6,
    projects: [
      "Architected global multi-currency payment platform with strict compliance",
      "Managed stakeholder alignment across 4 international business units",
      "Defined platform APIs serving 50M requests/day"
    ]
  },
  junior: {
    name: "Jordan Lee",
    headline: "APM Rotational Candidate | Figma & User Research",
    skills: ["Figma", "Agile", "User Research", "Prototyping"],
    years_experience: 1,
    projects: [
      "Designed interactive Figma prototypes for mobile checkout",
      "Facilitated 15+ user research interviews and usability sessions"
    ]
  },
  technical: {
    name: "David Kim",
    headline: "Technical PM | Data Pipelines & REST APIs",
    skills: ["SQL", "APIs", "Agile", "Python", "Data Analytics", "Roadmapping"],
    years_experience: 4,
    projects: [
      "Built SQL analytics dashboard and data warehouse pipeline",
      "Integrated 3rd party REST APIs for automated data sync"
    ]
  }
};

// Initial Tracked Applications
const INITIAL_TRACKED = [
  {
    id: "track-1",
    jobId: "job-1",
    title: "Senior Product Manager",
    company: "Nova Health",
    status: "Interview",
    fitScore: 88,
    priority: 3,
    notes: "Panel round Thu 3pm, prep STAR stories"
  },
  {
    id: "track-2",
    jobId: "job-2",
    title: "Product Manager, Growth",
    company: "Brightline",
    status: "Applied",
    fitScore: 74,
    priority: 2,
    notes: "Applied via referral from Sam"
  },
  {
    id: "track-3",
    jobId: "job-4",
    title: "APM",
    company: "Fintra",
    status: "Applied",
    fitScore: 63,
    priority: 2,
    notes: "—"
  },
  {
    id: "track-4",
    jobId: "job-5",
    title: "Product Manager",
    company: "Loop Robotics",
    status: "Saved",
    fitScore: 81,
    priority: 3,
    notes: "JD matches my supply-chain background"
  },
  {
    id: "track-5",
    jobId: "job-3",
    title: "Associate PM",
    company: "Kestrel",
    status: "Saved",
    fitScore: 55,
    priority: 1,
    notes: "—"
  },
  {
    id: "track-6",
    jobId: "job-6",
    title: "Product Manager II",
    company: "Verano",
    status: "Offer",
    fitScore: 91,
    priority: 3,
    notes: "₹28L base, negotiating signing bonus"
  }
];

// ---------------------------------------------------------------------------
// App State
// ---------------------------------------------------------------------------
let state = {
  candidate: JSON.parse(JSON.stringify(CANDIDATE_PRESETS.default)),
  jobs: [...DEFAULT_JOBS],
  tracked: [...INITIAL_TRACKED],
  weights: {
    skill: 0.75,
    experience: 0.25,
    bonus: 0.05
  },
  threshold: 65,
  activeView: "discover",
  activeFilterPill: "all",
  searchQuery: ""
};

// ---------------------------------------------------------------------------
// AI Resume Auto-Parser Logic
// ---------------------------------------------------------------------------
function parseResumeText(rawText) {
  if (!rawText || !rawText.trim()) return;

  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

  // 1. Extract Name (First line if short)
  let extractedName = state.candidate.name;
  if (lines.length > 0 && lines[0].length < 35 && !lines[0].toLowerCase().includes("resume")) {
    extractedName = lines[0].replace(/[^a-zA-Z\s]/g, '').trim();
  }

  // 2. Extract Years of Experience
  let extractedExp = state.candidate.years_experience;
  const expRegex = /(\d+(?:\.\d+)?)\s*(?:\+|\-)?\s*(?:years?|yrs?)/i;
  const expMatch = rawText.match(expRegex);
  if (expMatch) {
    extractedExp = parseFloat(expMatch[1]);
  }

  // 3. Extract Skills from Master Registry
  const extractedSkills = [];
  const textLower = rawText.toLowerCase();

  MASTER_SKILL_REGISTRY.forEach(skill => {
    if (textLower.includes(skill.toLowerCase())) {
      extractedSkills.push(skill);
    }
  });

  // 4. Extract Project Bullets (Lines starting with action verbs)
  const extractedProjects = [];
  const actionVerbs = ["led", "built", "launched", "managed", "designed", "architected", "created", "developed", "scaled"];

  lines.forEach(line => {
    const lineLower = line.toLowerCase();
    const isBullet = line.startsWith('-') || line.startsWith('•') || line.startsWith('*');
    const startsWithVerb = actionVerbs.some(v => lineLower.includes(v));

    if ((isBullet || startsWithVerb) && line.length > 15 && line.length < 140) {
      const cleanLine = line.replace(/^[\-\•\*\d\.]+\s*/, '').trim();
      if (!extractedProjects.includes(cleanLine) && extractedProjects.length < 5) {
        extractedProjects.push(cleanLine);
      }
    }
  });

  // Update candidate state
  state.candidate.name = extractedName || "Parsed Candidate";
  state.candidate.years_experience = extractedExp;
  if (extractedSkills.length > 0) {
    state.candidate.skills = extractedSkills;
  }
  if (extractedProjects.length > 0) {
    state.candidate.projects = extractedProjects;
  }

  renderCandidateProfile();
  renderAllViews();

  showToast(`✨ Resume Parsed! Extracted ${extractedSkills.length} skills & ${extractedExp} yrs exp.`);
}

// ---------------------------------------------------------------------------
// Fit Calculation Engine (Matches Python Implementation)
// ---------------------------------------------------------------------------
function calculateMatch(resume, job, weights) {
  const resumeSkillsLower = new Set(resume.skills.map(s => s.trim().toLowerCase()));
  const requiredLower = job.required_skills.map(s => s.trim().toLowerCase());
  
  const originalByLower = {};
  job.required_skills.forEach(s => {
    originalByLower[s.trim().toLowerCase()] = s.trim();
  });

  const matchedSet = new Set();
  const missingSet = new Set();

  requiredLower.forEach(req => {
    if (resumeSkillsLower.has(req)) {
      matchedSet.add(req);
    } else {
      missingSet.add(req);
    }
  });

  const skillScore = requiredLower.length > 0 ? matchedSet.size / requiredLower.length : 0;

  let expScore = 0;
  if (resume.years_experience >= job.min_experience) {
    expScore = 1.0;
  } else {
    const gap = job.min_experience - resume.years_experience;
    expScore = Math.max(0.0, 1.0 - gap * 0.2); // -20% per year short
  }

  const projectsTextCombined = resume.projects.join(" ").toLowerCase();
  const projectBonusHit = requiredLower.some(req => projectsTextCombined.includes(req));
  const bonusScore = projectBonusHit ? weights.bonus : 0.0;

  const rawScore = (skillScore * weights.skill) + (expScore * weights.experience) + bonusScore;
  const scorePct = Math.min(100, Math.round(rawScore * 100));

  const matchedSkills = Array.from(matchedSet).map(s => originalByLower[s]).sort();
  const missingSkills = Array.from(missingSet).map(s => originalByLower[s]).sort();

  return {
    job,
    scorePct,
    skillScorePct: Math.round(skillScore * 100),
    expScorePct: Math.round(expScore * 100),
    projectBonusHit,
    matchedSkills,
    missingSkills,
    expGap: Math.max(0, job.min_experience - resume.years_experience)
  };
}

// ---------------------------------------------------------------------------
// Render & View Controller
// ---------------------------------------------------------------------------
function initApp() {
  bindEvents();
  renderCandidateProfile();
  renderAllViews();
}

function renderAllViews() {
  renderJobsDiscover();
  renderTrackerTable();
  renderKanbanBoard();
  renderCompareMatrix();
}

function renderCandidateProfile() {
  document.getElementById('profile-name-display').textContent = state.candidate.name;
  document.getElementById('profile-headline-display').textContent = state.candidate.headline || "Product Candidate";
  document.getElementById('candidate-experience').value = state.candidate.years_experience;
  document.getElementById('exp-val-display').textContent = `${state.candidate.years_experience} Yrs`;

  // Render Skill Tags
  const skillsContainer = document.getElementById('skills-container');
  skillsContainer.innerHTML = '';
  state.candidate.skills.forEach((skill, index) => {
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.innerHTML = `
      ${escapeHtml(skill)}
      <span class="remove-tag" data-index="${index}">&times;</span>
    `;
    skillsContainer.appendChild(pill);
  });

  // Render Projects List
  const projectsContainer = document.getElementById('projects-container');
  projectsContainer.innerHTML = '';
  state.candidate.projects.forEach((proj, index) => {
    const item = document.createElement('div');
    item.className = 'project-item';
    item.innerHTML = `
      <span>📌 ${escapeHtml(proj)}</span>
      <span class="remove-project" data-index="${index}">&times;</span>
    `;
    projectsContainer.appendChild(item);
  });
}

// ---------------------------------------------------------------------------
// VIEW 1: DISCOVER FEED
// ---------------------------------------------------------------------------
function renderJobsDiscover() {
  const query = state.searchQuery.toLowerCase();
  
  const matches = state.jobs.map(job => calculateMatch(state.candidate, job, state.weights));

  let filtered = matches.filter(m => {
    if (!query) return true;
    const titleMatch = m.job.title.toLowerCase().includes(query);
    const companyMatch = m.job.company.toLowerCase().includes(query);
    const skillMatch = m.job.required_skills.some(s => s.toLowerCase().includes(query));
    return titleMatch || companyMatch || skillMatch;
  });

  if (state.activeFilterPill === "high") {
    filtered = filtered.filter(m => m.scorePct >= 85);
  } else if (state.activeFilterPill === "easy") {
    filtered = filtered.filter(m => m.job.easy_apply);
  } else if (state.activeFilterPill === "remote") {
    filtered = filtered.filter(m => m.job.location.toLowerCase().includes("remote"));
  }

  const matchedThreshold = filtered.filter(m => m.scorePct >= state.threshold);
  matchedThreshold.sort((a, b) => b.scorePct - a.scorePct);

  document.getElementById('stat-matched-count').textContent = matchedThreshold.length;
  document.getElementById('feed-count-summary').textContent = `Showing ${matchedThreshold.length} roles matching your extracted profile & ${state.threshold}% fit cutoff`;

  const feedList = document.getElementById('jobs-feed-list');
  const emptyState = document.getElementById('empty-state');
  feedList.innerHTML = '';

  if (matchedThreshold.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    matchedThreshold.forEach(match => {
      feedList.appendChild(createLinkedInJobCard(match));
    });
  }
}

function createLinkedInJobCard(match) {
  const { job, scorePct, matchedSkills, missingSkills, projectBonusHit } = match;

  const card = document.createElement('div');
  card.className = 'ln-job-item';
  card.setAttribute('data-id', job.id);

  let scoreLevel = 'high';
  if (scorePct < 65) scoreLevel = 'low';
  else if (scorePct < 85) scoreLevel = 'medium';

  const initials = job.company.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

  card.innerHTML = `
    <div class="company-logo-avatar">${initials}</div>

    <div class="ln-job-content">
      <div class="ln-job-header">
        <div>
          <h4 class="ln-job-title">${escapeHtml(job.title)}</h4>
          <div class="ln-company">${escapeHtml(job.company)}</div>
          <div class="ln-location">${escapeHtml(job.location || 'San Francisco, CA')} · ${job.posted || 'Recent'}</div>
        </div>

        <div class="infit-score-pill ${scoreLevel}">
          <span>✨ InFit™ ${scorePct}%</span>
        </div>
      </div>

      <div class="skills-match-row">
        ${matchedSkills.map(s => `<span class="skill-tag matched">✓ ${escapeHtml(s)}</span>`).join('')}
        ${missingSkills.map(s => `<span class="skill-tag missing">✕ ${escapeHtml(s)}</span>`).join('')}
        ${projectBonusHit ? '<span class="skill-tag matched" style="background:#FEF3D6; color:#B25900; border-color:#F7D070;">✨ Project Bonus</span>' : ''}
      </div>

      <div class="ln-job-actions">
        ${job.easy_apply ? `<button class="ln-btn-primary apply-btn"><span>⚡</span> Easy Apply</button>` : `<button class="ln-btn-outline apply-btn">Apply on Company Site</button>`}
        <button class="ln-btn-secondary view-details-btn">View InFit™ Analysis</button>
      </div>
    </div>
  `;

  card.querySelector('.view-details-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    openDetailModal(match);
  });

  card.querySelector('.apply-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    trackJobApplication(job, scorePct);
    showToast(`Application tracked & submitted to ${job.company}!`);
  });

  card.addEventListener('click', () => openDetailModal(match));
  return card;
}

// ---------------------------------------------------------------------------
// VIEW 2: TRACKER TABLE
// ---------------------------------------------------------------------------
function renderTrackerTable() {
  const tbody = document.getElementById('tracker-table-body');
  tbody.innerHTML = '';

  state.tracked.forEach((item, index) => {
    const tr = document.createElement('tr');

    let fitClass = 'high';
    if (item.fitScore < 65) fitClass = 'low';
    else if (item.fitScore < 85) fitClass = 'med';

    const stars = '⭐'.repeat(item.priority || 1);

    tr.innerHTML = `
      <td>
        <div class="job-cell">
          <span class="job-cell-title">${escapeHtml(item.title)}</span>
          <span class="job-cell-company">${escapeHtml(item.company)}</span>
        </div>
      </td>
      <td>
        <select class="status-select" data-index="${index}">
          <option value="Saved" ${item.status === 'Saved' ? 'selected' : ''}>Saved</option>
          <option value="Applied" ${item.status === 'Applied' ? 'selected' : ''}>Applied</option>
          <option value="Interview" ${item.status === 'Interview' ? 'selected' : ''}>Interview</option>
          <option value="Offer" ${item.status === 'Offer' ? 'selected' : ''}>Offer</option>
          <option value="Rejected" ${item.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
        </select>
      </td>
      <td>
        <span class="fit-badge-sm ${fitClass}">${item.fitScore}%</span>
      </td>
      <td>
        <span class="star-rating" data-index="${index}" title="Click to change priority">${stars}</span>
      </td>
      <td>
        <input type="text" class="notes-input" data-index="${index}" value="${escapeHtml(item.notes)}" placeholder="Add note...">
      </td>
    `;

    tbody.appendChild(tr);
  });

  document.querySelectorAll('.status-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      state.tracked[idx].status = e.target.value;
      renderKanbanBoard();
    });
  });

  document.querySelectorAll('.star-rating').forEach(star => {
    star.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      state.tracked[idx].priority = (state.tracked[idx].priority % 3) + 1;
      renderTrackerTable();
    });
  });

  document.querySelectorAll('.notes-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      state.tracked[idx].notes = e.target.value;
    });
  });
}

// ---------------------------------------------------------------------------
// VIEW 3: KANBAN BOARD
// ---------------------------------------------------------------------------
function renderKanbanBoard() {
  const statuses = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];

  statuses.forEach(status => {
    const container = document.getElementById(`kanban-${status.toLowerCase()}`);
    const items = state.tracked.filter(t => t.status === status);
    
    document.getElementById(`count-${status.toLowerCase()}`).textContent = items.length;
    container.innerHTML = '';

    if (items.length === 0) {
      container.innerHTML = `<div style="font-size:0.75rem; color:var(--ln-text-muted); text-align:center; padding:12px 0;">No items</div>`;
    } else {
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'kanban-card';
        card.innerHTML = `
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.company)}</p>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="fit-badge-sm ${item.fitScore >= 85 ? 'high' : item.fitScore >= 65 ? 'med' : 'low'}">${item.fitScore}%</span>
            <span style="font-size:0.8rem;">${'⭐'.repeat(item.priority)}</span>
          </div>
        `;
        container.appendChild(card);
      });
    }
  });
}

// ---------------------------------------------------------------------------
// VIEW 4: SIDE-BY-SIDE COMPARE MATRIX
// ---------------------------------------------------------------------------
function renderCompareMatrix() {
  const wrapper = document.getElementById('compare-table-wrapper');
  
  const matches = state.jobs.map(job => calculateMatch(state.candidate, job, state.weights));
  matches.sort((a, b) => b.scorePct - a.scorePct);

  let html = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Attribute</th>
          ${matches.map(m => `<th>${escapeHtml(m.job.title)}<br><small style="color:var(--ln-blue);">${escapeHtml(m.job.company)}</small></th>`).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>InFit™ Score</td>
          ${matches.map(m => `<td><strong style="color:${m.scorePct >= 85 ? '#057642' : m.scorePct >= 65 ? '#B25900' : '#C00000'}; font-size:1.1rem;">${m.scorePct}%</strong></td>`).join('')}
        </tr>
        <tr>
          <td>Min Experience</td>
          ${matches.map(m => `<td>${m.job.min_experience} Yrs (${m.expGap > 0 ? `Short ${m.expGap} yr` : 'Qualified'})</td>`).join('')}
        </tr>
        <tr>
          <td>Matched Skills</td>
          ${matches.map(m => `<td><span style="color:#057642; font-weight:600;">${m.matchedSkills.length}/${m.job.required_skills.length}</span><br><small>${m.matchedSkills.join(', ')}</small></td>`).join('')}
        </tr>
        <tr>
          <td>Missing Skills</td>
          ${matches.map(m => `<td><span style="color:#C00000;">${m.missingSkills.length}</span><br><small>${m.missingSkills.join(', ')}</small></td>`).join('')}
        </tr>
        <tr>
          <td>Project Bonus</td>
          ${matches.map(m => `<td>${m.projectBonusHit ? '✨ +5% Earned' : '—'}</td>`).join('')}
        </tr>
        <tr>
          <td>Action</td>
          ${matches.map(m => `<td><button class="ln-btn-primary compare-apply-btn" data-id="${m.job.id}">Apply</button></td>`).join('')}
        </tr>
      </tbody>
    </table>
  `;

  wrapper.innerHTML = html;

  wrapper.querySelectorAll('.compare-apply-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const jId = e.target.getAttribute('data-id');
      const jobMatch = matches.find(m => m.job.id === jId);
      if (jobMatch) {
        trackJobApplication(jobMatch.job, jobMatch.scorePct);
        showToast(`Applied & tracked: ${jobMatch.job.title} @ ${jobMatch.job.company}`);
      }
    });
  });
}

function trackJobApplication(job, scorePct) {
  const existing = state.tracked.find(t => t.jobId === job.id || t.title === job.title);
  if (existing) {
    existing.status = "Applied";
  } else {
    state.tracked.unshift({
      id: `track-${Date.now()}`,
      jobId: job.id,
      title: job.title,
      company: job.company,
      status: "Applied",
      fitScore: scorePct,
      priority: scorePct >= 85 ? 3 : scorePct >= 65 ? 2 : 1,
      notes: "Auto-tracked from Easy Apply"
    });
  }
  renderTrackerTable();
  renderKanbanBoard();
}

function openDetailModal(match) {
  const { job, scorePct, skillScorePct, expScorePct, projectBonusHit, matchedSkills, missingSkills, expGap } = match;

  let scoreLevel = 'high';
  if (scorePct < 65) scoreLevel = 'low';
  else if (scorePct < 85) scoreLevel = 'medium';

  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
    <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 20px;">
      <div class="company-logo-avatar" style="width: 56px; height: 56px; font-size: 1.3rem;">
        ${job.company.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()}
      </div>
      <div>
        <h2 style="font-size: 1.3rem; font-weight: 600;">${escapeHtml(job.title)}</h2>
        <div style="font-size: 0.9rem; color: var(--ln-blue); font-weight: 500;">${escapeHtml(job.company)} · ${escapeHtml(job.location || 'San Francisco, CA')}</div>
      </div>
    </div>

    <div class="infit-score-pill ${scoreLevel}" style="font-size: 1rem; padding: 6px 14px; margin-bottom: 16px;">
      ✨ Overall InFit™ Fit Score: ${scorePct}%
    </div>

    <p style="font-size: 0.875rem; color: var(--ln-text-sub); line-height: 1.5; margin-bottom: 20px;">
      ${escapeHtml(job.description)}
    </p>

    <h3 style="font-size: 0.9rem; font-weight: 600; margin-bottom: 12px; border-bottom: 1px solid var(--ln-border); padding-bottom: 6px;">
      InFit™ Algorithmic Breakdown
    </h3>

    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;">
      <div style="background: #F8FAFC; border: 1px solid var(--ln-border); padding: 12px; border-radius: 6px;">
        <div style="font-size: 0.725rem; color: var(--ln-text-muted);">Skill Coverage (75% Weight)</div>
        <div style="font-size: 1.1rem; font-weight: 700; color: var(--ln-text-main);">${skillScorePct}% Coverage</div>
        <div style="font-size: 0.75rem; color: var(--ln-text-sub);">${matchedSkills.length} of ${job.required_skills.length} skills matched</div>
      </div>

      <div style="background: #F8FAFC; border: 1px solid var(--ln-border); padding: 12px; border-radius: 6px;">
        <div style="font-size: 0.725rem; color: var(--ln-text-muted);">Experience Fit (25% Weight)</div>
        <div style="font-size: 1.1rem; font-weight: 700; color: var(--ln-text-main);">${expScorePct}% Fit</div>
        <div style="font-size: 0.75rem; color: var(--ln-text-sub);">${expGap > 0 ? `${expGap} yrs short (-${expGap * 20}%)` : `Meets min requirement (${job.min_experience} yrs)`}</div>
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <div style="font-size: 0.8rem; font-weight: 600; color: var(--ln-text-sub); margin-bottom: 6px;">Requirement Status:</div>
      <div style="font-size: 0.825rem; margin-bottom: 4px;">
        <strong style="color: #057642;">Matched Skills:</strong> ${matchedSkills.length ? matchedSkills.join(', ') : 'None'}
      </div>
      <div style="font-size: 0.825rem;">
        <strong style="color: #C00000;">Missing Skills:</strong> ${missingSkills.length ? missingSkills.join(', ') : 'None'}
      </div>
    </div>

    <div class="modal-actions">
      <button class="ln-btn-secondary" id="modal-close-action">Close</button>
      <button class="ln-btn-primary" id="modal-apply-btn">⚡ Submit Easy Apply</button>
    </div>
  `;

  document.getElementById('detail-modal').classList.remove('hidden');

  document.getElementById('modal-close-action').addEventListener('click', closeDetailModal);
  document.getElementById('modal-apply-btn').addEventListener('click', () => {
    closeDetailModal();
    trackJobApplication(job, scorePct);
    showToast(`Application submitted & tracked for ${job.title}!`);
  });
}

function closeDetailModal() {
  document.getElementById('detail-modal').classList.add('hidden');
}

// ---------------------------------------------------------------------------
// Event Listeners & Mode Switcher
// ---------------------------------------------------------------------------
function bindEvents() {
  // Top Navbar View Mode Switcher
  const btnDiscover = document.getElementById('view-discover-btn');
  const btnTracker = document.getElementById('view-tracker-btn');
  const btnBoard = document.getElementById('view-board-btn');
  const btnCompare = document.getElementById('view-compare-btn');

  const secDiscover = document.getElementById('section-discover');
  const secTracker = document.getElementById('section-tracker');
  const secBoard = document.getElementById('section-board');
  const secCompare = document.getElementById('section-compare');

  function switchView(mode) {
    state.activeView = mode;
    [btnDiscover, btnTracker, btnBoard, btnCompare].forEach(b => b.classList.remove('active'));
    [secDiscover, secTracker, secBoard, secCompare].forEach(s => s.classList.add('hidden'));

    if (mode === 'discover') {
      btnDiscover.classList.add('active');
      secDiscover.classList.remove('hidden');
    } else if (mode === 'tracker') {
      btnTracker.classList.add('active');
      secTracker.classList.remove('hidden');
      renderTrackerTable();
    } else if (mode === 'board') {
      btnBoard.classList.add('active');
      secBoard.classList.remove('hidden');
      renderKanbanBoard();
    } else if (mode === 'compare') {
      btnCompare.classList.add('active');
      secCompare.classList.remove('hidden');
      renderCompareMatrix();
    }
  }

  btnDiscover.addEventListener('click', () => switchView('discover'));
  btnTracker.addEventListener('click', () => switchView('tracker'));
  btnBoard.addEventListener('click', () => switchView('board'));
  btnCompare.addEventListener('click', () => switchView('compare'));

  // AI Resume File Upload & Drag-and-Drop
  const fileInput = document.getElementById('resume-file-input');
  const dropzone = document.getElementById('resume-dropzone');

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => parseResumeText(event.target.result);
        reader.readAsText(file);
      }
    });
  }

  // Paste Raw Text Drawer Toggle
  const togglePasteBtn = document.getElementById('toggle-paste-btn');
  const pasteBox = document.getElementById('paste-resume-box');
  const parseTextBtn = document.getElementById('parse-text-btn');
  const rawResumeText = document.getElementById('raw-resume-text');

  togglePasteBtn.addEventListener('click', () => {
    pasteBox.classList.toggle('hidden');
  });

  parseTextBtn.addEventListener('click', () => {
    parseResumeText(rawResumeText.value);
    pasteBox.classList.add('hidden');
  });

  // Demo Resume Buttons
  document.querySelectorAll('.btn-sample-resume').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-sample');
      if (DEMO_RESUMES[type]) {
        parseResumeText(DEMO_RESUMES[type]);
      }
    });
  });

  // Preset Selector
  document.getElementById('preset-select').addEventListener('change', (e) => {
    const val = e.target.value;
    if (CANDIDATE_PRESETS[val]) {
      state.candidate = JSON.parse(JSON.stringify(CANDIDATE_PRESETS[val]));
      renderCandidateProfile();
      renderAllViews();
    }
  });

  // Experience Slider
  document.getElementById('candidate-experience').addEventListener('input', (e) => {
    state.candidate.years_experience = parseFloat(e.target.value);
    document.getElementById('exp-val-display').textContent = `${state.candidate.years_experience} Yrs`;
    renderAllViews();
  });

  // Add Skill
  const addSkillBtn = document.getElementById('add-skill-btn');
  const newSkillInput = document.getElementById('new-skill-input');

  function handleAddSkill(skillText) {
    const clean = skillText.trim();
    if (clean && !state.candidate.skills.some(s => s.toLowerCase() === clean.toLowerCase())) {
      state.candidate.skills.push(clean);
      renderCandidateProfile();
      renderAllViews();
    }
    newSkillInput.value = '';
  }

  addSkillBtn.addEventListener('click', () => handleAddSkill(newSkillInput.value));
  newSkillInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAddSkill(newSkillInput.value);
  });

  // Remove Tag
  document.getElementById('skills-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-tag')) {
      const index = parseInt(e.target.getAttribute('data-index'), 10);
      state.candidate.skills.splice(index, 1);
      renderCandidateProfile();
      renderAllViews();
    }
  });

  // Add Project
  const addProjBtn = document.getElementById('add-project-btn');
  const newProjInput = document.getElementById('new-project-input');

  function handleAddProject() {
    const clean = newProjInput.value.trim();
    if (clean) {
      state.candidate.projects.push(clean);
      renderCandidateProfile();
      renderAllViews();
      newProjInput.value = '';
    }
  }

  addProjBtn.addEventListener('click', handleAddProject);
  newProjInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAddProject();
  });

  // Remove Project
  document.getElementById('projects-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-project')) {
      const index = parseInt(e.target.getAttribute('data-index'), 10);
      state.candidate.projects.splice(index, 1);
      renderCandidateProfile();
      renderAllViews();
    }
  });

  // Tuning Sliders
  document.getElementById('weight-skill').addEventListener('input', (e) => {
    state.weights.skill = parseInt(e.target.value, 10) / 100;
    document.getElementById('weight-skill-val').textContent = `${e.target.value}%`;
    renderAllViews();
  });

  document.getElementById('weight-exp').addEventListener('input', (e) => {
    state.weights.experience = parseInt(e.target.value, 10) / 100;
    document.getElementById('weight-exp-val').textContent = `${e.target.value}%`;
    renderAllViews();
  });

  document.getElementById('weight-bonus').addEventListener('input', (e) => {
    state.weights.bonus = parseInt(e.target.value, 10) / 100;
    document.getElementById('weight-bonus-val').textContent = `+${e.target.value}%`;
    renderAllViews();
  });

  // Threshold Slider
  const thresholdSlider = document.getElementById('threshold-slider');
  thresholdSlider.addEventListener('input', (e) => {
    state.threshold = parseInt(e.target.value, 10);
    document.getElementById('threshold-val').textContent = `${state.threshold}% Fit`;
    renderJobsDiscover();
  });

  // Search Input
  document.getElementById('search-input').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderJobsDiscover();
  });

  // Filter Pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (pill.id === 'filter-all') state.activeFilterPill = 'all';
      else if (pill.id === 'filter-high') state.activeFilterPill = 'high';
      else if (pill.id === 'filter-easy') state.activeFilterPill = 'easy';
      else if (pill.id === 'filter-remote') state.activeFilterPill = 'remote';
      renderJobsDiscover();
    });
  });

  // Reset threshold button
  document.getElementById('reset-threshold-btn').addEventListener('click', () => {
    state.threshold = 50;
    thresholdSlider.value = 50;
    document.getElementById('threshold-val').textContent = '50% Fit';
    renderJobsDiscover();
  });

  // Modals
  document.getElementById('modal-close-btn').addEventListener('click', closeDetailModal);

  const addJobModal = document.getElementById('add-job-modal');
  
  function openAddModal() {
    addJobModal.classList.remove('hidden');
  }

  document.getElementById('add-job-modal-btn').addEventListener('click', openAddModal);
  document.getElementById('top-add-job-btn').addEventListener('click', openAddModal);

  document.getElementById('add-job-close-btn').addEventListener('click', () => {
    addJobModal.classList.add('hidden');
  });

  document.getElementById('cancel-job-btn').addEventListener('click', () => {
    addJobModal.classList.add('hidden');
  });

  document.getElementById('new-job-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('job-title').value.trim();
    const company = document.getElementById('job-company').value.trim();
    const minExp = parseFloat(document.getElementById('job-min-exp').value);
    const skillsRaw = document.getElementById('job-skills').value;
    const desc = document.getElementById('job-desc').value.trim();

    const required_skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);

    if (title && company && required_skills.length > 0) {
      const newJob = {
        id: `job-${Date.now()}`,
        title,
        company,
        location: "San Francisco, CA (Hybrid)",
        posted: "Just now",
        easy_apply: true,
        required_skills,
        min_experience: minExp,
        description: desc
      };
      state.jobs.unshift(newJob);
      renderAllViews();
      addJobModal.classList.add('hidden');
      document.getElementById('new-job-form').reset();
      showToast(`Job opening created: ${title} @ ${company}`);
    }
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.addEventListener('DOMContentLoaded', initApp);
