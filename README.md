# Joon

## Setup

Retrieve from clipboard history by adding an `iCanHazShortcut` for the following command:

```
tail -r ~/.joon-history | grep -v "^$" | uniq | choose -n 25 -s 18 -m | pbcopy
```
