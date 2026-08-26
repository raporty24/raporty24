---

title: "Power Query w Excelu – automatyzacja raportów i koniec z ręcznym kopiowaniem danych"
description: "Power Query w Excelu pozwala automatycznie pobierać, łączyć i czyścić dane. Zobacz praktyczne przykłady, zastosowania i dowiedz się, kiedy warto go użyć."
pubDate: 2026-08-25
author: "Raporty24"
image: "/hero.webp"
category: "Automatyzacja"
tags: ["Power Query", "Excel", "Automatyzacja raportów", "Dane"]
----------------------------------------------------------------

Power Query to jedno z najbardziej praktycznych narzędzi w Excelu — szczególnie wtedy, gdy każdego tygodnia lub miesiąca wykonujesz **te same czynności na danych**.

Pobierasz pliki.

Kopiujesz dane do jednego arkusza.

Usuwasz zbędne kolumny.

Poprawiasz formaty.

Łączysz kilka tabel.

A później robisz dokładnie to samo przy kolejnym raporcie.

Power Query pozwala dużą część takiej pracy wykonać **raz**, zapisać kolejne kroki, a później po prostu odświeżać dane.

<div style="margin:32px 0; padding:24px 28px; background:#f8fafc; border-left:4px solid #2563eb; border-radius:0 14px 14px 0; line-height:1.75;">

<strong>Najprościej:</strong><br>
Power Query zapamiętuje sposób przygotowania danych. Gdy pojawią się nowe pliki lub nowe rekordy, nie musisz wykonywać całego procesu od początku — wystarczy odświeżyć zapytanie.

</div>

W tym artykule pokażemy:

* czym dokładnie jest Power Query,
* jakie zadania można nim zautomatyzować,
* kiedy sprawdza się lepiej niż formuły,
* jak wygląda typowy proces automatyzacji raportu,
* czym Power Query różni się od VBA,
* kiedy warto połączyć go z Power BI.

---

## Co to jest Power Query?

Power Query to narzędzie służące do **pobierania, przekształcania i łączenia danych**.

W praktyce oznacza to, że możesz pobrać dane z jednego lub wielu źródeł, uporządkować je według określonych zasad i przekazać do Excela lub modelu danych.

Typowy proces wygląda tak:

<div style="max-width:680px; margin:38px auto 50px;">

<div style="padding:20px 24px; border:1px solid #e5e7eb; border-radius:14px; background:#fff;">
<div style="font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:#64748b; font-weight:700;">1. Źródło danych</div>
<div style="margin-top:6px; font-size:19px; font-weight:700;">Excel / CSV / folder / baza danych</div>
</div>

<div style="text-align:center; padding:10px; font-size:23px; color:#94a3b8;">↓</div>

<div style="padding:20px 24px; border:1px solid #e5e7eb; border-radius:14px; background:#fff;">
<div style="font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:#64748b; font-weight:700;">2. Power Query</div>
<div style="margin-top:6px; font-size:19px; font-weight:700;">Transformacja danych</div>
<div style="margin-top:5px; color:#64748b;">Czyszczenie, filtrowanie, łączenie, zmiana typów danych</div>
</div>

<div style="text-align:center; padding:10px; font-size:23px; color:#94a3b8;">↓</div>

<div style="padding:20px 24px; border:1px solid #e5e7eb; border-radius:14px; background:#fff;">
<div style="font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:#64748b; font-weight:700;">3. Wynik</div>
<div style="margin-top:6px; font-size:19px; font-weight:700;">Gotowa tabela lub model danych</div>
<div style="margin-top:5px; color:#64748b;">Dane przygotowane do raportu, tabeli przestawnej lub Power BI</div>
</div>

</div>

Największa zaleta?

**Każda transformacja zostaje zapisana jako kolejny krok.**

Nie musisz więc przy następnym raporcie pamiętać, że trzeba usunąć kolumnę C, zmienić format daty, odfiltrować anulowane zamówienia i połączyć dane z drugim plikiem.

Power Query zrobi to ponownie według zapisanej procedury.

---

## Power Query w praktyce – prosty przykład

Wyobraź sobie dział sprzedaży, który każdego miesiąca otrzymuje plik:

`Sprzedaz_styczen.xlsx`

potem:

`Sprzedaz_luty.xlsx`

`Sprzedaz_marzec.xlsx`

`Sprzedaz_kwiecien.xlsx`

