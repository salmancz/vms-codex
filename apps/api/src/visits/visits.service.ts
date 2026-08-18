import { assertVisitTransition, type VisitStatus } from '../../../../packages/core/src/visit-state.ts';
import { buildVisitNotificationJobs } from '../../../../packages/core/src/notifications.ts';

export class VisitsService {
  transition(visit: { organizationId: string; status: VisitStatus }, to: VisitStatus, actorUserId: string) {
    assertVisitTransition(visit.status, to);
    return { ...visit, status: to, audit: { organizationId: visit.organizationId, actorUserId, action: `VISIT_${to}`, entityType: 'Visit' } };
  }
  notificationJobsForCheckin(input: { organizationId: string; hostEmail?: string; hostPhone?: string; visitorPhone?: string; passNumber: string }) {
    return buildVisitNotificationJobs({ ...input, event: 'VISITOR_CHECKED_IN', payload: { passNumber: input.passNumber } });
  }
}
