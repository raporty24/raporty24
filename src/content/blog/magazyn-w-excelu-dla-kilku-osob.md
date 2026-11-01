---
title: "Magazyn w Excelu dla kilku osób – wspólny plik i automatyzacja"
description: "Jak zorganizować magazyn w Excelu dla kilku osób? Wspólny plik, folder sieciowy, Power Query, OneDrive, SharePoint, Microsoft Lists i API – praktycznie."
pubDate: 2026-10-07
author: "Raporty24"
image: "/biuro3.webp"
category: "Automatyzacja"
tags: ["Excel", "Magazyn", "Power Query", "SharePoint", "Microsoft Lists", "Automatyzacja", "Logistyka"]
---

Magazyn w Excelu często zaczyna się bardzo niewinnie.

Jedna osoba prowadzi jeden plik. W pierwszej kolumnie jest kod produktu, dalej stan, dostawy, wydania i kilka formuł. Dopóki arkusz obsługuje jedna osoba, a dane pochodzą z jednego miejsca, takie rozwiązanie może działać bardzo dobrze.

Problem pojawia się później.

Do pliku zaczynają zaglądać kolejne osoby. Zamówienia przychodzą ze sklepu internetowego, dostawy z innego arkusza, magazyn aktualizuje wydania, handlowcy potrzebują aktualnych stanów, a właściciel chce raport sprzedaży, kosztów i marży.

Wtedy pytanie przestaje brzmieć:

> **Jak zrobić magazyn w Excelu?**

Znacznie ważniejsze staje się:

> **Jak zorganizować dane i cały proces, aby kilka osób mogło pracować na tych samych informacjach bez tworzenia kolejnych kopii Excela?**

I właśnie od tego warto rozpocząć projektowanie magazynu.

---

## Nie zaczynaj od arkusza. Zacznij od przepływu danych

Jednym z najczęstszych błędów jest próba umieszczenia wszystkiego w jednym dużym pliku Excel.

W takim skoroszycie znajdują się jednocześnie:

- stany magazynowe,
- przyjęcia,
- wydania,
- zamówienia,
- ceny,
- dane klientów,
- raporty,
- formuły,
- tabele przestawne,
- importy danych,
- czasem również makra.

Na początku jest wygodnie.

Później zaczynają pojawiać się problemy:

- ktoś usuwa formułę,
- ktoś nadpisuje stan ręcznie,
- dwie osoby pracują na różnych kopiach,
- raport korzysta ze starego pliku,
- połączenie działa tylko na jednym komputerze,
- ktoś przesuwa kolumnę i przestaje działać import,
- powstają pliki `magazyn_final.xlsx`, `magazyn_final2.xlsx` i `magazyn_NOWY_poprawiony.xlsx`.

Dobrze zaprojektowany proces powinien rozdzielać przynajmniej cztery warstwy:

```text
ŹRÓDŁA DANYCH
      ↓
REJESTR / BAZA
      ↓
PRZETWARZANIE
      ↓
RAPORT / INTERFEJS
```

Przykładowo:

```text
WooCommerce ──────┐
                  │
CSV od kuriera ───┤
                  │
Pliki dostaw ─────┼──→ Power Query / API ──→ dane magazynowe
                  │                              ↓
Skaner kodów ─────┘                       Excel / Power BI
```

Excel nadal może być bardzo ważnym elementem całego rozwiązania.

Nie musi jednak przechowywać wszystkiego w jednym skoroszycie.

---

## Jedno źródło prawdy jest ważniejsze niż jeden plik

Firmy często mówią:

> „Chcemy mieć wszystko w jednym Excelu.”

W praktyce ważniejsze jest:

> **Chcemy mieć jedną prawdziwą wersję danych.**

To nie musi oznaczać jednego pliku.

Może istnieć:

- jeden rejestr ruchów magazynowych,
- osobna kartoteka produktów,
- osobny folder importów,
- raport Excel,
- dashboard Power BI,
- formularz dla pracowników.

