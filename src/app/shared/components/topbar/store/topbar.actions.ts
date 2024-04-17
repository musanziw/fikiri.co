import {createActionGroup, emptyProps} from "@ngrx/store";

export const topbarActions = createActionGroup({
  source: 'Topbar',
  events: {
    toogleNavbar: emptyProps(),
  }
})