Każdy plik ma tę samą strukturę.

Bez automatyzacji ktoś może:

1. otworzyć wszystkie pliki,
2. skopiować dane,
3. wkleić je do tabeli zbiorczej,
4. usunąć niepotrzebne kolumny,
5. poprawić format dat,
6. sprawdzić błędy,
7. odświeżyć raport.

Przy 12 plikach nie jest to jeszcze katastrofa.

Przy 50, 100 albo kilkuset plikach robi się z tego proces, który pochłania czas i łatwo generuje błędy.

### Z Power Query

Możesz wskazać folder.

Power Query:

* odczyta znajdujące się w nim pliki,
* połączy dane,
* wykona zapisane transformacje,
* utworzy jedną tabelę wynikową.

Gdy w kolejnym miesiącu pojawi się nowy plik, często wystarczy:

**dodać go do folderu → odświeżyć raport.**

---

## Power Query vs ręczna praca w Excelu

<div style="overflow-x:auto; margin:32px 0 48px;">

<table style="width:100%; border-collapse:collapse; min-width:700px; font-size:16px; line-height:1.55;">
<thead>
<tr style="background:#f8fafc;">
<th style="padding:16px; border:1px solid #e5e7eb; text-align:left;">Zadanie</th>
<th style="padding:16px; border:1px solid #e5e7eb; text-align:left;">Ręcznie w Excelu</th>
<th style="padding:16px; border:1px solid #e5e7eb; text-align:left;">Power Query</th>
</tr>
</thead>

<tbody>

<tr>
<td style="padding:15px; border:1px solid #e5e7eb;"><strong>Łączenie wielu plików</strong></td>
<td style="padding:15px; border:1px solid #e5e7eb;">Kopiowanie i wklejanie</td>
<td style="padding:15px; border:1px solid #e5e7eb;">Można zautomatyzować</td>
</tr>

<tr>
<td style="padding:15px; border:1px solid #e5e7eb;"><strong>Usuwanie zbędnych kolumn</strong></td>
<td style="padding:15px; border:1px solid #e5e7eb;">Za każdym razem ręcznie</td>
<td style="padding:15px; border:1px solid #e5e7eb;">Krok zapisany w zapytaniu</td>
</tr>

<tr>
<td style="padding:15px; border:1px solid #e5e7eb;"><strong>Poprawianie formatów</strong></td>
<td style="padding:15px; border:1px solid #e5e7eb;">Powtarzana czynność</td>
<td style="padding:15px; border:1px solid #e5e7eb;">Wykonywane przy odświeżeniu</td>
</tr>

<tr>
<td style="padding:15px; border:1px solid #e5e7eb;"><strong>Łączenie tabel</strong></td>
<td style="padding:15px; border:1px solid #e5e7eb;">Formuły lub ręczna praca</td>
<td style="padding:15px; border:1px solid #e5e7eb;">Merge / Append</td>
</tr>

<tr>
<td style="padding:15px; border:1px solid #e5e7eb;"><strong>Nowe dane</strong></td>
<td style="padding:15px; border:1px solid #e5e7eb;">Ponowne przygotowanie raportu</td>
<td style="padding:15px; border:1px solid #e5e7eb;">Odświeżenie zapytania</td>
</tr>

<tr>
<td style="padding:15px; border:1px solid #e5e7eb;"><strong>Ryzyko błędu człowieka</strong></td>
<td style="padding:15px; border:1px solid #e5e7eb;">Rośnie przy wielu krokach</td>
<td style="padding:15px; border:1px solid #e5e7eb;">Proces jest powtarzalny</td>
</tr>

</tbody>
</table>

</div>

To właśnie powtarzalność jest największą zaletą Power Query.

---

## 7 praktycznych zastosowań Power Query w firmie

Power Query nie służy wyłącznie do tworzenia raportów.

Można wykorzystać go w wielu codziennych procesach.

---

### 1. Łączenie wielu plików Excel

To jedno z najczęstszych zastosowań.

Przykład:

Każdy oddział wysyła osobny plik:

* Warszawa.xlsx
* Kraków.xlsx
* Gdańsk.xlsx
* Poznań.xlsx

Zamiast otwierać każdy plik i kopiować dane, można przygotować zapytanie, które tworzy jedną zbiorczą tabelę.

<div style="margin:30px 0 42px; padding:22px 26px; background:#f8fafc; border:1px solid #e5e7eb; border-radius:14px; line-height:1.75;">

