# Pierwsze kroki

W pierwszej kolejności wybierz w jaki sposób chcesz pracować na dzisiajeszych zajęciach: :bi-cloud: lub :bi-laptop:

::: details Praca w chumrze - GitHub Codespaces
Wymagania: konto na GitHubie

1. [Utwórz fork dla repozytorium z materiałami](https://github.com/drmikeman/spio-docker-workshop/fork)
2. [Dodaj i uruchom Codespace dla tego forka](https://github.com/codespaces/new) - wprowadź nazwę repozytorium, pozostałe ustawienia pozostaw domyślne
:::

::: details Praca na swoim komputerze - Docker Desktop
Wymagania: zainstalowany [Docker Desktop](https://www.docker.com/products/docker-desktop/)

1. Sklonuj repozytorium z materiałami

```bash
git clone git@github.com:drmikeman/spio-docker-workshop.git
```
:::

## Budowanie obrazu i uruchomianie kontenera

1. **Zbuduj obraz Docker**

    Po skonfigurowaniu Dockerfile, możesz zbudować obraz Docker za pomocą poniższego polecenia:

    ```bash
    docker build -t nazwa-obrazu .
    ```

    Zastąp `nazwa-obrazu` nazwą, której chcesz użyć dla obrazu Docker, np. `docker-workshop`

2. **Uruchom kontener Docker**

    Po zbudowaniu obrazu Docker, możesz uruchomić kontener Docker, używając poniższego polecenia:

    ```bash
    docker run -p 8080:8080 -d nazwa-obrazu
    ```

    To polecenie uruchomi kontener Docker, mapując port 8080 kontenera na port 8080 hosta.\
    `-d` oznacza, że kontener jest uruchamiany w tle.

3. **Otwórz uruchomioną aplikację**

    Otwórz w przeglądarce adres `localhost:8080` (lub kliknij odpowiedni przycisk w Codespaces).

Jeżeli wszystko działa, zobaczysz te same materiały, które teraz czytasz, uruchomione w Twoim własnym kontenerze! :tada:

::: tip Wyzwanie 1: Docker tutorial 101
Uruchom obraz `dockersamples/101-tutorial`, który również zawiera aplikację internetową, tym razem działającą na porcie 80.

Jako uzupełnienie do tego warsztatu (po zajęciach) możesz spróbować przerobić tutorial zawarty w tej aplikacji.
:::

::: tip Wyzwanie 2: Lista obrazów
Sprawdź jakie obrazy masz aktualnie w lokalnym repozytorium.\
Który z nich jest największy?
:::

::: tip Wyzwanie 3: Zmiana w aplikacji
Zmień tytuł aplikacji w pliku `.vuepress/config.ts` na jakiś inny niż obecnie.

@[code{9-12} ts{3}](.vuepress/config.ts)

Spróbuj zbudować nowy obraz, uruchomić kontener i sprawdź czy aktualizacja poszła ok.
:::

Uruchomienie kontenera nie zadziała, bo podany port jest już przyblokowany.

Zatrzymajmy stary kontener

1. **Pobierz id uruchomionego kontenera**

    ```bash
    docker ps
    ```

2. **Zatrzymaj kontener z podanym id**

    ```bash
    docker stop id-kontenera
    ```

3. **Możesz również usunąć kontener**

    ```bash
    docker rm id-kontenera
    ```

Dokończ wyzwanie. Czy teraz udało się zaktualizować aplikację?

## Dockerfile i jego modyfikacje

Przeanalizuj plik `Dockerfile`, który posłużył do zbudowania pierwszego z obrazów:

@[code dockerfile](Dockerfile)

Jeśli coś nie jest dla Ciebie jasne - ręka do góry! Postaram się wytłumaczyć osobiście.

Nasza aplikacja uruchamia się w trybie programisty.\
Okazało się, że nie ma konieczności budowania aplikacji, przed jej uruchomieniem.

Usuń zbędną linię z pliku `Dockerfile`:

@[code{14-21} dockerfile{5}](Dockerfile)

Zbuduj nowy obraz, tym razem podając nazwę z tagiem, np. `docker-workshop:small`.

::: tip Wyzwanie 4: Porównanie warstw kontenerów
Porównaj warstwy obu kontenerów: `docker-workshop` i `docker-workshop:small`.\
Możesz użyć polecenia `docker history nazwa-obrazu`.

Ile miejsca zaoszczędziliśmy na braku budowania?
:::

Przy okazji tego wywania warto sprawdzić ile "waży" kod samej aplikacji.

## Uruchamianie pojedynczego polecenia w kontenerze

Spróbujmy uruchomić prostą komendę bezpośrednio w kontenerze, np. `echo "hello"`.

Wylistuj listę kontenerów (uruchomionych i zatrzymanych)

```bash
docker ps -a
```

Jeżeli kontener jest uruchomiony, możemy wywołać w nim komendę przy użyciu polecenia `exec`:

```bash
docker exec id-kontener echo "hello"
```

Jeżeli kontener został zatrzymany lub nie mamy jeszcze żadnego kontenera (ale obraz istnieje), możemy użyć `run` w wersji interaktywnej:

```bash
docker run -it nazwa-obrazu echo "hello"
```

W obu przypadkach w konsoli powinno pojawić się słowo `hello`.

Warto zrozumieć różnice między tymi metodami.

## Pobawmy się wewnątrz kontenera

Czasami warto połączyć się z kontenerem przy użyciu konsoli.\
Wówczas możemy wykonywać różnego typu polecenia wewnątrz kontenera, tak jakbyśmy robili to w naszym systemie, na przykład:
- przechodzenie po folderach,
- tworzenie i modyfikacja plików,
- uruchamianie programów,
- instalacja aplikacji.

```bash
docker run -it nazwa-obrazu /bin/sh
```

::: tip Wyzwanie 5: Dodaj plik w kontenerze
Dodaj plik bezpośrednio w kontenerze, np. `touch nowy_plik.md`.\
Sprawdź czy go widać w samym kontenerze.

Uruchom kontener ponownie. Czy plik się zachował?

Uwaga! Wynik będzie inny kiedy uruchomimy zatrzymany kontener (`docker start id-kontenera`), a kiedy stworzymy nowy kontener (`docker run nazwa-obrazu`).
:::

## Nowe narzędzie w obrazie

Dodajmy nowe narzędzie, `tree` do obrazu:

```dockerfile
apt-get update && apt-get install -y tree
```

::: tip Wyzwanie 6: Kolejność kroków w Dockerfile
Zastanów się gdzie dodać powyższe polecenie do pliku Dockerfile.\
Czy ma to jakieś znaczenie?
:::

Uruchom zaktualizowany obraz i sprawdź czy polecenie `tree` działa.

## Wypychanie obrazu do Docker Hub (Docker Desktop)

Jeżeli korzystasz z Docker Desktop i masz założone [konto Docker Hub](https://hub.docker.com/), możesz spróbować wypchnąć obraz do Docker Hub:

1. **Dodaj nową nazwę dla obrazu**

    ```bash
    docker tag nazwa-obrazu nazwa-użytkownika/nazwa-obrazu .
    ```

    Obraz, który chcemy wypchnąć musi mieć tag rozpoczynający się od nazwy użytkownika.\
    Polecenie `tag` pozwala na nadawanie nowej nazwy dla istniejącego obrazu.

2. **Zaloguj się do Docker Hub w konsoli**

    ```bash
    docker login
    ```

    Wprowadź swoje dane uwierzytelniające (nazwę użytkownika i hasło).

3. **Zaloguj się do Docker Hub w przeglądarce i utwórz repozytorium**

    Zaloguj się na swoje konto w [Docker Hub](https://hub.docker.com/).\
    Dodaj nowe repozytorium o tej samej nazwie co stworzony obraz.\
    Oznacz repozytorium jako publiczne.

4. **Wypchnij obraz do Docker Hub**

    ```bash
    docker push nazwa-użytkownika/nazwa-obrazu
    ```

5. **Poczekaj, aż obraz zostanie wysłany do Docker Hub**

    Teraz obraz powinien być dostępny w Twoim repozytorium Docker Hub.
