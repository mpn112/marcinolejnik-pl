# marcinolejnik.pl

Lekka strona usługowa Marcina Olejnika, przygotowana do publikacji przez
GitHub i Azure Static Web Apps.

## Technologia

Projekt korzysta z czystego HTML, CSS i JavaScriptu. Nie używa Vite, frameworka
ani zewnętrznych zależności, dlatego nie wymaga instalacji pakietów ani procesu
budowania. Gotową wersją strony jest bezpośrednio zawartość głównego folderu
projektu.

## Uruchomienie lokalne

W głównym folderze projektu uruchom:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Następnie otwórz:

```text
http://127.0.0.1:4173/
```

## Budowanie

Komenda budowania: brak — projekt jest gotową stroną statyczną.

Folder wynikowy: `/` (główny folder repozytorium).

## Ustawienia Azure Static Web Apps

Podczas tworzenia aplikacji wybierz ustawienia:

- Build preset: `Custom`
- App location: `/`
- Api location: pozostaw puste
- Output location: pozostaw puste

Plik `staticwebapp.config.json` zawiera nagłówki bezpieczeństwa dla Azure
Static Web Apps. Strona używa odnośników do sekcji (`#uslugi`, `#automatyka`),
a nie routingu SPA, dlatego nie potrzebuje reguły `navigationFallback`.

## Struktura

- `index.html` — treść i struktura strony
- `style.css` — wygląd i układ responsywny
- `script.js` — interakcje, menu mobilne i animowany tekst
- `staticwebapp.config.json` — konfiguracja Azure Static Web Apps
- `robots.txt` i `sitemap.xml` — podstawowa konfiguracja dla wyszukiwarek