<strong>Praktyczna wskazówka:</strong><br>
Jeśli pliki mają podobną strukturę i regularnie trafiają do jednego folderu, jest to bardzo dobry kandydat do automatyzacji Power Query.

</div>

---

### 2. Automatyczny import plików CSV

Systemy ERP, sklepy internetowe, platformy sprzedażowe i systemy magazynowe często eksportują dane do CSV.

Power Query może:

* pobrać plik,
* ustawić odpowiednie typy danych,
* rozdzielić kolumny,
* usunąć puste rekordy,
* zmienić nazwy kolumn,
* przygotować dane do dalszej analizy.

Dzięki temu raport nie musi być ręcznie przebudowywany przy każdym nowym eksporcie.

---

### 3. Czyszczenie danych

W praktyce dane rzadko są idealne.

Możesz mieć:

`Warszawa`

`WARSZAWA`

`warszawa`

`Warszawa `

Dla człowieka to ta sama wartość.

Dla systemu mogą być to różne wartości.

Power Query pozwala wykonywać operacje takie jak:

* usuwanie zbędnych spacji,
* zamiana wielkości liter,
* usuwanie pustych rekordów,
* zastępowanie wartości,
* zmiana formatów,
* usuwanie duplikatów,
* filtrowanie błędnych rekordów.

---

### 4. Łączenie tabel zamiast setek formuł

Załóżmy, że masz:

**Tabelę sprzedaży**

oraz

**Tabelę klientów**

W pierwszej znajduje się `ID klienta`, a w drugiej:

* nazwa firmy,
* region,
* segment,
* opiekun.

W klasycznym Excelu często powstają kolumny wykorzystujące WYSZUKAJ.X albo inne funkcje wyszukujące.

W Power Query można połączyć tabele na podstawie wspólnego klucza.

To szczególnie przydatne, gdy proces ma działać regularnie.

---

### 5. Automatyczne raporty miesięczne

To jedno z zastosowań, które może dać firmie największą oszczędność czasu.

Wyobraź sobie raport przygotowywany pierwszego dnia każdego miesiąca.

Proces ręczny:

1. pobierz dane,
2. połącz pliki,
3. popraw formaty,
4. usuń błędy,
5. przypisz klientów do regionów,
6. policz sprzedaż,
7. odśwież tabele przestawne,
8. przygotuj raport.

Jeżeli cały proces można sprowadzić do odświeżenia przygotowanego zapytania, raport zaczyna wyglądać zupełnie inaczej.

<div style="display:flex; align-items:center; justify-content:center; gap:34px; flex-wrap:wrap; margin:36px 0 48px; padding:30px; background:#f8fafc; border:1px solid #e5e7eb; border-radius:16px; text-align:center;">

<div>
<div style="font-size:32px; font-weight:800; line-height:1;">2 h</div>
<div style="margin-top:8px; color:#64748b;">ręcznej pracy miesięcznie</div>
</div>

<div style="font-size:26px; color:#94a3b8;">→</div>

<div>
<div style="font-size:32px; font-weight:800; line-height:1;">24 h</div>
<div style="margin-top:8px; color:#64748b;">rocznie przy jednym raporcie</div>
</div>

</div>

Przy kilku raportach miesięcznych skala zaczyna być znacznie większa.

---

### 6. Przygotowanie danych do Power BI

Power Query jest bardzo ważnym elementem ekosystemu Power BI.

Zanim dane pojawią się na dashboardzie, zazwyczaj trzeba je:

* pobrać,
* oczyścić,
* połączyć,
* przekształcić,
* przygotować do analizy.

Dopiero później powstaje model, miary i wizualizacje.

Jeżeli firma potrzebuje już nie tylko automatyzacji danych, ale również dashboardów, centralnego raportowania i KPI, kolejnym etapem może być [Power BI dla firm](/uslugi/power-bi-dla-firm/).

---

### 7. Kontrola jakości danych

Power Query może również pomagać w wykrywaniu problemów.

Przykłady:

* zamówienie bez przypisanego klienta,
* klient bez regionu,
* błędna data,
* brak numeru produktu,
* duplikat faktury,
* pusty koszt,
* nieznany kod kategorii.

Zamiast znajdować takie problemy przypadkiem, można stworzyć osobną tabelę wyjątków wymagających sprawdzenia.

To szczególnie wartościowe w raportach finansowych, sprzedażowych i operacyjnych.

