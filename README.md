# Joon

By default `joon` will capture textual clipboard content which includes a URL to `~/.joon-history`.

## Retrieval

Install `choose` and `icanhazshortcut`:

```
brew install icanhazshortcut
brew install choose-gui
```

Retrieve from clipboard history by adding an `iCanHazShortcut` for the following command:

```
tail -r ~/.joon-history | grep -v "^$" | uniq | choose -n 25 -s 18 -m | pbcopy
```
