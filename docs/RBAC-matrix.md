# RBAC Matrix - Predefined Roles

## Roles
1. Super Admin
2. Client Admin
3. HR
4. Recruiter
5. Developer
6. Interviewer
7. Candidate

## Permissions Matrix
| Capability | Super Admin | Client Admin | HR | Recruiter | Developer | Interviewer | Candidate |
|---|---|---|---|---|---|---|---|
| Platform KPI Dashboard | Yes | No | No | No | No | No | No |
| Manage Companies (Create/Suspend/Plan) | Yes | No | No | No | No | No | No |
| Login As (Impersonate lower role) | Yes | Yes | No | No | No | No | No |
| Tenant Branding Settings | No | Yes | No | No | No | No | No |
| Invite Tenant Users | No | Yes | No | No | No | No | No |
| Manage Tenant Users/Role Update | No | Yes | Limited (view) | No | No | No | No |
| Create/Manage Jobs | No | Yes | Yes | Yes | No | No | No |
| Configure Pipeline Stages | No | Yes | Yes | Yes | No | No | No |
| Map Interviewers to Stage | No | Yes | Yes | Yes | No | No | No |
| View Candidate Pipeline | No | Yes | Yes | Yes | Limited | Assigned only | Self |
| Add Candidate Manually/Bulk | No | Yes | Yes | Yes | No | No | No |
| Browse Test Library | No | Yes | Yes | Yes | Yes | No | No |
| Create Custom Questions | No | Yes | Optional | Yes | Yes | No | No |
| Schedule/Send Assessment | No | Yes | Yes | Yes | No | No | No |
| Take Assessment | No | No | No | No | No | No | Yes |
| View Proctoring Live Grid | No | Yes | Yes | Yes | No | Optional | No |
| End Candidate Test | No | Yes | Yes | Yes | No | Optional | No |
| Review Results/Trust Score | No | Yes | Yes | Yes | Limited | No | Self limited |
| Submit Interview Scorecard | No | No | No | No | No | Yes | No |
| Final Hiring Decision | No | No | Yes | No | No | No | No |
| Access FAQ Module | Yes | Yes | Yes | Yes | Yes | Yes | Yes |

## Guard Rules
1. Tenant roles can access only own tenant records.
2. Interviewer can access only assigned candidates/interviews.
3. Candidate can access only own attempt/session resources.
4. Super Admin can never mutate tenant test submissions directly without audit entry.

## Impersonation Rules
1. Super Admin can impersonate Client Admin/HR/Recruiter/Developer/Interviewer.
2. Client Admin can impersonate HR/Recruiter/Developer/Interviewer.
3. Impersonation session banner required.
4. Every impersonated action stores `actor_user_id` and `effective_user_id`.