---

## Power Query vs formuły Excel

Czy Power Query zastępuje formuły?

Nie.

Oba rozwiązania mają inne zastosowanie.

<div style="overflow-x:auto; margin:32px 0 48px;">

<table style="width:100%; border-collapse:collapse; min-width:680px; font-size:16px; line-height:1.55;">

<thead>
<tr style="background:#f8fafc;">
<th style="padding:16px; border:1px solid #e5e7eb; text-align:left;">Potrzeba</th>
<th style="padding:16px; border:1px solid #e5e7eb; text-align:left;">Lepsze narzędzie</th>
</tr>
</thead>

<tbody>

<tr>
<td style="padding:15px; border:1px solid #e5e7eb;">Obliczenie marży w wierszu</td>
<td style="padding:15px; border:1px solid #e5e7eb;"><strong>Formuła Excel</strong></td>
</tr>

<tr>
<td style="padding:15px; border:1px solid #e5e7eb;">Interaktywna kalkulacja użytkownika</td>
<td style="padding:15px; border:1px solid #e5e7eb;"><strong>Formuła Excel</strong></td>
</tr>

<tr>
<td style="padding:15px; border:1px solid #e5e7eb;">Połączenie 30 plików</td>
<td style="padding:15px; border:1px solid #e5e7eb;"><strong>Power Query</strong></td>
</tr>

<tr>
<td style="padding:15px; border:1px solid #e5e7eb;">Czyszczenie danych przy każdym imporcie</td>
<td style="padding:15px; border:1px solid #e5e7eb;"><strong>Power Query</strong></td>
</tr>

<tr>
<td style="padding:15px; border:1px solid #e5e7eb;">Wyszukiwanie jednej wartości w tabeli</td>
<td style="padding:15px; border:1px solid #e5e7eb;"><strong>Excel / WYSZUKAJ.X</strong></td>
</tr>

<tr>
<td style="padding:15px; border:1px solid #e5e7eb;">Regularne łączenie dużych tabel</td>
<td style="padding:15px; border:1px solid #e5e7eb;"><strong>Power Query</strong></td>
</tr>

</tbody>
</table>

</div>

Najczęściej najlepszy efekt daje **połączenie obu narzędzi**, a nie próba zastąpienia jednego drugim.

---

## Power Query czy VBA?

To kolejne częste pytanie.

Power Query i VBA automatyzują różne typy zadań.

### Power Query sprawdza się szczególnie dobrze w:

* imporcie danych,
* czyszczeniu danych,
* łączeniu tabel,
* łączeniu wielu plików,
* cyklicznym przygotowaniu danych,
* transformacjach przed raportowaniem.

### VBA może być lepsze, gdy trzeba:

* sterować interfejsem Excela,
* tworzyć przyciski,
* generować arkusze,
* zapisywać pliki,
* wysyłać wiadomości,
* automatyzować czynności wykonywane przez użytkownika,
* sterować innymi elementami skoroszytu.

<div style="margin:32px 0 44px; padding:26px 30px; background:#f8fafc; border-radius:14px; text-align:center; font-size:19px; line-height:1.65;">

<strong>Power Query automatyzuje przede wszystkim przepływ i transformację danych.<br>
VBA automatyzuje przede wszystkim działania wykonywane w Excelu.</strong>

</div>

W bardziej rozbudowanych projektach oba rozwiązania mogą działać razem.

---

## Przykład: raport sprzedaży z 40 plików

Załóżmy, że firma posiada 40 punktów sprzedaży.

Każdy oddział przesyła miesięczny plik Excel.

W efekcie powstaje:

**40 plików × 12 miesięcy = 480 plików rocznie**

Ręczne łączenie takich danych szybko przestaje mieć sens.

### Proces można zbudować tak:

<div style="max-width:680px; margin:38px auto 50px;">

<div style="padding:20px 24px; border:1px solid #e5e7eb; border-radius:14px;">
<strong>Folder z raportami oddziałów</strong>
<div style="margin-top:5px; color:#64748b;">Wszystkie pliki trafiają w jedno miejsce</div>
</div>

<div style="text-align:center; padding:10px; font-size:23px; color:#94a3b8;">↓</div>

<div style="padding:20px 24px; border:1px solid #e5e7eb; border-radius:14px;">
<strong>Power Query</strong>
<div style="margin-top:5px; color:#64748b;">Łączenie, czyszczenie i standaryzacja danych</div>
</div>

