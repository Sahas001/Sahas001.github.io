---
title: "Building Prashna: a reading app that ends"
date: "2026-11-13"
description: A side project I built for fun. It started as a reading recommender called Radar and turned into Prashna, an app that picks a short edition each morning and then stops.
category: Tech
featured: true
tags:
  - go
  - sqlite
  - htmx
  - local-first
  - machine-learning
---

# Building Prashna: a reading app that ends

I read a lot online, and most of the tools for it are built to keep me scrolling. I wanted the opposite: something that picks a few good things each morning, lets me read them properly, and then stops. So I built Prashna.

*Prashna* (प्रश्न) is Sanskrit for "question". It's a side project I made for fun, mostly for myself. It's free, open source, and runs entirely on your own computer. This post is about what it does and how it got built, including the parts I changed my mind about along the way.

## What it does

Each morning Prashna puts together a short **edition**: a lead story, a few papers, essays and discussions, and on Sundays a book of the week. It stays the same all day, and it ends. Tomorrow's edition is made from whatever arrives overnight.

It draws from sources that are free and need no account: blogs and magazines you follow by RSS, Hacker News, arXiv, and Open Library for books.

Every piece has three buttons: Save, More like this, and Less. That, plus what you open, is all Prashna learns from. Clicking a piece opens it in Prashna's own reader, where you can highlight passages and write notes. There are no accounts, subscriptions or servers. Your library, ratings and notes live in one folder that you can back up by copying it.

## It started as Radar

The first commit, on 9 November 2026, was not called Prashna and was not quite this app. It was *Radar*, a self-hosted reading recommender: a single Go binary with SQLite that fetched from arXiv, Hacker News, RSS feeds and book catalogues, ranked what it found, and emailed a daily digest. Each item in the email had signed thumbs-up and thumbs-down links, so a rating was one click from the inbox.

I didn't like where that was heading. Email delivery and signed feedback links need a server that is always on and reachable from the internet. That's a lot of machinery for something I only wanted to use myself.

So the same day, I took the server out. The email digest became a daily edition inside the app, fixed for the day and ending instead of scrolling forever. Google Books went too, replaced by Open Library and Wikidata, so that every source is free and needs no key. The app gained a first-run screen that asks what you like, library shelves for saved and finished reading, an archive of past editions, and search. What was left ran entirely on my own computer, and was simple enough to hand to a friend as one file.

## Ranking without an AI service

Prashna doesn't call any AI service. Ranking is done with classical techniques on your machine:

- **Interest matching:** weighted words and phrases in titles, summaries and tags, plus exact author names and categories.
- **Similarity:** a TF-IDF comparison with the pieces you've liked.
- **Recency:** newer pieces get a boost that fades with time.

On top of that sits a small model of your taste: a logistic regression trained on your ratings. Its features are hashed, covering things like title and summary words, tags, authors, the source and the feed. Training is full-batch, which makes it deterministic: the same ratings always give the same model. Likes and dislikes are weighted so that 40 likes and 4 dislikes count equally.

The part I care most about is that the model has to earn its place. It isn't tried at all until you have 20 ratings, with at least 5 likes and 5 dislikes. Then it is scored by cross-validation on your own ratings and compared with the built-in ranking on the same ratings. If it doesn't rank them better, it isn't used, and the app says so:

```text
Not used yet: it ranks your ratings no better than the built-in score (0.61 vs 0.64 AUC).
```

(The numbers there are an example.) When it does win, its share of the content score grows with the number of ratings, up to a ceiling of 80%. Recency stays outside the model and keeps its own weight.

Each piece in an edition tells you why it was picked, and the Interests page shows what the model has learned, in the form "you tend to like cs.DC, Aeon".

## A reader of its own

At first, clicking a piece sent you out to the original site. On 12 November that changed: essays and discussions now open inside the app as clean text.