Kluczowe jest to, aby wszystkie te elementy korzystały z tego samego źródła.

W przeciwnym razie bardzo łatwo dojść do sytuacji:

```text
Magazyn mówi:       115 szt.
Sprzedaż mówi:      108 szt.
Excel kierownika:   121 szt.
```

Technicznie firma ma wtedy trzy pliki.

Biznesowo ma **trzy różne prawdy**.

---

## Stan magazynowy nie powinien być jedną ręcznie zmienianą liczbą

Wyobraźmy sobie produkt:

```text
SKU: ABC-123
Stan: 47 szt.
```

Pracownik A wydaje 5 sztuk.

W tym samym czasie pracownik B przyjmuje dostawę 20 sztuk.

Jeżeli obaj po prostu zmieniają komórkę `Stan`, bardzo łatwo o błąd.

Znacznie lepszym rozwiązaniem jest **rejestr ruchów magazynowych**.

Przykład:

| Data | Operacja | SKU | Ilość | Dokument | Użytkownik |
|---|---|---|---:|---|---|
| 07.10.2026 08:10 | Przyjęcie | ABC-123 | +20 | PZ/104 | Anna |
| 07.10.2026 08:14 | Wydanie | ABC-123 | -5 | WZ/445 | Piotr |
| 07.10.2026 09:02 | Korekta | ABC-123 | -1 | KOR/12 | Anna |

Stan nie jest wtedy wpisywany ręcznie.

Jest wynikiem operacji:

```text
stan początkowy
+ przyjęcia
- wydania
+/- korekty
= aktualny stan
```

Dzięki temu:

- wiadomo, skąd wzięła się każda zmiana,
- można odtworzyć historię produktu,
- łatwiej znaleźć pomyłkę,
- można analizować ruch magazynowy,
- można sprawdzić kto i kiedy wykonał operację,
- kilku użytkowników nie musi nadpisywać jednej wartości.

To jedna z najważniejszych różnic pomiędzy **arkuszem ze stanami** a **procesem magazynowym**.

---

## Czy kilka osób może pracować jednocześnie w jednym Excelu?

Tak, ale dużo zależy od tego, **gdzie znajduje się plik** i w jaki sposób użytkownicy z niego korzystają.

Trzeba rozróżnić kilka modeli.

---

## 1. Excel na wspólnym folderze sieciowym

W wielu firmach funkcjonuje rozwiązanie:

```text
Z:\Magazyn\magazyn.xlsx
```

Każdy komputer ma dostęp do wspólnego folderu i pracownicy otwierają ten sam plik.

Takie rozwiązanie może wystarczyć, jeśli:

- użytkowników jest niewielu,
- plik nie jest cały czas intensywnie edytowany,
- firma pracuje głównie w jednej lokalizacji,
- istnieje stabilna sieć lokalna,
- Excel pełni bardziej funkcję raportu niż wieloużytkownikowej bazy.

Problemy zaczynają się wtedy, gdy wiele osób chce jednocześnie zapisywać zmiany albo plik zawiera dużo automatyzacji.

Wtedy mogą pojawić się:

- blokowanie pliku,
- otwieranie tylko do odczytu,
- konflikty wersji,
- problemy z zapisem,
- różne kopie tego samego dokumentu.

---

## Zmapowany dysk `Z:` może być problemem dla automatyzacji

Dla użytkownika:

```text
Z:\Magazyn\
```

jest po prostu folderem.

Technicznie litera `Z:` jest jednak lokalnym mapowaniem.

Na jednym komputerze może być:

```text
Z:\Magazyn\dane.xlsx
```

a na drugim:

```text
M:\Magazyn\dane.xlsx
```

Człowiek wie, że to ten sam katalog.

Excel, Power Query albo przygotowany skrypt mogą tego już nie wiedzieć.

Dlatego przy rozwiązaniach działających w sieci lokalnej warto rozważyć korzystanie z rzeczywistej ścieżki sieciowej:

