# Fieldwork – a projekt megértése

## Miért ez a projekt?

Egy fiktív, Bath környékén működő kerttervező stúdió weboldala. A látogató megnézi a referenciajellegű kerteket, kiválasztja a szolgáltatást, majd összerak egy ajánlatkérést. Ez olyan ügyfélfolyamat, amely kisebb vállalkozásoknál is gyakori. A feladat túlmutat egy landing page-en, de adatbázis és bejelentkezés nélkül is áttekinthető.

A vállalkozás, Eleanor Reed tervező, a projektnevek, a helyszín-hozzárendelések, a méretek, az évszámok, az árak és az ajánlás kitaláltak. A fotók jogszerűen felhasználható stockképek. Nem az itt leírt fiktív munkákat dokumentálják.

## Architektúra és fájlok

Ez hagyományos többoldalas oldal: minden képernyőhöz saját HTML-fájl tartozik. Az `index.html` a főoldal, a `gardens.html` a galéria. A négy kertnek és a három szolgáltatásnak külön részletoldala van. Az `about.html`, `faq.html`, `contact.html`, `credits.html` és `404.html` egészíti ki őket.

A `dist` itt nem törölhető buildmappa: ebben találod a szerkesztendő, kész weboldalt. Nincs fordítás, csomagtelepítés vagy framework. A böngésző közvetlenül olvassa a HTML-t, CSS-t és JavaScriptet.

A fejléc és lábléc minden HTML-ben szerepel. Ez ismétlődő kód, de cserébe JavaScript nélkül is azonnal megjelenik. Ha menüpontot változtatsz, minden fájlban módosítani kell. Nagyobb projektben sablonrendszerre váltanék; itt a kezdők számára átlátható működés az elsődleges.

## HTML-szerkezet

Minden oldalon egy fő `h1`, szemantikus `header`, `nav`, `main` és `footer` található. A `Skip to content` link billentyűzettel átugorja az ismétlődő navigációt. A szolgáltatások és projektek valódi `<a>` elemek: új lapon is megnyithatók. A szűrés és menüváltás `<button>`, mert ezek az aktuális oldalon állapotot változtatnak.

A fejlécben az `aria-current="page"` jelzi az aktív szekciót. A projektoldalakon az „Our gardens” marad aktív, így a látogató tudja, hová tartozik az oldal.

## CSS felépítése

A `styles.css` elején a `:root` változói tartalmazzák a színeket és betűcsaládokat. A sötétzöld szöveg, világos háttér, visszafogott vonalak és Georgia címsorok adják az egységes arculatot. Rendszerbetűket használunk, ezért külső fontbetöltés sem kell.

A `.wrap` korlátozza a tartalom maximális szélességét, és oldalt helyet hagy. A `.hero`, `.split`, `.projects-grid` és `.form-grid` CSS Grid segítségével rendezik az elemeket. A `.button`, `.project-card` és `.field` újrahasználható megjelenési szabályok, nem React-komponensek.

A médiafeltételek 1000, 760 és 440 pixel körül módosítják a szerkezetet. Mobilon a képes oszlopok egymás alá kerülnek, a navigáció nyithatóvá válik, majd a form és a galéria is egy oszlopra vált. A `clamp()` folytonosan skálázza a címeket. A képek `max-width:100%` értéke és a rácselemek `min-width:0` szabálya segít elkerülni a kilógást. Tényleges mobilos renderelést ebben a környezetben nem tudtunk ellenőrizni; ne tekintsd ezt mért garanciának.

## Mobilmenü: main.js

A gomb kattintásra váltja az `aria-expanded` értékét és a navigáció `open` osztályát. A CSS ez alapján nyitja vagy zárja a listát. A `closeMenu()` egy helyre fogja össze a bezárást. Escape után a fókusz a menügombra kerül. Desktopméretre váltva a nyitott állapot törlődik.

A HTML elején egy rövid script beállítja a `js` osztályt. Így csak JavaScript mellett rejtjük el a mobilmenüt; nélküle a linkek láthatók maradnak. Ez a fokozatos továbbfejlesztés egyik példája.

## Galériaszűrés: gallery.js

A gombok `data-filter` attribútumában a kívánt kategória szerepel. A projektkártyák `data-category` értéke mutatja, melyik csoportba tartoznak. Kattintáskor a script összehasonlítja ezeket, és a nem illő kártyákon beállítja a `hidden` tulajdonságot.

A gombok `aria-pressed` állapota és a `role="status"` találatszám is frissül. A rejtett kártyák linkjei nem maradnak a tabulátoros sorrendben. Az „All gardens” visszaállítja mind a négyet.

## Képnagyító

A projektoldal képe egy gombban van. A script a natív `<dialog>` elem képét és leírását tölti ki, majd `showModal()` segítségével megnyitja. A böngésző kezeli a modális fókuszt és az Escape-et. Bezáráskor visszaadjuk a fókuszt annak a gombnak, amelyik megnyitotta. Nem kellett ehhez külön modalcsomag.

## Űrlap: contact.js

Minden mezőnek látható címkéje van. A `rules` objektum mezőnként ad egy ellenőrző függvényt: például a név nem lehet egybetűs, az emailnek emailalakúnak kell lennie, a leírás legalább 20 karakter.