The reader fetches the page, finds the article with [go-readability](https://codeberg.org/readeck/go-readability) (a port of Mozilla's Readability), and reduces it to a small, safe subset of HTML. The text is stored the first time you open a piece, and right away when you save one, so anything you saved can be read later without the internet.

Highlights needed a little thought. A highlight is stored as character offsets into the article's text, plus the quoted words themselves:

```sql
CREATE TABLE highlights (
    id         INTEGER PRIMARY KEY,
    item_id    TEXT NOT NULL REFERENCES items (id) ON DELETE CASCADE,
    start_pos  INTEGER NOT NULL,
    end_pos    INTEGER NOT NULL,
    quote      TEXT NOT NULL,
    note       TEXT NOT NULL DEFAULT '',
    created_at INTEGER NOT NULL
);
```

The offsets say where to draw the highlight. The quote is there so the highlight survives, and can be found again, if the text is ever fetched a second time and comes back slightly different.

arXiv papers came a day later. They are read from arXiv's own web version, with equations, figures, tables and references set like the rest of the app, and a maths font bundled for the formulas. If a paper exists only as a PDF, you get its abstract and a button for the PDF.

## Fetching links from strangers, safely

A reading app fetches whatever addresses its feeds give it. That is a risk: a link in a feed could point at something on your own computer or home network, and the app would fetch it for the attacker.

So the reader connects through a dialer that refuses anything that isn't a public address. The check runs after DNS resolution, on the address actually being dialed, so a harmless-looking hostname that resolves to a private address is refused too:

```go
// publicOnly runs after DNS resolution, on the address actually dialed.
func publicOnly(network, address string, _ syscall.RawConn) error {
	ap, err := netip.ParseAddrPort(address)
	if err != nil {
		return fmt.Errorf("%w: %s", ErrBlocked, address)
	}
	ip := ap.Addr().Unmap()
	if ip.IsLoopback() || ip.IsPrivate() || ip.IsLinkLocalUnicast() || ip.IsLinkLocalMulticast() ||
		ip.IsMulticast() || ip.IsUnspecified() || cgnat.Contains(ip) {
		return fmt.Errorf("%w: %s", ErrBlocked, ip)
	}
	return nil
}
```

A review of the first version of this found a gap: the guard switched itself off whenever a proxy environment variable was set. That is fixed. Two related holes were closed at the same time. A Prashna without a password now only answers requests addressed to the local machine, which stops a web page from reaching it through DNS rebinding. And the "save this page" bookmark button opens Prashna with the address filled in but still needs a click there, so no other site can add things to your list.

## A new name and a desktop app

On 12 November, Radar became Prashna. Renaming meant touching nearly everything: the interface, the binary, the module path, even the database file.

The same change added two things. You can now paste any link to save it to your reading list, so Prashna isn't limited to what its sources find. And there is a desktop app with its own window, built with [Wails](https://wails.io). The window is drawn by the web view your system already has, so nothing extra is bundled.

I wanted the desktop app without giving up the simple build. The window code sits behind a build tag. Without that tag, Prashna is one Go module with no C dependencies, using a pure-Go SQLite, and it cross-compiles to any system from any other. The pages are server-rendered Go templates with a little [htmx](https://htmx.org) for interactions. Pushing a version tag builds the release archives for every platform on GitHub Actions.

## Four days, with help

From the first commit to version 0.2.0 took four days, and they were fun ones. I built it with a lot of help from Claude Code, and the commit history says so: those commits carry a co-author line.

## If you want to try it

It's a hobby project, so expect rough edges. Version 0.2.0 is on the [releases page](https://github.com/Sahas001/prashna/releases).

Two things to know. The desktop builds are unsigned, so macOS and Windows will ask before running them the first time. And I've only ever run the desktop app on Linux, so I honestly don't know how it behaves elsewhere. If it breaks for you, tell me.

The code is at [github.com/Sahas001/prashna](https://github.com/Sahas001/prashna). If you do try it, I'd like to hear what you think.