```text
\\SERWER\Magazyn\dane.xlsx
```

zamiast:

```text
Z:\Magazyn\dane.xlsx
```

Jeżeli wszystkie komputery mają dostęp do danego zasobu, taka ścieżka nie zależy od litery przypisanej na konkretnym stanowisku.

### Ale to nie rozwiązuje wszystkiego

Komputer nadal musi mieć dostęp do firmowego serwera.

Jeżeli pracownik pracuje z domu albo zabiera laptop poza firmę, może być potrzebny np.:

- VPN,
- zdalny dostęp do sieci,
- inne rozwiązanie infrastrukturalne.

Dlatego przed budową automatyzacji warto odpowiedzieć nie tylko na pytanie:

> „Gdzie znajduje się plik?”

ale również:

> **„Z jakich komputerów i lokalizacji rozwiązanie ma działać?”**

---

## 2. OneDrive lub SharePoint – gdy kilka osób ma pracować na jednym pliku

Jeżeli firma korzysta z Microsoft 365, skoroszyt może być przechowywany w:

- OneDrive for Business,
- bibliotece dokumentów SharePoint.

W takim modelu kilka osób może współpracować na jednym skoroszycie, zamiast przesyłać sobie jego kolejne wersje.

To zwykle znacznie lepsze rozwiązanie niż:

```text
magazyn.xlsx
magazyn_poprawiony.xlsx
magazyn_final.xlsx
magazyn_final_ostateczny.xlsx
```

Ale bardzo ważna jest jedna rzecz:

> **To, że kilka osób może jednocześnie otwierać Excela, nie oznacza jeszcze, że Excel jest najlepszą bazą dla całego procesu magazynowego.**

Jeżeli użytkownicy przede wszystkim przeglądają dane albo wykonują niewielką liczbę zmian, wspólny Excel może być wystarczający.

Jeżeli jednak kilkanaście osób cały dzień dodaje operacje, statusy, dokumenty i zmienia rekordy, warto pomyśleć o innym modelu przechowywania danych.

---

## OneDrive też może sprawić problem, jeżeli użyjemy lokalnej ścieżki

Załóżmy, że plik zsynchronizowany przez OneDrive znajduje się na komputerze Jana tutaj:

```text
C:\Users\Jan\OneDrive - Firma\Magazyn\dane.xlsx
```

Na komputerze Anny może być:

```text
C:\Users\Anna\OneDrive - Firma\Magazyn\dane.xlsx
```

Jeżeli Power Query, makro albo skrypt wskazuje na sztywno:

```text
C:\Users\Jan\...
```

rozwiązanie może działać tylko u Jana.

To bardzo częsty problem w automatyzacjach przygotowywanych początkowo dla jednego użytkownika, które później mają zostać udostępnione całemu zespołowi.

Jeżeli projekt ma działać na wielu komputerach, sposób dostępu do danych trzeba zaplanować od początku.

---

## 3. Power Query z folderu – prosty sposób na automatyzację wielu plików

Nie każdy magazyn potrzebuje API albo własnej aplikacji.

Bardzo często ogromną część ręcznej pracy można usunąć dzięki rozwiązaniu:

> **folder z plikami + Power Query**

Załóżmy, że każdego dnia system sprzedażowy generuje:

```text
zamowienia_2026-10-05.csv
zamowienia_2026-10-06.csv
zamowienia_2026-10-07.csv
```

Przy pracy ręcznej użytkownik:

1. otwiera pliki,
2. kopiuje dane,
3. wkleja je do Excela,
4. poprawia format,
5. usuwa niepotrzebne kolumny,
6. aktualizuje tabelę przestawną,
7. sprawdza, czy niczego nie pominął.

Można to zorganizować inaczej:

```text
          FOLDER Z PLIKAMI
                 │
        ┌────────┼────────┐
        │        │        │
     CSV 1     CSV 2    CSV 3
        │        │        │
        └────────┼────────┘
                 ↓
           POWER QUERY
                 ↓
       CZYSZCZENIE DANYCH
                 ↓
           JEDNA TABELA
                 ↓
        RAPORT / MAGAZYN
```

