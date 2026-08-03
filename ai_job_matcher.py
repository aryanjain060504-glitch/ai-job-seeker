from dataclasses import dataclass, field
from typing import List


# ---------------------------------------------------------------------------
# Data models
# ---------------------------------------------------------------------------

@dataclass
class Resume:
    name: str
    skills: List[str]
    years_experience: float
    projects: List[str] = field(default_factory=list)

    def skill_set(self) -> set:
        return {s.strip().lower() for s in self.skills}

    def projects_text(self) -> str:
        return " ".join(self.projects).lower()


@dataclass
class Job:
    title: str
    company: str
    required_skills: List[str]
    min_experience: float
    description: str = ""

    def required_set(self) -> set:
        return {s.strip().lower() for s in self.required_skills}


@dataclass
class MatchResult:
    job: Job
    score_pct: int
    matched_skills: List[str]
    missing_skills: List[str]

    def __str__(self) -> str:
        matched = ", ".join(self.matched_skills) or "none"
        missing = ", ".join(self.missing_skills) or "none"
        return (
            f"{self.score_pct:>3}%  {self.job.title} @ {self.job.company}\n"
            f"       matched: {matched}\n"
            f"       missing: {missing}"
        )


# ---------------------------------------------------------------------------
# Scoring engine
# ---------------------------------------------------------------------------
# Weighted, explainable scoring -- deliberately simple and inspectable rather
# than a black box, since a candidate needs to trust *why* a score is what
# it is (this mirrors the "transparent AI fit score" requirement in the PRD).
#
#   75% weight -> skill overlap between resume and job requirements
#   25% weight -> experience-level fit (penalized if under the job's minimum)
#   +5% bonus  -> if a required skill also shows up in a named project

SKILL_WEIGHT = 0.75
EXPERIENCE_WEIGHT = 0.25
PROJECT_BONUS = 0.05


def score_job(resume: Resume, job: Job) -> MatchResult:
    resume_skills = resume.skill_set()
    required = job.required_set()

    matched = required & resume_skills
    missing = required - resume_skills

    skill_score = len(matched) / len(required) if required else 0.0

    if resume.years_experience >= job.min_experience:
        experience_score = 1.0
    else:
        gap = job.min_experience - resume.years_experience
        experience_score = max(0.0, 1.0 - gap * 0.2)  # -20% per year short

    project_bonus = PROJECT_BONUS if any(
        skill in resume.projects_text() for skill in required
    ) else 0.0

    raw_score = (
        skill_score * SKILL_WEIGHT
        + experience_score * EXPERIENCE_WEIGHT
        + project_bonus
    )
    pct = min(100, round(raw_score * 100))

    # Preserve the job posting's original casing (e.g. "SQL", "APIs")
    # instead of re-titling the lowercased comparison set.
    original_by_lower = {s.strip().lower(): s.strip() for s in job.required_skills}
    matched_skills = sorted(original_by_lower[s] for s in matched)
    missing_skills = sorted(original_by_lower[s] for s in missing)

    return MatchResult(
        job=job,
        score_pct=pct,
        matched_skills=matched_skills,
        missing_skills=missing_skills,
    )


def find_matching_jobs(
    resume: Resume, jobs: List[Job], threshold_pct: int = 65
) -> List[MatchResult]:
    """
    Only returns jobs at or above the given match threshold -- the core
    product idea: candidates see (and apply to) roles they're genuinely
    qualified for, not everything open on the platform.
    """
    results = [score_job(resume, job) for job in jobs]
    results = [r for r in results if r.score_pct >= threshold_pct]
    results.sort(key=lambda r: r.score_pct, reverse=True)
    return results


# ---------------------------------------------------------------------------
# Demo data + runnable example
# ---------------------------------------------------------------------------

def sample_job_catalog() -> List[Job]:
    return [
        Job("Senior Product Manager", "Nova Health",
            ["Product Strategy", "User Research", "Roadmapping", "Stakeholder Management"],
            min_experience=3),
        Job("Product Manager, Growth", "Brightline",
            ["SQL", "A/B Testing", "Product Strategy", "Analytics"],
            min_experience=2),
        Job("Associate PM", "Kestrel",
            ["Agile", "Figma", "User Research"],
            min_experience=0),
        Job("Product Manager, Payments", "Fintra",
            ["SQL", "Stakeholder Management", "Compliance", "Roadmapping"],
            min_experience=4),
        Job("Product Manager", "Loop Robotics",
            ["Product Strategy", "Roadmapping", "Supply Chain", "Agile"],
            min_experience=3),
        Job("Product Manager II", "Verano",
            ["A/B Testing", "SQL", "User Research", "Product Strategy"],
            min_experience=3),
        Job("PM, Platform", "Dockside",
            ["APIs", "Stakeholder Management", "Agile", "SQL"],
            min_experience=5),
        Job("Junior Product Manager", "Millwork",
            ["Figma", "Agile", "User Research"],
            min_experience=1),
    ]


def demo():
    resume = Resume(
        name="Candidate",
        skills=[
            "Product Strategy", "SQL", "A/B Testing", "Roadmapping",
            "User Research", "Figma", "Agile", "Stakeholder Management",
        ],
        years_experience=3,
        projects=[
            "Led 0-to-1 onboarding redesign",
            "Built pricing experiment framework using A/B testing",
            "Launched referral program",
        ],
    )

    jobs = sample_job_catalog()
    threshold = 65

    print(f"Matching jobs for {resume.name} "
          f"({resume.years_experience} yrs experience) "
          f"at >= {threshold}% fit\n")

    matches = find_matching_jobs(resume, jobs, threshold_pct=threshold)

    if not matches:
        print("No jobs meet the threshold. Try lowering it or adding skills.")
        return

    for m in matches:
        print(m)
        print()

    print(f"{len(matches)} of {len(jobs)} open jobs are a strong enough fit to apply to.")


if __name__ == "__main__":
    demo()
