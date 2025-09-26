# **Lebkuchenzauber** / **Gingerbread Magic**

Playable version: https://tursics.github.io/gingerbread-10-years

Source code repo: https://github.com/tursics/gingerbread-10-years

![screenshot](/doc/simple-graphic.png)

## to do list

- [x] base game play, without dependencies  (see /assets/module.*.js)
- [x] test set
- [x] input type: keyboard
- [x] input type: mouse
- [x] input type: touch
- [x] animation level: basic
- [ ] animation level: advanced
- [ ] animation level: particular effects
- [ ] sound: effects
- [ ] sound: background music
- [x] graphic: basic (based on emoticons)
- [ ] graphic: high quality assets
- [ ] graphic: animated character
- [ ] functional on: console (without browser DOM)
- [x] functional in: browser (see /assets/ui.*.js)
- [x] functional on: desktop / laptop
- [ ] functional on: tabet devices
- [ ] functional on: mobile phones
- [ ] functional on: tv devices
- [ ] functional on: other (game consoles)
- [ ] frame: responsive design
- [ ] frame: add a story
- [ ] frame: menu design
- [ ] frame: 100+ level designed
- [ ] profile: save preferences
- [ ] profile: save level state
- [x] feature: show hint

## Detailed documentation

All decisions regarding the game's development are documented in ADRs. Here are the most important subpages:

- [001 - Use ADR (Architectural Decision Records) to document decisions](doc/001-use-adr.md)
- [003 - Change game name to **Gingerbread Magic**](doc/003-change-game-name.md)

## z-index stack

- 0..99 normal
- 100..199 items
- 200..299 focus ring
- 300..399 overlays

## Items and combinations

item           | emoji          | image | description | state
---------------|----------------|-------|-------------|------
color          | 🍎 🍐 🍋 🫐 🍠 🥥 |    | basic item   | :white_check_mark: done
row stripes    | 🐷 🐭 🐵 🐮 🐯 🐦 |    | special item | :white_check_mark: done
column stripes | 🐖 🐁 🐒 🐄 🐅 🦢 |    | special item | :white_check_mark: done
diagonal       | ↙️ ↘️           |    | special item | :hourglass: POSTPONED
cross          | ✝️              |    | power item   | :construction_worker: TODO
square         | 🍀              |    | power item   | :construction_worker: TODO
dynamite       | 🧨              |    | power item   | :construction_worker: TODO
color bomb     | 🏵️              |    | power item   | :white_check_mark: done
magnet         | 🧲              |    | super item   | :hourglass: POSTPONED