Użytkownik dodaje kolejny plik do katalogu.

Po odświeżeniu dane są automatycznie pobierane i przetwarzane według tych samych reguł.

To może działać dla:

- zamówień,
- dostaw,
- eksportów z systemu magazynowego,
- raportów kurierów,
- zestawień sprzedaży,
- plików ze skanera,
- CSV ze sklepu internetowego.

---

## Struktura plików musi być przewidywalna

Automatyzacja nie oznacza, że można wrzucać do folderu dowolne pliki o dowolnej strukturze.

Jeżeli wczoraj dane wyglądały tak:

```text
SKU | ilość | cena
```

a dziś:

```text
kod produktu | liczba sztuk | cena netto | magazyn
```

Power Query musi dostać dodatkowe reguły obsługi takich zmian.

Im bardziej przewidywalne źródło, tym bardziej stabilna automatyzacja.

Dlatego przed wdrożeniem warto ustalić m.in.:

- nazwy kolumn,
- format dat,
- format kodów produktów,
- sposób zapisu ilości,
- walutę,
- sposób oznaczania magazynu,
- nazewnictwo plików.

---

## Folder magazynowy też powinien mieć strukturę

Zamiast wrzucać wszystko do:

```text
Magazyn\
```

lepiej przygotować logiczny podział:

```text
Magazyn\
│
├── 01_WEJSCIE\
│   ├── zamowienia\
│   ├── dostawy\
│   └── skany\
│
├── 02_SLOWNIKI\
│   ├── produkty.xlsx
│   └── kontrahenci.xlsx
│
├── 03_ARCHIWUM\
│
└── 04_RAPORTY\
    └── raport_magazyn.xlsx
```

Dzięki temu:

- wiadomo, gdzie trafiają nowe pliki,
- raport nie miesza się ze źródłami,
- łatwiej zbudować Power Query,
- łatwiej archiwizować dane,
- użytkownicy wiedzą, gdzie powinni zapisywać dokumenty,
- można ograniczyć uprawnienia do poszczególnych folderów.

To niewielka decyzja organizacyjna, która może bardzo ułatwić późniejsze utrzymanie systemu.

---

## Nie każdy pracownik powinien edytować główny plik

To kolejny często pomijany temat.

Jeżeli firma ma 10 pracowników, nie oznacza to automatycznie, że każdy powinien dostać pełny dostęp do:

```text
magazyn.xlsx
```

Poszczególne osoby mogą mieć zupełnie różne potrzeby.

Przykład:

```text
MAGAZYNIER
    ↓
rejestruje przyjęcie lub wydanie

HANDLOWIEC
    ↓
sprawdza aktualny stan

KSIĘGOWOŚĆ
    ↓
pobiera zestawienie dokumentów

KIEROWNIK
    ↓
analizuje stany i obrót
```

Magazynier nie musi edytować raportów.

Handlowiec nie musi poprawiać historii ruchów.

Kierownik nie musi wpisywać dokumentów WZ.

Księgowość może potrzebować tylko gotowego zestawienia.

Dobry system rozdziela te role.

---

## Kiedy Microsoft Lists lub SharePoint są lepsze niż wspólny Excel?

Jeżeli wiele osób przede wszystkim **dodaje kolejne operacje**, bardzo dobrym rozwiązaniem może być Microsoft Lists lub lista SharePoint.

Przykład danych:

| Data | SKU | Operacja | Ilość | Dokument | Osoba |
|---|---|---|---:|---|---|
| 07.10.2026 | A100 | Wydanie | -2 | WZ/33 | Piotr |
| 07.10.2026 | B220 | Przyjęcie | +15 | PZ/18 | Anna |

Pracownik może dodać operację przez formularz.

Nie musi otwierać głównego arkusza.

Dane są przechowywane w jednym miejscu, a Excel może później jedynie je pobierać.

