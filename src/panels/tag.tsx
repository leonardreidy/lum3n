import { useActor } from "@xstate/react"
import React from "react"
import { TagIcon24 } from "../components/icons"
import { NoteForm } from "../components/note-form"
import { NoteList } from "../components/note-list"
import { Panel } from "../components/panel"
import { PanelProps } from "../components/panels"
import { GlobalStateContext } from "../global-state"
import { pluralize } from "../utils/pluralize"

export function TagPanel({ params, onClose }: PanelProps) {
  const { name = "" } = params
  const globalState = React.useContext(GlobalStateContext)
  const [state] = useActor(globalState.service)
  const noteIds = state.context.tags[name] || []

  return (
    <Panel
      title={`#${name}`}
      description={pluralize(noteIds.length, "note")}
      icon={<TagIcon24 />}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4 px-4 pb-4">
        <NoteForm defaultBody={`#${name}`} />
        <NoteList key={name} ids={noteIds} />
      </div>
    </Panel>
  )
}