<div style="text-align:center; padding:10px; font-size:23px; color:#94a3b8;">↓</div>

<div style="padding:20px 24px; border:1px solid #e5e7eb; border-radius:14px;">
<strong>Tabela zbiorcza</strong>
<div style="margin-top:5px; color:#64748b;">Jedno spójne źródło danych</div>
</div>

<div style="text-align:center; padding:10px; font-size:23px; color:#94a3b8;">↓</div>

<div style="padding:20px 24px; border:1px solid #e5e7eb; border-radius:14px;">
<strong>Raport / tabela przestawna / Power BI</strong>
<div style="margin-top:5px; color:#64748b;">Gotowa analiza wyników</div>
</div>

</div>

Gdy pojawia się kolejny plik, nie trzeba przebudowywać całego raportu.

---

## Kiedy Power Query może nie być najlepszym rozwiązaniem?

Power Query jest bardzo użyteczny, ale nie warto stosować go do wszystkiego.

Może nie być najlepszym wyborem, jeśli:

* potrzebujesz bardzo prostego jednorazowego obliczenia,
* użytkownik musi często ręcznie zmieniać dane,
* proces wymaga skomplikowanej interakcji z Excelem,
* potrzebujesz pełnej aplikacji biznesowej,
* problem dotyczy głównie interfejsu, a nie transformacji danych.

Wtedy lepszym rozwiązaniem może być:

* formuła,
* VBA,
* Python,
* Power BI,
* dedykowane narzędzie.

Najważniejsze jest dobranie technologii do procesu.

---

## Jak rozpoznać dobry proces do automatyzacji Power Query?

<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:20px; margin:34px 0 50px;">

<div style="padding:26px; border:1px solid #e5e7eb; border-radius:16px;">
<div style="font-size:13px; font-weight:700; color:#64748b;">01</div>
<h3 style="margin:12px 0 14px;">Jest powtarzalny</h3>
<p style="margin:0; line-height:1.7;">Co tydzień lub miesiąc wykonujesz praktycznie te same operacje.</p>
</div>

<div style="padding:26px; border:1px solid #e5e7eb; border-radius:16px;">
<div style="font-size:13px; font-weight:700; color:#64748b;">02</div>
<h3 style="margin:12px 0 14px;">Ma stałą strukturę</h3>
<p style="margin:0; line-height:1.7;">Źródła danych i sposób ich przygotowania są przewidywalne.</p>
</div>

<div style="padding:26px; border:1px solid #e5e7eb; border-radius:16px;">
<div style="font-size:13px; font-weight:700; color:#64748b;">03</div>
<h3 style="margin:12px 0 14px;">Zabiera czas</h3>
<p style="margin:0; line-height:1.7;">Dużą część pracy stanowi kopiowanie, czyszczenie i łączenie danych.</p>
</div>

</div>

Jeśli proces spełnia wszystkie trzy warunki, warto sprawdzić możliwość automatyzacji.

---

## Power Query + Power BI

Power Query bardzo często jest pierwszym etapem większego systemu raportowego.

Można potraktować go jako warstwę odpowiedzialną za przygotowanie danych.

Proces może wyglądać następująco:

**ERP / CRM / Excel / CSV**

↓

**Power Query**

↓

**Model danych**

↓

**Power BI**

↓

**Dashboard KPI**

Excel nadal może być wykorzystywany do analiz szczegółowych, podczas gdy Power BI zapewnia jeden wspólny raport dla menedżerów.

Jeśli raportowanie w firmie wymaga bardziej rozbudowanego rozwiązania, zobacz również [Power BI dla firm](/uslugi/power-bi-dla-firm/).

---

## Najczęstsze błędy przy Power Query

Sama znajomość narzędzia nie gwarantuje dobrego rozwiązania.

Kilka błędów może później mocno utrudnić utrzymanie raportu.

### 1. Źródła mają różne struktury

Jeżeli jeden plik ma kolumnę `Klient`, drugi `Nazwa klienta`, a trzeci `Kontrahent`, automatyzacja staje się bardziej podatna na problemy.

Warto najpierw ustalić standard danych.

### 2. Wszystko wykonywane jest w jednym ogromnym zapytaniu

Lepiej często podzielić proces na logiczne etapy:

**Źródło → czyszczenie → słowniki → tabela wynikowa**