Schemat:

```text
PRACOWNICY
     ↓
Microsoft Lists / SharePoint
     ↓
wspólne źródło danych
     ↓
Power Query
     ↓
┌───────────────┬───────────────┐
│               │               │
Excel        Power BI       zestawienia
```

To podejście szczególnie dobrze sprawdza się, gdy firma już korzysta z Microsoft 365.

Podobny model opisaliśmy w naszym przykładzie [ewidencji wydań w Microsoft Lists i SharePoint](/blog/excel-sharepoint-automatyzacja/).

---

## Excel może być raportem, a nie bazą

To ważna zmiana sposobu myślenia.

W wielu rozwiązaniach użytkownik nadal korzysta z Excela, ale dane nie są przechowywane bezpośrednio w nim.

Przykład:

```text
Pracownicy
     ↓
SharePoint / Lists
     ↓
Power Query
     ↓
Excel
```

Excel może wtedy odpowiadać za:

- tabele przestawne,
- raport,
- analizę stanów,
- controlling,
- wyszukiwarkę,
- wydruk,
- kalkulacje.

A wspólna lista lub baza odpowiada za przechowywanie danych.

To często jest stabilniejsze niż próba zrobienia wszystkiego w jednym skoroszycie.

---

## Excel Online i Excel na komputerze to nie zawsze to samo

Przy rozwiązaniach dla kilku użytkowników trzeba ustalić również, **gdzie plik będzie otwierany**.

Może to być:

- Excel dla Windows,
- Excel dla macOS,
- Excel w przeglądarce.

Nie wszystkie funkcje zachowują się identycznie.

Szczególnie ważne są makra VBA.

Jeżeli rozwiązanie opiera się np. na przycisku:

> „Generuj dokument WZ”

napisanym w VBA, użytkownik może potrzebować klasycznej aplikacji Excel na komputerze.

Dlatego nie wystarczy zapytać:

> „Czy firma ma Excela?”

Trzeba zapytać:

> **„W jakim Excelu i na jakich urządzeniach użytkownicy będą pracować?”**

---

## 4. Sklep internetowy, ERP lub BaseLinker – kiedy warto użyć API?

Załóżmy, że firma posiada już:

- WooCommerce,
- platformę sprzedażową,
- ERP,
- CRM,
- system magazynowy,
- platformę kurierską.

Dane już istnieją.

Mimo to pracownik codziennie:

1. loguje się do systemu,
2. eksportuje CSV,
3. zapisuje plik,
4. otwiera Excel,
5. kopiuje dane,
6. aktualizuje magazyn.

Jeżeli system posiada odpowiednie API, część tego procesu może odbywać się automatycznie.

Przykład:

```text
WooCommerce
     ↓
     API
     ↓
zamówienia
     ↓
logika magazynowa
     ↓
┌────────────┬────────────┐
│            │            │
Excel     raport       aktualizacja
          marży          danych
```

Excel może nadal pozostać narzędziem użytkownika.

Różnica polega na tym, że człowiek nie musi ręcznie przenosić danych między systemami.

Więcej o takich rozwiązaniach opisujemy na stronie [integracje API i systemów](/uslugi/integracje-api/).

---

## API nie zawsze jest najlepszym rozwiązaniem

Warto również podkreślić drugą stronę.

Nie każdy proces trzeba od razu integrować przez API.

Jeżeli firma raz dziennie otrzymuje jeden poprawny plik CSV, a cały import Power Query trwa kilka sekund, budowa pełnej integracji API może nie przynieść wystarczającej korzyści.

Dlatego rozwiązania warto dobierać stopniowo:

```text
RĘCZNE KOPIOWANIE
        ↓
Power Query / folder
        ↓
SharePoint / Lists
        ↓
API
        ↓
aplikacja / baza danych
```

Nie każda firma musi przechodzić przez wszystkie etapy.

Najlepszym rozwiązaniem jest zwykle **najprostsza architektura, która stabilnie obsługuje realny proces firmy**.

