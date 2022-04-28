import { Inject } from '@nestjs/common';

import { EVENT_SOURCING_TOKEN } from './event-sourcing.constants';

export function InjectEventSourcing() {
  return Inject(EVENT_SOURCING_TOKEN);
}
