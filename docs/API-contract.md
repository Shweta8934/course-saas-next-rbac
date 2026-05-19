# API Contract Freeze (v1)

## Conventions
- Auth: session/JWT required except public apply + candidate test link endpoints.
- Tenant context: required for all tenant-bound endpoints.
- Every mutating endpoint writes audit log.

## Auth & Routing
1. `POST /api/auth/login` -> returns session + role.
2. `GET /api/auth/me` -> role + tenant + permissions.
3. `POST /api/auth/impersonate/:userId` -> impersonation token/session.

## Super Admin
1. `GET /api/super-admin/metrics`
2. `GET /api/super-admin/companies?status=&search=`
3. `POST /api/super-admin/companies`
4. `GET /api/super-admin/companies/:companyId`
5. `PATCH /api/super-admin/companies/:companyId/subscription`
6. `PATCH /api/super-admin/companies/:companyId/suspend`

## Tenant Setup & Users
1. `GET /api/tenant/profile`
2. `PATCH /api/tenant/profile`
3. `POST /api/tenant/users/invite`
4. `GET /api/tenant/users`
5. `PATCH /api/tenant/users/:userId/role`

## Jobs & Pipeline
1. `POST /api/jobs`
2. `GET /api/jobs`
3. `GET /api/jobs/:jobId`
4. `PATCH /api/jobs/:jobId`
5. `POST /api/jobs/:jobId/stages`
6. `POST /api/jobs/:jobId/assessment-map`
7. `POST /api/jobs/:jobId/interviewer-map`

## Candidates
1. `POST /api/jobs/:jobId/candidates` (manual)
2. `POST /api/jobs/:jobId/candidates/bulk-import`
3. `POST /api/public/jobs/:jobPublicId/apply`
4. `GET /api/jobs/:jobId/candidates`
5. `PATCH /api/candidates/:candidateId/stage`

## Assessments
1. `GET /api/tests/library?type=&domain=&difficulty=`
2. `POST /api/tests/:testId/customize`
3. `POST /api/tests/custom-questions`
4. `POST /api/candidates/:candidateId/schedule-assessment`

## Candidate Runtime
1. `GET /api/assessment-attempt/:token/bootstrap`
2. `POST /api/assessment-attempt/:attemptId/system-check`
3. `POST /api/assessment-attempt/:attemptId/identity-capture`
4. `POST /api/assessment-attempt/:attemptId/autosave`
5. `POST /api/assessment-attempt/:attemptId/proctor-event`
6. `POST /api/assessment-attempt/:attemptId/submit`
7. `GET /api/assessment-attempt/:token/resume`

## Proctoring & Review
1. `GET /api/proctor/live-sessions`
2. `POST /api/proctor/sessions/:attemptId/warn`
3. `POST /api/proctor/sessions/:attemptId/end`
4. `GET /api/candidates/:candidateId/proctoring-logs`
5. `GET /api/candidates/:candidateId/results`

## Interview & Decision
1. `POST /api/interviews/:candidateId/create-session`
2. `GET /api/interviews/:sessionId`
3. `POST /api/interviews/:sessionId/scorecard`
4. `POST /api/candidates/:candidateId/final-decision`
5. `GET /api/candidates/:candidateId/lifecycle`

## Mock Billing
1. `POST /api/billing/mock-checkout`
2. `POST /api/billing/mock-webhook`
3. `GET /api/billing/subscription-status`

## Support
1. `GET /api/support/faqs?category=`
2. `GET /api/support/troubleshooting?issue=`