---

## Przykład: magazyn, prognoza sprzedaży, dostawy i rzeczywiste zamówienia

Typowy problem wygląda tak:

Firma posiada:

- aktualny stan magazynowy,
- prognozę sprzedaży,
- zaplanowane dostawy,
- faktyczne zamówienia klientów.

Jeżeli na konkretny dzień nie ma jeszcze zamówień, system powinien wykorzystać prognozę.

Jeżeli zamówienia już się pojawiły, trzeba odpowiednio uwzględnić dane rzeczywiste.

Schemat może wyglądać tak:

```text
STAN MAGAZYNOWY
       │
       ├────→ DOSTAWY
       │
       ├────→ PROGNOZA
       │
       └────→ REALNE ZAMÓWIENIA
                    │
                    ↓
             LOGIKA PLANOWANIA
                    ↓
          przewidywany stan
```

W prostym przypadku można zbudować taki model w Excelu.

Jeżeli źródeł jest kilka, dobrym rozwiązaniem może być Excel + Power Query.

Jeżeli dane są bezpośrednio w ERP albo sklepie internetowym, można wykorzystać API.

Najważniejsze jest to, żeby najpierw zaprojektować **logikę procesu**, a dopiero później wybrać technologię.

---

## Skaner kodów nie musi być bezpośrednio podłączony do Excela

Kolejnym ciekawym przykładem jest wykorzystanie skanera kodów kreskowych albo telefonu.

Nie zawsze potrzebne jest skomplikowane połączenie sprzętowe.

Urządzenie może np. generować pliki:

```text
scan_001.csv
scan_002.csv
scan_003.csv
```

Dalej proces wygląda tak:

```text
SKANER / TELEFON
       ↓
       CSV
       ↓
wspólny folder
       ↓
Power Query / skrypt
       ↓
rejestr wydań
       ↓
WZ / raport / stan magazynowy
```

Takie rozwiązanie może być prostsze do wdrożenia i utrzymania niż budowa całego systemu od zera.

Ważne jest nie to, czy wszystkie elementy działają w jednej aplikacji, ale czy **cały proces jest spójny i powtarzalny**.

---

## Przykładowa architektura magazynu dla małej firmy

Załóżmy, że firma prowadzi sklep internetowy i posiada niewielki magazyn.

Rozwiązanie może wyglądać tak:

```text
             SKLEP INTERNETOWY
                     ↓
                 API / CSV
                     ↓
          ┌────────────────────┐
          │ dane zamówień      │
          └────────────────────┘
                     ↓
                Power Query
                     ↓
         ┌───────────┴───────────┐
         ↓                       ↓
 MAGAZYN / OPERACJE          RAPORT EXCEL
         ↓                       ↓
 Microsoft Lists             właściciel
 / rejestr ruchów            controlling
```

Każda technologia wykonuje zadanie, do którego najlepiej się nadaje.

Nie próbujemy zrobić z jednego skoroszytu jednocześnie:

- bazy danych,
- systemu magazynowego,
- formularza,
- integratora API,
- raportu,
- narzędzia dla 15 użytkowników,
- archiwum dokumentów.

---

## Kiedy sam Excel nadal jest najlepszym rozwiązaniem?

Nie warto też komplikować prostego procesu tylko dlatego, że istnieją bardziej rozbudowane technologie.

Jeżeli:

- magazyn jest niewielki,
- pracuje na nim jedna lub dwie osoby,
- operacji jest stosunkowo mało,
- dane nie muszą być automatycznie synchronizowane z innymi systemami,
- raportowanie jest proste,

dobrze przygotowany Excel może być najbardziej ekonomicznym rozwiązaniem.

Może zawierać:

- kartotekę produktów,
- rejestr przyjęć,
- rejestr wydań,
- automatyczne stany,
- alerty niskiego zapasu,
- wyszukiwarkę,
- raport miesięczny,
- dokumenty WZ/PZ,
- podsumowanie wartości magazynu.

