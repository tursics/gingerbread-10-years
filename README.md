# gingerbread-10-years

Playable version: https://tursics.github.io/gingerbread-10-years

Source code repo: https://github.com/tursics/gingerbread-10-years

![screenshot](/doc/emoji.png)

## to do list

- [x] base game play, without dependencies  (see /assets/module.*.js)
- [x] test set
- [x] input type: keyboard
- [x] input type: mouse
- [ ] input type: touch
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

## z-index stack

- 0..99 normal
- 100..199 items
- 200..299 focus ring
- 300..399 overlays

## items

- blue
- red
- orange
- green
- yellow
- purple

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
