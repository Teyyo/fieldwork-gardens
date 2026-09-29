# Feltöltés GitHubra – lépésről lépésre

## Repository

- Név és helyi mappanév: `fieldwork-gardens`
- Leírás: `Responsive multi-page garden studio website built with HTML, CSS and vanilla JavaScript.`
- Láthatóság: **Public**, hogy munkára jelentkezéskor meg lehessen nézni.
- Topics: `html`, `css`, `javascript`, `responsive-design`, `accessibility`, `small-business`, `portfolio-project`, `github-pages`

A ZIP-et csomagold ki. A projekt gyökerében a README, a dist, docs és scripts mappák legyenek. A ZIP nem tartalmazza a Sites belső git-előzményeit: így a saját munkád követhető, külön repositoryt indíthatsz.

## 1. Helyi ellenőrzés

Telepített Git és Python 3 szükséges a lenti parancsokhoz. Nyisd meg a terminált a projekt gyökerében:

```sh
cd fieldwork-gardens
python -m http.server 8080 --directory dist
```

Windows alatt `py -m http.server 8080 --directory dist` is használható. Nyisd meg a `http://localhost:8080` címet. Ctrl+C állítja le. A `dist/index.html` közvetlenül is megnyitható.

## 2. Git beállítása

A következő két parancsban a saját neved és GitHubhoz használt emailed szerepeljen. Privát emailhez a GitHub Settings → Emails alatt található noreply címet is használhatod. Ezek helyi repository-beállítások.

```sh
git init
git branch -M main
git config user.name "SAJAT NEVED"
git config user.email "SAJAT EMAIL CIMED"
git status
git add .
git diff --cached --stat
git commit -m "chore: add reviewed Fieldwork project baseline"
```

A `.gitignore` már benne van. A `dist/` direkt nincs kizárva: ebben van a teljes forrás. `.env`, editorfájlok, naplók és függőségmappák nem kerülnek a repóba.

## 3. Üres GitHub repository létrehozása

1. Jelentkezz be a GitHubra, válaszd a **New repository** lehetőséget.
2. Név: `fieldwork-gardens`; válaszd a **Public** opciót.
3. Ne adj hozzá új README-t, .gitignore-t vagy licencet az oldalon: a helyi projekt már tartalmazza a szükséges alapfájlokat.
4. Hozd létre a repót, és másold ki a HTTPS URL-jét.

A következő parancsban `SAJAT-FELHASZNALONEV` helyére a GitHub-felhasználóneved kerül:

```sh
git remote add origin https://github.com/SAJAT-FELHASZNALONEV/fieldwork-gardens.git
git push -u origin main
```

Az első pushnál jelentkezz be a Git által megnyitott böngészőben vagy az általad beállított hitelesítési móddal. Ne írj tokent a kódba vagy a remote URL-be. A feltöltést innen nem végeztük el a GitHub-fiókodban.

## 4. Következő valódi változtatás

Példa: átírod a főoldal szövegét, és módosítod a térközöket.

```sh
git status
git diff
git add dist/index.html dist/assets/css/styles.css
git diff --cached
git commit -m "style: refine homepage spacing and introduction"
git push
```

A `git add` kijelöli a következő mentésbe kerülő változásokat. A `commit` helyi verziót készít, a `push` feltölti. A `git log --oneline` mutatja a tényleges előzményeket.

## Értelmes fejlesztési szakaszok

A kapott kész projektet egy induló commitban vedd fel. A következő példák akkor használhatók, amikor ténylegesen az adott részt építed újra, módosítod vagy javítod; ne oszd visszamenőleg mesterséges történetté a kész munkát.

| Tényleges munka | Lehetséges commitüzenet |
|---|---|
| Saját alapok és projektleírás kialakítása | `chore: establish project structure and content plan` |
| Arculati változók és globális elrendezés módosítása | `style: define garden studio typography and colors` |
| Mobilnavigáció átdolgozása | `feat: improve responsive navigation` |
| Saját főoldalszakasz készítése | `feat: add a seasonal garden introduction` |
| Szolgáltatás részleteinek bővítése | `content: clarify planting design deliverables` |
| Új kert hozzáadása | `feat: add an urban terrace case study` |
| Új kategória és szűrés | `feat: add terrace garden filtering` |
| Form új mezővel, megfelelő validálással | `feat: capture preferred project timing` |
| Mobilos probléma valódi javítása | `fix: prevent narrow-screen gallery overflow` |
| Billentyűzetes működés javítása | `fix: restore focus after closing garden dialog` |
| Saját fotók és méretek optimalizálása | `perf: optimize project image variants` |
| Dokumentáció és képernyőképek frissítése | `docs: add verified screenshots and setup notes` |

A sorrend a te munkádhoz igazodjon. Nincs szükség hamis időbélyegre vagy mesterséges commitmennyiségre.

## Élesítés

Kövesd a `DEPLOYMENT.md` útmutatóját. Miután a saját GitHub Pages URL-ed működik, tedd a README Live demo részébe és a repository About → Website mezőjébe.