Dopiero wraz z rozwojem procesu można dołączać kolejne elementy.

---

## Jak dobrać rozwiązanie do wielkości procesu?

Nie istnieje jeden najlepszy system dla każdej firmy.

W praktyce można przyjąć prosty schemat:

| Sytuacja | Rozwiązanie, które warto rozważyć |
|---|---|
| Jedna osoba, prosty magazyn | Excel |
| Kilka plików o podobnej strukturze | Excel + Power Query |
| Kilka osób współpracuje na dokumencie | Excel + OneDrive / SharePoint |
| Wiele osób dodaje operacje | Microsoft Lists / SharePoint |
| Dane trafiają cyklicznie w plikach | Folder + Power Query |
| Dane znajdują się w ERP, sklepie lub CRM | API |
| Potrzebne są KPI i dashboardy | Excel / Power BI |
| Potrzebne są formularze i historia operacji | SharePoint / Lists / aplikacja |
| Dużo użytkowników i skomplikowanych reguł | baza danych / aplikacja |
| Część procesu jest w Excelu, część w systemach | rozwiązanie hybrydowe |

Najważniejsze jest to, że **nie trzeba wybierać jednej technologii dla całego procesu**.

Bardzo często najbardziej praktyczne rozwiązanie jest hybrydowe.

---

## Czego nie robić przy magazynie w Excelu?

### Nie wysyłaj głównego pliku mailem

Po kilku dniach może nie być wiadomo, która wersja jest aktualna.

### Nie pozwalaj wszystkim ręcznie zmieniać stanu produktu

Lepiej rejestrować operacje magazynowe i wyliczać stan.

### Nie buduj automatyzacji na ścieżce jednego użytkownika

```text
C:\Users\Jan\...
```

jeżeli rozwiązanie ma działać na wielu komputerach.

### Nie zakładaj, że `Z:` oznacza to samo na każdym stanowisku

Sprawdź rzeczywistą lokalizację zasobu.

### Nie wrzucaj wszystkich plików do jednego folderu

Dobra struktura katalogów znacznie ułatwia automatyzację.

### Nie mieszaj danych źródłowych z raportem

Warstwa wejściowa powinna być możliwie stabilna.

### Nie dawaj wszystkim pełnego dostępu do wszystkiego

Magazynier, handlowiec, księgowość i kierownik mogą potrzebować różnych widoków.

### Nie używaj Excela jako bazy danych tylko dlatego, że firma już posiada Excela

Czasem lepszym źródłem będzie SharePoint, Microsoft Lists, baza danych albo niewielka aplikacja.

---

## Najlepszy system magazynowy nie zawsze oznacza zakup WMS

Między:

> „prowadzimy wszystko ręcznie w Excelu”

a:

> „kupujemy duży system WMS”

istnieje wiele rozwiązań pośrednich.

Można zbudować np.:

```text
Excel
+
Power Query
+
wspólny folder
```

albo:

```text
Microsoft Lists
+
SharePoint
+
Excel
```

albo:

```text
sklep
+
API
+
Excel
```

albo:

```text
aplikacja
+
baza danych
+
Power BI
```

Wszystko zależy od tego:

- ile osób pracuje na danych,
- skąd dane pochodzą,
- ile operacji wykonuje firma,
- jak często dane się zmieniają,
- kto powinien mieć dostęp,
- czy potrzebna jest historia zmian,
- czy system musi działać poza biurem,
- czy dane znajdują się już w innych programach.

---

## Excel może być początkiem, a nie ograniczeniem

Dobrze zaprojektowany magazyn w Excelu nie musi oznaczać jednego ogromnego pliku.

Excel może być:

- raportem,
- panelem użytkownika,
- formularzem,
- kalkulatorem,
- miejscem analizy,
- narzędziem do generowania dokumentów.

Dane mogą natomiast pochodzić z:

- folderów,
- CSV,
- SharePoint,
- Microsoft Lists,
- API,
- sklepu internetowego,
- ERP,
- CRM,
- bazy danych.

