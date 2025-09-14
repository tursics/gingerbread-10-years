key    |value
-------|----------
status |accepted
date   |2025-09-14

# 001 - Use ADR (Architectural Decision Records) to document decisions

## Context and Problem Statement

Important decisions must be made during software development. Transparent documentation is essential to understand these decisions and the path to them.

## Decision Drivers

- The first version of this game was created at a hackathon. The decisions made there are no longer fully understandable today.
- The development of this game is already advanced and documentation is lacking.

## Considered Options

- The Readme in the project root can be used
- Multiple thematic subpages in Markdown can be created
- All decisions can be recorded using ADR templates
- The GitHub wiki can be used

## Decision Outcome

The **ADR** option is chosen because it is considered most advantageous to record the report in MarkDown. By choosing an ADR template, all information can be stored in a structured and understandable manner.

### Consequences

- The Readme can be kept slim
- The complete documentation remains in the `/docs` folder

---

Back   |Next
-------|-------
[000 Template](000-template.md) |-
