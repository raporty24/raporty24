---
title: "Inwentaryzacja w Excelu: jak porównać stany z kilku spisów"
description: "Zobacz, jak przygotować inwentaryzację w Excelu: osobne spisy z lokalizacji, łączenie danych Power Query, kontrola różnic i opcjonalne skanowanie telefonem."
pubDate: 2026-11-07
author: "Raporty24"
image: "/realizacje/program_magazynowy_excel/9.stany magazynowe.webp"
category: "Logistyka"
tags: ["Inwentaryzacja", "Magazyn", "Excel", "Power Query", "SharePoint", "Automatyzacja"]
---

Inwentaryzacja magazynu to nie tylko policzenie produktów. Trzeba jeszcze porównać wynik z ewidencją, wyjaśnić różnice i zdecydować, które korekty zatwierdzić. W małej firmie można zorganizować ten proces w Excelu — pod warunkiem że wiadomo, kto liczy, gdzie zapisuje pomiar i jak później połączyć spisy.

Nie trzeba od razu kupować systemu WMS. Czasem wystarczy dobrze zaprojektowany skoroszyt. Gdy kilka osób liczy różne strefy, przydają się osobne pliki i Power Query. Jeśli pracownicy mają wprowadzać wyniki do wspólnego rejestru, można rozważyć listę SharePoint. Telefon ze skanerem kodów może ułatwić identyfikację produktu, ale jest tylko jedną z opcji w całym procesie.

## Zacznij od rozdzielenia ewidencji od spisu

Przed liczeniem przygotuj dwa zestawy danych:

1. **Ewidencję na moment rozpoczęcia spisu** — kod produktu, nazwa, jednostka miary, lokalizacja i stan zapisany w magazynie.
2. **Wyniki liczenia** — kod produktu, policzona ilość, lokalizacja, osoba licząca, data oraz oznaczenie spisu lub przeliczenia.

Nie wpisuj wyniku z liczenia bezpośrednio w miejsce stanu ewidencyjnego. Zachowaj obie wartości. Dzięki temu można zobaczyć różnicę, wrócić do pierwotnego pomiaru i ustalić, co zostało zatwierdzone.

Przydatny rejestr spisu może mieć kolumny: `ID spisu`, `lokalizacja`, `kod produktu`, `ilość policzona`, `jednostka`, `osoba`, `data`, `uwagi` i `status weryfikacji`. Kod produktu powinien być stabilnym identyfikatorem — sama nazwa bywa zapisana na kilka sposobów.

## Kilka osób liczy różne lokalizacje? Zapisuj spisy osobno

Jeżeli pracownicy liczą różne strefy lub półki, każdy spis powinien mieć przypisaną lokalizację i ekipę. Można przygotować oddzielne pliki na strefy albo jeden formularz z polem wyboru lokalizacji. Ważne, aby wszystkie spisy miały taki sam układ kolumn i nie nadpisywały ewidencji.

Osobne pliki pomagają rozdzielić pracę, ale wymagają zasad: jak nazywać pliki, gdzie je zapisywać, kto może poprawiać wpisy i jak oznaczyć ponowne liczenie. Jeśli tę samą lokalizację policzono drugi raz, wynik kontrolny powinien być oznaczony jako powtórny pomiar. Nie wolno po prostu dodać go do pierwszego spisu.

## Jak połączyć pliki z inwentaryzacji w Power Query?