Dzięki temu rozwiązanie jest łatwiejsze do testowania i utrzymania.

### 3. Brak kontroli błędów

Dobry proces powinien umożliwiać wykrycie rekordów, których nie udało się poprawnie przetworzyć.

### 4. Brak jasnego klucza do łączenia danych

Łączenie tabel tylko po nazwie klienta może być ryzykowne.

Znacznie lepiej korzystać z:

* ID klienta,
* numeru produktu,
* kodu kontrahenta,
* innego unikalnego identyfikatora.

### 5. Automatyzuje się zły proces

Jeśli źródła danych są chaotyczne, najpierw warto uporządkować proces.

Automatyzacja bałaganu nadal pozostawia bałagan — tylko szybszy.

---

## Najczęściej zadawane pytania

### Czy Power Query jest dostępny w Excelu?

W nowszych wersjach Excela Power Query jest zintegrowany z funkcjami pobierania i przekształcania danych.

### Czy trzeba znać programowanie?

Do wielu zastosowań nie.

Dużą część transformacji można tworzyć z poziomu interfejsu Power Query. Przy bardziej zaawansowanych rozwiązaniach przydatna może być znajomość języka M.

### Czy Power Query może łączyć wiele plików Excel?

Tak.

To jedno z jego najbardziej praktycznych zastosowań — szczególnie gdy pliki mają podobną strukturę.

### Czy Power Query zastępuje WYSZUKAJ.X?

Nie zawsze.

Do prostego wyszukiwania pojedynczej wartości WYSZUKAJ.X może być wygodniejsze.

Jeżeli jednak dwie duże tabele są regularnie łączone w procesie raportowym, Power Query często jest lepszym rozwiązaniem.

### Czy Power Query zastępuje VBA?

Nie.

Power Query skupia się głównie na pobieraniu i transformacji danych. VBA daje większą kontrolę nad działaniem samego Excela i interakcją użytkownika.

### Czy Power Query działa z Power BI?

Tak.

Power Query jest bardzo ważnym elementem przygotowania danych również w Power BI.

### Czy Power Query nadaje się do raportów miesięcznych?

Tak.

Cykliczne raporty oparte na powtarzalnych źródłach danych są jednym z najlepszych przykładów wykorzystania Power Query.

---

## Czy warto wdrożyć Power Query w firmie?

Jeżeli raport wymaga co miesiąc wykonywania tych samych kroków, warto przestać patrzeć na nie jako na „normalną pracę w Excelu”.

To może być po prostu proces, który da się zautomatyzować.

Zamiast:

**pobierz → skopiuj → popraw → połącz → sprawdź → raportuj**

można dążyć do:

<div style="margin:34px 0 48px; padding:28px; text-align:center; background:#f8fafc; border-radius:14px; font-size:21px; font-weight:700;">

Nowe dane → Odśwież → Gotowy raport

</div>

Nie każdy proces da się sprowadzić do jednego kliknięcia.

Ale jeśli pracownik regularnie wykonuje te same transformacje na podobnych danych, Power Query jest jednym z pierwszych narzędzi, które warto rozważyć.

---

## Chcesz zautomatyzować raport w Excelu?

Power Query może być wystarczającym rozwiązaniem, ale czasami warto połączyć go z Excelem, VBA, Power BI albo innym źródłem danych.

W ramach [automatyzacji Excel i Power Query](/uslugi/automatyzacja-excel-power-query/) możemy przeanalizować obecny proces i sprawdzić:

* które czynności da się usunąć,
* które można wykonywać automatycznie,
* jak uporządkować źródła danych,
* czy wystarczy Power Query,
* czy lepsze będzie szersze rozwiązanie.

<div style="margin:40px 0 24px; padding:32px; background:#f8fafc; border:1px solid #e5e7eb; border-radius:18px; text-align:center;">

<h3 style="margin-top:0;">Nie kopiuj danych, jeśli Excel może zrobić to za Ciebie</h3>

<p style="max-width:640px; margin:14px auto 24px; line-height:1.75;">
Pokaż nam obecny raport lub proces. Sprawdzimy, gdzie tracisz najwięcej czasu i jaki poziom automatyzacji ma największy sens.
</p>

<a href="/#kontakt" style="display:inline-block; padding:13px 22px; border-radius:10px; background:#111827; color:#fff; text-decoration:none; font-weight:700;">
Umów bezpłatną konsultację →
</a>

</div>
