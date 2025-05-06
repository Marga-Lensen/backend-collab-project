Wenn du den neuen Branch `marga` gerade erst erstellt hast mit:

```bash
git checkout -b marga
```

////////////////////
git add .

git commit -m "sinnvolle Nachricht"
/////////////////////

dann musst du beim **ersten Push** angeben, wo der Branch hingehen soll (Remote-Tracking-Branch anlegen). Dafür verwendest du:

```bash
git push -u origin marga
```

🔹 **Erklärung:**

* `-u` (bzw. `--set-upstream`) sagt Git: *"Merke dir, dass dieser lokale Branch mit `origin/marga` verknüpft ist."*
* Danach genügt bei späteren Pushes oder Pulls einfach `git push` oder `git pull`.

### Danach:

Wenn du den Branch einmal so gepusht hast, kannst du künftig einfach schreiben:

```bash
git push
```

Möchtest du den Push jetzt machen?