Jeśli każdy zespół zapisuje plik o tej samej strukturze, Power Query może wczytać zawartość folderu, połączyć wiersze i odświeżyć zestawienie po dodaniu kolejnych plików. Microsoft opisuje import wielu plików o zgodnym układzie z folderu oraz łączenie ich w jedną tabelę. [Dokumentacja Power Query: import z folderu](https://support.microsoft.com/en-us/excel/import-data-from-a-folder-with-multiple-files-power-query)

Praktyczny przebieg może wyglądać tak:

1. Zapisz ewidencję i szablony spisu w uzgodnionym miejscu.
2. Rozdziel magazyn na lokalizacje i przypisz je osobom liczącym.
3. Zbieraj wyniki w plikach o tych samych nazwach kolumn i typach danych.
4. Wczytaj folder spisów do Power Query i połącz wiersze.
5. Sprawdź puste kody, nieznane produkty, powtórzone wpisy i błędne jednostki.
6. Zestaw sumę zaakceptowanych pomiarów z ewidencją.

Power Query porządkuje i łączy dane, ale samo nie wie, czy dwa wiersze oznaczają dwa różne miejsca, czy przypadkowe ponowne policzenie tej samej półki. Taką regułę trzeba określić w procesie i odzwierciedlić w danych.

## Excel czy wspólna lista SharePoint?

Excel sprawdza się, gdy spisy mają przewidywalny format, liczba osób jest niewielka, a jedna osoba może kontrolować połączenie plików i zatwierdzanie różnic.

Przy równoległym wprowadzaniu danych można rozważyć listę SharePoint lub Microsoft Lists. Każdy pomiar staje się osobnym rekordem z lokalizacją, kodem produktu, ilością i osobą zapisującą. Można też skonfigurować historię wersji, aby sprawdzić zmiany elementu; dostępność i ustawienia zależą od konfiguracji listy. [Microsoft: wprowadzenie do list SharePoint](https://support.microsoft.com/en-us/sharepoint/lists/get-started-with-sharepoint/introduction-to-lists) · [Microsoft: historia wersji list i bibliotek](https://support.microsoft.com/en-us/sharepoint/lists/documents-and-library/how-versioning-works-in-lists-and-libraries)

Lista nie zastępuje projektu procesu. Trzeba ustalić uprawnienia, pola wymagane, sposób obsługi korekty i to, kto zatwierdza wynik. Jeśli pracownicy nie powinni widzieć stanów ewidencyjnych podczas liczenia, dostęp do tych danych trzeba rozdzielić odpowiednio do przyjętej procedury.

## Telefon może pomóc, ale nie musi być potrzebny

Jeśli produkty mają czytelne kody kreskowe, telefon z odpowiednią aplikacją może przyspieszyć wybór produktu i ograniczyć ręczne wpisywanie kodu. Pracownik nadal musi policzyć ilość, wskazać lokalizację i zapisać pomiar. Skaner nie rozstrzyga, czy towar jest uszkodzony, czy został policzony w innym miejscu ani czy rozbieżność można już zatwierdzić.

Można też przeprowadzić spis bez telefonu: wydrukować listy produktów, użyć formularza na komputerze albo przygotować arkusze dla poszczególnych stref. Sposób wprowadzania danych dobiera się do magazynu, etykiet, urządzeń i warunków pracy.

W jednym z przygotowanych rozwiązań dane ze skanowania smartfonem trafiają do plików, są importowane do procesu Excel i mogą zasilać rejestry operacji magazynowych oraz dokumenty. To przykład, jak telefon może być wejściem do uporządkowanego procesu — nie zastępuje ewidencji ani kontroli. [Zobacz realizację narzędzia magazynowego](https://raporty24.pl/realizacje/).

## Jak analizować różnice i zatwierdzać korekty?

Po połączeniu spisów porównaj stan ewidencyjny z zaakceptowaną ilością policzoną. Przykładowy raport może pokazywać:

| Kod | Lokalizacja | Ewidencja | Spis | Różnica | Status |
|---|---|---:|---:|---:|---|
| A-104 | A1 | 18 | 17 | -1 | do sprawdzenia |
| B-220 | B3 | 6 | 8 | +2 | do ponownego liczenia |

Przed korektą sprawdź, czy rozbieżność nie wynika z niezamkniętego przyjęcia lub wydania, przesunięcia między lokalizacjami, błędnego kodu, jednostki miary albo powtórnego wpisu. W razie wątpliwości zleć ponowne liczenie. Dopiero osoba uprawniona zatwierdza wynik i aktualizuje ewidencję zgodnie z procedurą firmy.

Zachowaj stan początkowy, surowe spisy, raport różnic i listę zatwierdzonych korekt. Taki ślad ułatwia późniejsze wyjaśnienie, skąd wziął się nowy stan.

## Kiedy Excel wystarczy, a kiedy szukać systemu?

Excel z Power Query zwykle jest rozsądnym wyborem, gdy proces jest okresowy, źródła danych mają stałą strukturę, a firma potrafi wskazać osobę odpowiedzialną za kontrolę i zatwierdzanie.

Warto sprawdzić aplikację lub system magazynowy, jeśli codziennie rejestrujesz dużo przyjęć, wydań i przesunięć, potrzebujesz bieżących stanów dla wielu osób, uprawnień, pracy offline albo integracji z ERP i sprzedażą. Możliwe jest też podejście mieszane: system lub lista zapisuje operacje, a Excel i Power Query służą do kontroli oraz raportowania.

Najpierw rozpisz proces i policz, gdzie powstają błędy lub ręczna praca. Dopiero potem wybierz narzędzie. Zobacz [rozwiązania dla logistyki i magazynu w Excelu](/uslugi/logistyka-w-excelu/) oraz artykuł o tym, [jak zorganizować magazyn w Excelu dla kilku osób](/blog/magazyn-w-excelu-dla-kilku-osob/).
