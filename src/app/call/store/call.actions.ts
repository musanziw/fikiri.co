import {createActionGroup, props} from '@ngrx/store';
import {CallResponseInterface} from '../types/call-response.interface';

export const callActions = createActionGroup({
  source: 'call',
  events: {
    load: props<{ id: number }>(),
    loadSuccess: props<CallResponseInterface>(),
    loadFailure: props<{ error: string }>(),
  },
});
