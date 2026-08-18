export const visitStatuses = ['SCHEDULED','INVITED','PENDING_APPROVAL','APPROVED','REJECTED','ARRIVED','CHECKED_IN','CHECKED_OUT','CANCELLED','EXPIRED','NO_SHOW'] as const;
export type VisitStatus = typeof visitStatuses[number];

const transitions: Record<VisitStatus, VisitStatus[]> = {
  SCHEDULED: ['INVITED','PENDING_APPROVAL','APPROVED','CANCELLED','EXPIRED','NO_SHOW'],
  INVITED: ['PENDING_APPROVAL','APPROVED','ARRIVED','CANCELLED','EXPIRED','NO_SHOW'],
  PENDING_APPROVAL: ['APPROVED','REJECTED','CANCELLED'],
  APPROVED: ['ARRIVED','CHECKED_IN','CANCELLED','EXPIRED','NO_SHOW'],
  REJECTED: [],
  ARRIVED: ['CHECKED_IN','REJECTED','CANCELLED'],
  CHECKED_IN: ['CHECKED_OUT'],
  CHECKED_OUT: [],
  CANCELLED: [],
  EXPIRED: [],
  NO_SHOW: [],
};

export function assertVisitTransition(from: VisitStatus, to: VisitStatus): void {
  if (!transitions[from]?.includes(to)) throw new Error(`Invalid visit transition: ${from} -> ${to}`);
}

export function canTransitionVisit(from: VisitStatus, to: VisitStatus): boolean {
  return transitions[from]?.includes(to) ?? false;
}
