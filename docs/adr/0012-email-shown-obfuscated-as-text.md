# ADR 0012: Show the e-mail address obfuscated as text, with the real address only in mailto:

- Status: accepted
- Date: 2026-10-26

## Context

[ADR 0003](0003-content-fidelity.md) fixed the real address for the `mailto:`
link, but left open whether the address is also shown as visible text. The
plan records this as risk 2.

The archive shows the address in two forms. The `mailto:` href is
`biuro.psychomed@gmail.com`. The visible text is `biuro.psychomed(at)gmail.com`,
obfuscated in the Gmail markup (`span.gI > span.go`). Publishing the plain
address invites address harvesting. Hiding the address as a link alone is less
usable for visitors who want to read it or copy it.

## Decision

The e-mail address is shown as visible text in the obfuscated form
`biuro.psychomed(at)gmail.com`. The link is `<a href="mailto:biuro.psychomed@gmail.com">`.

The real address appears only in the `href`. Every other occurrence of the
address on the site uses the `(at)` form.

## Alternatives considered

- **Show the real address as text.** Rejected: it invites spam, which is the
  risk this decision reduces.
- **Text only, with no link.** Rejected: visitors cannot open a mail client
  from it, which is less usable.
- **A contact form.** Rejected by [ADR 0001](0001-plain-html-css.md) and by the
  non-goals in the plan, because the site has no server-side behaviour.

## Consequences

- Visitors must replace `(at)` with `@` when typing the address by hand. The
  `mailto:` link works without that step.
- Address harvesters that read visible text see the `(at)` form. This reduces
  spam exposure but does not remove it.
- The e-mail appears on every page footer and in the contact card on the home
  page, so the form is the same everywhere.
- The `fundacja/` pages show `biuro.psychomed(at)gmail.com` as the visible text
  on every page, as implemented.