combination       | emoji | image | result      | state
------------------|-------|-------|-------------|------
3 in a row        | 🍎 + 🍎 + 🍎 = - |       | all 3 items removed | :white_check_mark: done
3 in a column     | 🍎 + 🍎 + 🍎 = - |       | all 3 items removed | :white_check_mark: done
4 in a row        | 🍎 + 🍎 + 🍎 + 🍎 = 🐷 |    | all 4 items removed and replaced by one `row stripes` | :white_check_mark: done
4 in a column     | 🍎 + 🍎 + 🍎 + 🍎 = 🐖 |    | all 4 items removed and replaced by one `column stripes` | :white_check_mark: done
4 in a diagonal   | 🍎 + 🍎 + 🍎 + 🍎 = ↙️ or ↘️ |    | all 4 items removed and replaced by one `diagonal` | :hourglass: POSTPONED
5 in a row        | 🍎 + 🍎 + 🍎 + 🍎 + 🍎 = 🏵️ |    | all 5 items removed and replaces by one `color bomb` | :white_check_mark: done
5 in a column     | 🍎 + 🍎 + 🍎 + 🍎 + 🍎 = 🏵️ |    | all 5 items removed and replaces by one `color bomb` | :white_check_mark: done
5 in a diagonal   | 🍎 + 🍎 + 🍎 + 🍎 + 🍎 = ↙️ or ↘️ |    | all 5 items removed and replaced by one `diagonal` | :hourglass: POSTPONED
6 in a row        | 🍎 + 🍎 + 🍎 + 🍎 + 🍎 + 🍎 = 🧲 |    | all 6 items removed and replaces by one `magnet` | :hourglass: POSTPONED
6 in a column     | 🍎 + 🍎 + 🍎 + 🍎 + 🍎 + 🍎 = 🧲 |    | all 6 items removed and replaces by one `magnet` | :hourglass: POSTPONED
4 in a 2x2 figure | 🍎 + 🍎 and 🍎 + 🍎 = 🍀 |    | all 4 items removed and replaced by one `square` | :construction_worker: TODO
5 in a `+` figure, 3 in a row, 3 in a column | 🍎 + 🍎 + 🍎 and 🍎 + 🍎 + 🍎 = ✝️ |    | all 5 items removed and replaces by one `cross` | :construction_worker: TODO
5 in a `T` figure, 3 in a row, 3 in a column | 🍎 + 🍎 + 🍎 and 🍎 + 🍎 + 🍎 = 🧨 |    | all 5 items removed and replaces by one `dynamite` | :construction_worker: TODO
5 in a `L` figure, 3 in a row, 3 in a column | 🍎 + 🍎 + 🍎 and 🍎 + 🍎 + 🍎 = 🧨 |    | all 5 items removed and replaces by one `dynamite` | :construction_worker: TODO

combination          | emoji | image | result      | state
---------------------|-------|-------|-------------|------
row stipes in a new match | 🐷 + 🍎 + 🍎 |    | remove all items in the row | :white_check_mark: done
column stipes in a new match | 🐖 + 🍎 + 🍎 |    | remove all items in the column | :white_check_mark: done
cross in a new match | ✝️ + 🍎 + 🍎 |    | remove all items in the row and all items in the column | :construction_worker: TODO
square in a new match | 🍀 + 🍎 + 🍎 |    | remove all items in a 3x3 sector | :construction_worker: TODO
dynamite in a new match | 🧨 + 🍎 + 🍎 |    | remove all items in a small radius | :construction_worker: TODO
diagonal in a new match | ↘️ + 🍎 + 🍎 |    | remove all items in a diagonal | :hourglass: POSTPONED
color bomb and 1 color | 🏵️ + 🍎 |    | remove all items the same color from the board | :construction_worker: TODO
magnet and 1 color | 🧲 + 🍎 |    | remove all items from the board, two times | :hourglass: POSTPONED
cross and cross | ✝️ + ✝️ |    | remove all items in 2 rows and all items in 2 columns | :construction_worker: TODO
cross and square | ✝️ + 🍀 |    | replace all items in a cross figure (cross in a complete row and column) with cross items and let them explode | :construction_worker: TODO
cross and stipes | ✝️ + 🐷 |    | remove all items in 2 rows or in 2 columns | :construction_worker: TODO
cross and dynamite | ✝️ + 🧨 |    | remove all items in a cross figure in a big radius | :construction_worker: TODO
cross and a color bomb | ✝️ + 🏵️ |    | replace all items the same cross color with cross items and let them explode | :construction_worker: TODO
square and square | 🍀 + 🍀 |    | remove all items in a gigantic radius | :construction_worker: TODO
square and stipes | 🍀 + 🐷 |    | remove all items in the row and all items in the column | :construction_worker: TODO
square and dynamite | 🍀 + 🧨 |    | remove all items in a big radius | :construction_worker: TODO
square and a color bomb | 🍀 + 🏵️ |    | replace all items the same square color with square items and let them explode | :construction_worker: TODO
stipes and stipes | 🐷 + 🐷 |    | remove all items in the row and all items in the column | :white_check_mark: 
stipes and dynamite | 🐷 + 🧨 |    | remove all items in the row or column, plus a row or column next to both sides | :construction_worker: TODO
stipes and a color bomb | 🐷 + 🏵️ |    | replace all items the same stripe color with stripe items and let them explode | :construction_worker: TODO
dynamite and dynamite | 🧨 + 🧨 |    | remove all items in a big radius | :construction_worker: TODO
dynamite and a color bomb | 🧨 + 🏵️ |    | replace all items the same dynamite color with dynamite and let them explode | :construction_worker: TODO
color bomb and a color bomb | 🏵️ + 🏵️ |    | remove all items from the board | :construction_worker: TODO

