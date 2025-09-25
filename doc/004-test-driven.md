key    |value
-------|----------
status |accepted
date   |2025-09-25

# 004 - The underlying basic game mechanics are developed test-driven

## Context and Problem Statement

The first version of this game was created 10 years ago during a six-week sprint hackathon. The functionalities were developed very quickly. The game mechanics — which items were combined with which ones, which interactions occurred — became increasingly complex. Eventually, bugs arose that could no longer be found.

This situation should not arise this time!

## Considered Options

* Create a test plan to manually check the positions and combinations of items
* Write an automatically executable test for each item and each combination of items (test-driven)

## Decision Outcome

Test-driven testing is the most modern and effective way to address this problem. The advantage of automated testing is that it identifies errors early on. There are two variants that can be implemented individually or both:

* The tests can be integrated into CI/CD pipelines and ensure that executable code always ends up in the repository.
* The tests can be run when the game starts. This ensures that the game functions correctly on the device and in the browser used.

---

Back   |Next
-------|-------
[003 - Change game name to Gingerbread Magic](003-change-game-name.md) |-
