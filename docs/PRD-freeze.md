# PRD Freeze - Hiring SaaS Enhancement

## Date
- May 19, 2026

## Release Goal
Ship end-to-end multi-tenant hiring workflows with proctoring, interview evaluation, and final hiring decisions in 10-12 days with controlled risk and deployable production quality.

## Scope Policy
- No new modules after this freeze.
- Enhancements only within listed flows.
- TBD capabilities ship behind feature flags and safe fallbacks.

## Must-Have (Release Blocking)
1. Login and role-based routing.
2. Tenant isolation across all APIs/data.
3. Super Admin company management (create/list/suspend/view details).
4. Company branding and user invitation with predefined roles.
5. Job creation, competency mapping, stage mapping.
6. Candidate intake: public form, manual create, CSV upload.
7. Assessment library browsing + assignment to job/candidate.
8. Candidate test engine with timer/fullscreen/autosave/resume.
9. Basic proctoring detections: tab switch/fullscreen exit/camera loss.
10. Proctoring logs and candidate result review.
11. Interview scorecard submission and final HR decision.
12. FAQ/support and exam recovery.
13. Dummy payment/subscription lifecycle with webhook simulation.
14. Audit logs for sensitive actions.

## Beta / Flagged
1. `secure_mode_basic`: browser hardening warnings and fullscreen enforcement (not full OS kiosk lock).
2. `proctoring_ai_beta`: confidence-scored AI flags and trust score tuning.
3. `interview_workspace_beta`: live coding + whiteboard integrated with provider wrappers.
4. `mock_payment`: fake checkout and fake webhook events.

## Explicitly Out-of-Scope for This Release
1. Native OS kiosk application with app whitelist enforcement.
2. Forensic-grade biometric ID verification.
3. Fully custom dynamic role builder.
4. Real payment gateway production charging.

## Flow-to-Module Mapping
1. Flow 1: Auth + Smart routing.
2. Flow 2: Pricing + mock subscription + welcome trigger.
3. Flow 3: Super Admin dashboard + company control.
4. Flow 4: Tenant setup + RBAC invites.
5. Flow 5: Jobs + workflows + sourcing.
6. Flow 6: Test library + customization + private question bank.
7. Flow 7: Pipeline + assessment scheduling.
8. Flow 8: Candidate test runtime + warnings + submission.
9. Flow 9: Live proctor grid + logs + review.
10. Flow 10: Interview workspace + structured scorecard.
11. Flow 11: Final HR action + lifecycle timeline.
12. Flow 12: FAQ + technical recovery.

## Non-Functional Requirements
1. Multi-tenant data segregation enforced server-side (never UI-only).
2. Role enforcement on all route handlers/actions.
3. Autosave resilience for abrupt disconnects.
4. Full traceability via audit/event logs.
5. Mobile responsive critical candidate flows.

## Acceptance Criteria (Release)
1. Full happy path from company onboarding to mark-as-hired is executable.
2. Negative path protections pass (tenant breach attempts denied).
3. Suspended tenant users blocked from login.
4. Candidate resume test works with exact timer/question recovery.
5. Scorecard and hiring actions write immutable timeline events.