To często najbardziej praktyczna droga dla małej lub średniej firmy:

> **nie wymieniać wszystkiego od razu, tylko uporządkować przepływ danych i automatyzować kolejne elementy procesu.**

Więcej przykładów takich rozwiązań znajdziesz na stronie [Excel dla logistyki, magazynu i transportu](/uslugi/logistyka-w-excelu/) oraz w usłudze [automatyzacji Excel i Power Query](/uslugi/automatyzacja-excel-power-query/).

---

## Najczęstsze pytania

### Czy kilka osób może jednocześnie pracować w jednym pliku Excel?

Tak. W środowisku Microsoft 365 można współpracować na skoroszytach przechowywanych w OneDrive lub SharePoint. Przy bardziej intensywnym procesie wieloużytkownikowym warto jednak sprawdzić, czy Excel powinien być miejscem zapisywania wszystkich operacji, czy jedynie interfejsem i raportem.

### Czy Excel może pobierać dane ze wspólnego folderu?

Tak. Power Query może pobierać i łączyć wiele plików o podobnej strukturze. To bardzo użyteczne np. przy codziennych eksportach zamówień, dostaw, stanów albo danych z systemów.

### Czy lepszy jest dysk sieciowy czy OneDrive?

To zależy od środowiska firmy. Dysk sieciowy może bardzo dobrze działać w sieci lokalnej. OneDrive i SharePoint są zwykle wygodniejsze, gdy użytkownicy pracują z różnych komputerów lub lokalizacji.

### Czy kilka osób może aktualizować stan magazynu?

Może, ale lepiej nie opierać procesu na ręcznej zmianie jednej komórki ze stanem. Bezpieczniejszym modelem jest rejestrowanie przyjęć i wydań, a następnie automatyczne wyliczanie stanu.

### Czy Power Query może automatycznie łączyć wiele plików?

Tak. Jeżeli pliki mają podobną strukturę, można przygotować proces, który pobiera wszystkie pliki z wybranego folderu, przekształca je i łączy w jedną tabelę.

### Czy magazyn w Excelu można połączyć ze sklepem internetowym?

Tak. W zależności od systemu można korzystać z eksportów CSV/XLSX albo integracji API. Pozwala to ograniczyć ręczne kopiowanie zamówień i innych danych.

### Kiedy Microsoft Lists jest lepszy od Excela?

Gdy wielu użytkowników przede wszystkim dopisuje rekordy, potrzebne jest wspólne źródło danych, formularze, historia operacji lub kontrola dostępu. Excel może wtedy służyć do raportowania.

### Czy makra VBA działają w Excelu Online?

Excel w przeglądarce nie uruchamia kodu VBA tak jak klasyczna aplikacja desktopowa. Jeżeli proces opiera się na makrach, trzeba uwzględnić sposób pracy użytkowników już podczas projektowania rozwiązania.

### Czy magazyn musi być jednym plikiem Excel?

Nie. Często lepszą architekturą jest kilka uporządkowanych źródeł danych oraz jeden raport, który automatycznie je łączy.

---

## Masz magazyn w Excelu, ale proces zaczyna się rozrastać?

Nie musisz wiedzieć, czy potrzebujesz:

- Power Query,
- SharePoint,
- Microsoft Lists,
- API,
- makr,
- bazy danych,
- czy niewielkiej aplikacji.

Najlepiej zacząć od opisania obecnego procesu:

- gdzie znajdują się dane,
- ile osób na nich pracuje,
- z jakich komputerów,
- jakie pliki i systemy są używane,
- co jest dziś przepisywane ręcznie,
- gdzie najczęściej pojawiają się błędy,
- jaki powinien być efekt końcowy.

Na tej podstawie można dobrać możliwie proste rozwiązanie bez budowania niepotrzebnie dużego systemu.

Zobacz [Excel na zamówienie](/uslugi/excel-na-zamowienie/) albo [opisz nam swój proces](/kontakt/).
