import { SetMetadata } from '@nestjs/common';
import { NEST_EVENT_EMITTER } from '../constants';

export const Watcher = () => SetMetadata(NEST_EVENT_EMITTER, 'default');
