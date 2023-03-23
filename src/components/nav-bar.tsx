import { TooltipContentProps } from "@radix-ui/react-tooltip"
import clsx from "clsx"
import {
  NavLink as RouterNavLink,
  NavLinkProps,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom"
import { useNetworkState } from "react-use"
import { GlobalStateContext } from "../global-state.machine"
import { toDateString } from "../utils/date"
import { IconButton } from "./icon-button"
import { DropdownMenu } from "./dropdown-menu"
import {
  CalendarFillIcon24,
  CalendarIcon24,
  MoreIcon24,
  NoteFillIcon24,
  NoteIcon24,
  TagFillIcon24,
  TagIcon24,
} from "./icons"
import { NewNoteDialog } from "./new-note-dialog"
import { Tooltip } from "./tooltip"

export function NavBar({ position }: { position: "left" | "bottom" }) {
  const [state, send] = GlobalStateContext.useActor()
  const navigate = useNavigate()
  // Open tooltips on the side opposite to the nav bar.
  const tooltipSide = ({ left: "right", bottom: "top" } as const)[position]
  const { online } = useNetworkState()
  return (
    <nav
      className={clsx(
        "w-full border-border-secondary",
        // Add a border separating the nav bar from the main content.
        { left: "border-r", bottom: "border-t" }[position],
      )}
    >
      <ul
        className={clsx(
          "flex p-2",
          { left: "h-full flex-col gap-2", bottom: "flex-row" }[position],
        )}
      >
        <li className={clsx({ left: "flex-grow-0", bottom: "flex-grow" }[position])}>
          <NavLink to="/" aria-label="Notes" tooltipSide={tooltipSide} end>
            {({ isActive }) => (isActive ? <NoteFillIcon24 /> : <NoteIcon24 />)}
          </NavLink>
        </li>
        <li className={clsx({ left: "flex-grow-0", bottom: "flex-grow" }[position])}>
          <NavLink
            to={`/dates/${toDateString(new Date())}`}
            aria-label="Today"
            tooltipSide={tooltipSide}
            end
          >
            {({ isActive }) =>
              isActive ? (
                <CalendarFillIcon24 date={new Date().getDate()} />
              ) : (
                <CalendarIcon24 date={new Date().getDate()} />
              )
            }
          </NavLink>
        </li>
        <li className={clsx({ left: "flex-grow-0", bottom: "flex-grow" }[position])}>
          <NavLink to="/tags" aria-label="Tags" tooltipSide={tooltipSide} end>
            {({ isActive }) => (isActive ? <TagFillIcon24 /> : <TagIcon24 />)}
          </NavLink>
        </li>
        <li className={clsx({ left: "flex-grow-0", bottom: "flex-grow" }[position])}>
          <NewNoteDialog.Trigger className="w-full" tooltipSide={tooltipSide} />
        </li>
        <li className={clsx({ left: "mt-auto flex-grow-0", bottom: "flex-grow" }[position])}>
          <DropdownMenu modal={false}>
            <DropdownMenu.Trigger asChild>
              {/* TODO: Focus button when dialog closes. */}
              <IconButton aria-label="More actions" disableTooltip className="w-full">
                <MoreIcon24 />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content side={tooltipSide} align="end">
              <DropdownMenu.Item
                href="https://github.com/colebemis/lumen/issues/new"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* TODO: Feedback icon */}
                Send feedback
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item
                onClick={() => send("PULL_NOTES")}
                disabled={
                  !online ||
                  !state.context.authToken ||
                  !state.context.repoOwner ||
                  !state.context.repoName
                }
              >
                {/* TODO: Sync icon */}
                Reload
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => navigate("/settings")}>
                {/* TODO: Settings icon */}
                Settings
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  )
}

function NavLink({
  tooltipSide,
  ...props
}: NavLinkProps & { tooltipSide?: TooltipContentProps["side"] }) {
  const path = useResolvedPath(props.to)
  const match = useMatch({
    path: path.pathname,
    end: props.end,
    caseSensitive: props.caseSensitive,
  })
  const isActive = match !== null

  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <RouterNavLink
          className={clsx(
            "focus-ring inline-flex w-full justify-center rounded-sm p-2 hover:bg-bg-secondary coarse:p-3",
            isActive ? "text-text" : "text-text-secondary",
          )}
          {...props}
        />
      </Tooltip.Trigger>
      <Tooltip.Content side={tooltipSide}>{props["aria-label"]}</Tooltip.Content>
    </Tooltip>
  )
}
