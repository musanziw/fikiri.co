import {
  EMPTY,
  catchError,
  concatMap,
  finalize,
  of,
  tap,
  withLatestFrom
} from "./chunk-BEKXVA35.js";

// node_modules/.pnpm/@ngrx+operators@17.0.0-beta.0_rxjs@7.8.1/node_modules/@ngrx/operators/fesm2022/ngrx-operators.mjs
function concatLatestFrom(observablesFactory) {
  return concatMap((value) => {
    const observables = observablesFactory(value);
    const observablesAsArray = Array.isArray(observables) ? observables : [observables];
    return of(value).pipe(withLatestFrom(...observablesAsArray));
  });
}
function tapResponse(observerOrNext, error, complete) {
  const observer = typeof observerOrNext === "function" ? {
    next: observerOrNext,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    error,
    complete
  } : observerOrNext;
  return (source) => source.pipe(tap({ next: observer.next, complete: observer.complete }), catchError((error2) => {
    observer.error(error2);
    return EMPTY;
  }), observer.finalize ? finalize(observer.finalize) : (source$) => source$);
}

export {
  concatLatestFrom,
  tapResponse
};
//# sourceMappingURL=chunk-DWJ5GN7M.js.map
