import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Call} from "../../../../shared/types/models-interfaces";

export const recentCallActions = createActionGroup({
  source: 'recentCall',
  events: {
    load: emptyProps(),
    loadSuccess: props<{ call: Call }>(),
    loadFailure: props<{ error: string }>(),
  },
});