A `validateField()` megkeresi a mezőt, lefuttatja a szabályt, megjeleníti az üzenetet és frissíti az `aria-invalid` értéket. Az `aria-describedby` kapcsolja össze a mezőt és a hibát. Beküldéskor mindegyik mezőt ellenőrizzük, és az első hibás mező kap fókuszt.

Siker esetén `FormData` gyűjti össze az értékeket. A felhasználó szövege `textContent` segítségével jelenik meg, ezért a beírt HTML nem fut le kódként. Egy `Blob` és `URL.createObjectURL()` letölthető szövegfájlt készít. Az előző objektum-URL-t visszavonjuk, hogy ne maradjon fölöslegesen a memóriában. Adatot nem küldünk szerverre és nem írunk localStorage-ba.

A szolgáltatásoldal például `contact.html?service=planting-design` címre vezet. A `URLSearchParams` kiolvassa a paramétert, de csak a három ismert kulcsot fogadjuk el. Az ismeretlen érték nem változtat a formon.

A beküldőgomb kezdetben tiltott. A működő JavaScript engedélyezi, így script nélkül a form nem helyezi a személyes adatokat egy véletlen GET-kérés URL-jébe.

## Routing és telepítés

Nincs kliensoldali router. A böngésző új HTML-fájlt kér, amikor linkre kattintasz. Ezért egy részletoldal frissítése nem igényel SPA-visszairányítást. A linkek és képek relatívak, így a GitHub Pages `/fieldwork-gardens/` alkönyvtárából is működnek.

A 404-es oldal külön eset: hibás, akár többszintű URL-ről is betöltődhet. A GitHub workflow ezért beállítja a `<base>` értékét a repository alapútvonalára. A normál oldalak nem használnak base elemet.

## Képek és mozgás

Öt stockfotó van, mindegyikhez egy nagy és egy kisebb WebP. A `srcset` közli a valódi képszélességeket; a `sizes` segít a böngészőnek választani. A fő kép gyors betöltési prioritást kap. A lejjebb elhelyezett képek `loading="lazy"` attribútumot használnak.

A HTML `width` és `height` attribútuma előre jelzi az oldalarányt. A CSS `object-fit:cover` képes levágni a széleket, hogy a kép kitöltse a kijelölt területet. A valódi nagy képet a modalban lehet megnézni. A pontos forrásokat és méreteket az `IMAGES.md` sorolja fel.

Az animáció rövid hover és szekció-megjelenés. Az `IntersectionObserver` jelzi, amikor egy kijelölt szekció láthatóvá válik. A tartalom alapból látszik, így scriptprobléma sem teszi üressé az oldalt. A `prefers-reduced-motion` kikapcsolja a mozgást az ezt kérő látogatóknál.

## Tíz interjúkérdés

1. **Miért nem React?** Értsd meg a tartalomközpontú statikus oldal előnyeit: kevés állapot, közvetlen fájlkiszolgálás, nulla függőség. A React akkor lenne indokoltabb, ha sok közös, adatvezérelt nézet és összetett állapot lenne.
2. **Mi az ára a külön HTML-oldalaknak?** A fejléc ismétlődik, ezért több helyen kell karbantartani. Beszélj arról, mikor vezetnél be sablonokat.
3. **Hogyan működik a mobilmenü?** Tudd követni a kattintástól az `aria-expanded` és az `open` osztály változásáig vezető folyamatot, valamint az Escape kezelését.
4. **Mitől reszponzív az oldal?** Ne csak azt mondd, hogy media query: mutasd meg a rácsok oszlopszámának változását, a fluid méreteket és a mobilra átrendezett navigációt.
5. **Hogyan működik a szűrés?** Magyarázd el a data attribútumokat, a `hidden` állapotot és a találatszám frissítését. Nincs új hálózati kérés.
6. **Miért nem biztonsági védelem az űrlapellenőrzés?** A böngészős szabály megkerülhető. Valódi szerveroldali feldolgozásnál újra ellenőrizni kell az adatokat, és kezelni a túl sok kérést, hibákat, adatmegőrzést.
7. **Mitől biztonságosabb a textContent?** A beírt szöveget nem HTML-ként értelmezi. Értsd meg az `innerHTML` különbségét és a felhasználói bevitel kockázatát.
8. **Hogyan gyorsítanád a képeket?** Magyarázd el a WebP-t, srcsetet, lazy loadingot és a képméreteket. Következő lépésként mérés alapján pontosítanád a sizes értékeket és a tömörítést.
9. **Miért működik az oldalfrissítés GitHub Pagesen?** Minden megcélzott `.html` fájl ténylegesen létezik. Nincs kliensoldali útvonal, amelyet a szerver ne ismerne.
10. **Mit csinálnál éles ügyfélnél másként?** Valódi, jóváhagyott tartalom; valódi endpoint; szerveroldali validálás; böngészős és mobilos tesztek; adatkezelési tájékoztatás az alkalmazott szolgáltatások alapján; mérhető teljesítményellenőrzés.

## Hogyan legyen belőle saját, érthető portfóliómunka?

Először olvasd végig a form és a galéria kódját, majd változtass meg egy-egy szabályt. Készíts egy ötödik projektoldalt, adj hozzá kategóriát, és vezess be egy saját, indokolt elrendezést. A tényleges változtatásokat commitold. Interjún azt mutasd meg, amit átlátsz, és pontosan mondd el, mely részeket készítetted vagy alakítottad át te.
