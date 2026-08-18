export type NotificationEvent = 'VISIT_CREATED'|'VISIT_APPROVED'|'VISIT_REJECTED'|'VISITOR_ARRIVED'|'VISITOR_CHECKED_IN'|'VISITOR_CHECKED_OUT'|'VISITOR_OVERSTAY';
export type NotificationChannel = 'EMAIL'|'SMS'|'WHATSAPP'|'PUSH';
export interface NotificationJob { organizationId: string; event: NotificationEvent; channel: NotificationChannel; recipient: string; payload: Record<string, unknown>; }
export function buildVisitNotificationJobs(input: { organizationId: string; event: NotificationEvent; hostEmail?: string; hostPhone?: string; visitorPhone?: string; payload: Record<string, unknown>; }): NotificationJob[] {
  const jobs: NotificationJob[] = [];
  if (input.hostEmail) jobs.push({ organizationId: input.organizationId, event: input.event, channel: 'EMAIL', recipient: input.hostEmail, payload: input.payload });
  if (input.hostPhone) jobs.push({ organizationId: input.organizationId, event: input.event, channel: 'SMS', recipient: input.hostPhone, payload: input.payload });
  if (input.visitorPhone && ['VISIT_APPROVED','VISIT_REJECTED','VISITOR_CHECKED_IN'].includes(input.event)) jobs.push({ organizationId: input.organizationId, event: input.event, channel: 'WHATSAPP', recipient: input.visitorPhone, payload: input.payload });
  return jobs;
}
