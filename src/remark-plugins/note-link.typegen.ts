// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "xstate.init": { type: "xstate.init" }
    "xstate.stop": { type: "xstate.stop" }
  }
  invokeSrcNameMap: {}
  missingImplementations: {
    actions: "consume"
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    consume: "CHAR"
    forwardChar: "CHAR"
  }
  eventsCausingServices: {}
  eventsCausingGuards: {
    isClosingMarkerChar: "CHAR"
    isNumberChar: "CHAR"
    isOk:
      | "done.state.noteLink.noteLink"
      | "done.state.noteLink.noteLink.closingMarker"
      | "done.state.noteLink.noteLink.id"
      | "done.state.noteLink.noteLink.openingMarker"
    isOpeningMarkerChar: "CHAR"
  }
  eventsCausingDelays: {}
  matchesStates:
    | "noteLink"
    | "noteLink.closingMarker"
    | "noteLink.closingMarker.1"
    | "noteLink.closingMarker.2"
    | "noteLink.closingMarker.nok"
    | "noteLink.closingMarker.ok"
    | "noteLink.id"
    | "noteLink.id.1"
    | "noteLink.id.2"
    | "noteLink.id.nok"
    | "noteLink.id.ok"
    | "noteLink.ok"
    | "noteLink.openingMarker"
    | "noteLink.openingMarker.1"
    | "noteLink.openingMarker.2"
    | "noteLink.openingMarker.nok"
    | "noteLink.openingMarker.ok"
    | "ok"
    | {
        noteLink?:
          | "closingMarker"
          | "id"
          | "ok"
          | "openingMarker"
          | {
              closingMarker?: "1" | "2" | "nok" | "ok"
              id?: "1" | "2" | "nok" | "ok"
              openingMarker?: "1" | "2" | "nok" | "ok"
            }
      }
  tags: never
}