## data

It's all based on data.

* [Bibliotheca Gastronomica](http://codingdavinci.de/daten/#slub-dresden) on Coding da Vinci (link broken)
* [Bibliotheca Gastronomica](https://codingdavinci.de/daten/bibliotheca-gastronomica) on Coding da Vinci (link checked 2025)
* [Bibliotheca Gastronomica Walter Putz. - Band 1: Die Drucke](https://slub.qucosa.de/landing-page/?tx_dlf[id]=https%3A%2F%2Fslub.qucosa.de%2Fapi%2Fqucosa%253A920%2Fmets)
* [Bibliotheca Gastronomica Walter Putz. - Band 2: Handschriften, Zeitschriften, Register der Personen und Titel](https://slub.qucosa.de/landing-page/?tx_dlf[id]=https%3A%2F%2Fslub.qucosa.de%2Fapi%2Fqucosa%253A921%2Fmets)
* [Die Nürnberger Lebkuchen](http://digital.slub-dresden.de/werkansicht/dlf/12327/) in online viewer (link broken)
* [Die Nürnberger Lebkuchen](https://digital.slub-dresden.de/werkansicht/dlf/12327/1) in online viewer (link checked 2025)

From `Bibliotheca Gastronomica Walter Putz. - Band 1: Die Drucke`:

year | book | signature
-----|------|----------
1898 | Die **Nürnberger Lebkuchen** : eine praktische Anleitung zur Herstellung aller Sorten Lebkuchen nach Nürnberger Art / hrsg. von Jakob Braun, Nürnberg : Selbstverl. , 1898. - 104 S. : Ill. http://digital.slub-dresden.de/ppn312640250 | Putz.19 8 480

Attribution:

- `<a href="https://www.slub-dresden.de/" target="_blank"><img src="https://digital.slub-dresden.de/fileadmin/images/dfgviewer_logo_slub.gif" /></a>`
- `Sächsische Landesbibliothek - Staats- und Universitätsbibliothek Dresden`
- rights: [Public Domain Mark 1.0](http://creativecommons.org/publicdomain/mark/1.0/)

IDs:

- URN: [urn:nbn:de:bsz:14-db-id3126402504](http://nbn-resolving.de/urn:nbn:de:bsz:14-db-id3126402504)
- PURL: http://digital.slub-dresden.de/id312640250
- OAI: [oai:de:slub-dresden:db:id-312640250](https://digital.slub-dresden.de/oai/?verb=GetRecord&metadataPrefix=mets&identifier=oai:de:slub-dresden:db:id-312640250)
- SLUB-Katalog: [312640250](https://katalog.slub-dresden.de/ppn/312640250)

I converted the book to [markdown](/312640250.md).

## history

Back in 2015 I developed a first version in a 10 weeks hackathon. The [source code](https://github.com/tursics/GingerbreadGame) and a [playable demo](https://tursics.de/sample/gingerbread/) are still available.

![old game screenshot](https://github.com/tursics/GingerbreadGame/raw/master/preview/level.png)

Back to 2025 I started from scratch. The first version only use the console of browser.

![screenshot](/doc/console.png)

The next iteration step displays the content on the browser canvas.

![screenshot](/doc/emoji.png)

Followed by displaying simple gingerbread graphics

![screenshot](/doc/simple-graphic.png)
