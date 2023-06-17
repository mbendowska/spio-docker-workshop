# Pójdźmy dalej

## Pliki projektu na dysku hosta

Do przechowywania plików poza kontenerem możemy wykorzystać mechanizm wolumenów.

Przeanalizuj poniższą instrukcję:

```bash
docker run --rm -p 8080:8080 -dt --volume $(pwd):/app --name workshop node:18
```

- `docker run`: polecenie docker run uruchamia nowy kontener na podstawie obrazu Dockera,
- `--rm`: po zakończeniu działania kontenera, zostanie on automatycznie usunięty. Jest to przydatne w celu sprzątania po kontenerze, gdy już nie jest potrzebny.
- `-dt`: te dwa parametry są łączone jako -d -t. Parametr -d oznacza, że kontener zostanie uruchomiony w tle (tryb detach), czyli nie będzie widoczny na standardowym wyjściu. Parametr -t umożliwia alokację pseudoterminala, co pozwala na interakcję z kontenerem.
- `--volume $(pwd):/app`: tworzy punkt montowania w kontenerze, łącząc lokalny katalog z katalogiem wewnątrz kontenera. W tym przypadku używamy $(pwd), aby oznaczać bieżący katalog (w którym jest uruchamiane polecenie Docker), a /app to ścieżka docelowa wewnątrz kontenera, do której będziemy montować nasz bieżący katalog.
- `--name workshop`: nadaje kontenerowi nazwę. Dzięki temu łatwiej jest odwoływać się do kontenera przy użyciu tej nazwy zamiast długiego identyfikatora kontenera.
- `node-18`: nazwa, który zostanie użyty do utworzenia kontenera. Taki sam obraz bazowy użyliśmy w pliku Docerfile

Ten sposób może nam się przydać do organizacji środowiska programistycznego.\
Pliki projektowe znajdują się na dysku hosta, ale kontener ma do nich dostęp.\
W ramach kontenera możemy natomiast uruchamiać naszą aplikację.

Uruchom powyższą komendę.

Połącz się z terminalem kontenera:
```bash
docker exec -it workshop /bin/sh
```

Przejdź do folderu `/app`, zainstaluj zaleźności i uruchom aplikację:
```bash
cd app
yarn install
yarn dev
```

Wszystko powinno działać jak poprzednio.

Zamiast "wchodzenia" do kontenera, możesz przy jego uruchomieniu odpalić komendy instalujące zależności.

```bash
docker run --rm \
-p 8080:8080 -dt \
--volume $(pwd):/app \
-w /app \
--name workshop \
node:18 \
sh -c "yarn install && yarn dev"
```

::: tip Wyzwanie 1: Modyfikacja pliku po stronie hosta
Zmień nazwę projektu (w pliku `config.ts`) używając edytora graficznego.
Sprawdź czy uruchomiona aplikacja od razu zaktualizowała tytuł.
:::


## Docker Compose do uruchamiania kilku kontenerów równocześnie

Spróbujemy utworzyć od podstaw aplikację składającą się z dwóch kontenerów. \
Wykorzystamy do tego Docker Compose. \
Aplikacja będzie napisana w języku Python. \
Drugi kontener to Redis - pamięciowa baza danych.

1. **Utwórz nowy katalog na dysku**. Będzie to twoja przestrzeń robocza. Możemy nazwać go `compose-app`.

    ```bash
    mkdir compose-app
    cd compose-app
    ```

2. **Utwórz plik Dockerfile**. Ten plik definiuje środowisko Twojego kontenera.

    ```dockerfile
    # Użyj oficjalnego obrazu Pythona jako bazy
    FROM python:3.8-slim-buster

    # Ustaw katalog roboczy w kontenerze
    WORKDIR /app

    # Skopiuj pliki do kontenera
    COPY . .

    # Zainstaluj wymagane pakiety
    RUN pip install --no-cache-dir -r requirements.txt

    # Ustaw zmienną środowiskową
    ENV NAME World

    # Otwórz port 80
    EXPOSE 80

    # Uruchom aplikację
    CMD ["python", "app.py"]
    ```

    Zapisz ten plik jako `Dockerfile` w stworzonym katalogu.

3. **Utwórz plik `requirements.txt`**. Ten plik definiuje zależności Pythona dla Twojej aplikacji.

    ```txt
    Flask==2.0.1
    Redis==3.5.3
    ```

    Zapisz ten plik jako `requirements.txt`.

4. **Utwórz plik `app.py`**. Ten plik definiuje Twoją aplikację.

    ```python
    from flask import Flask
    from redis import Redis

    app = Flask(__name__)
    redis = Redis(host='db', port=6379)

    @app.route('/')
    def hello():
        redis.incr('hits')
        return 'Hello World! I have been seen %s times.\n' % redis.get('hits').decode('utf-8')

    if __name__ == "__main__":
        app.run(host="0.0.0.0", port=80)
    ```

    Zapisz ten plik jako `app.py`.

5. **Utwórz plik `docker-compose.yml`**. Ten plik definiuje usługi Twojej aplikacji i jak są one powiązane.

    ```yaml
    version: "3"
    services:
      web:
        build: .
        ports:
          - "5000:80"
        volumes:
          - .:/app
      db:
        image: "redis:alpine"
    ```

    Zapisz ten plik jako `docker-compose.yml`.

6. **Zbuduj i uruchom aplikację** za pomocą Docker Compose.

    ```bash
    docker-compose up
    ```

Po zakończeniu tych kroków powinieneś mieć działającą aplikację składającą się z dwóch serwisów, które komunikują się ze sobą.\
Aplikację można przetestować, wpisując w przeglądarce `localhost:5000`. Każde odświeżenie strony powinno zwiększa licznik.

Aby uruchomić Docker Compose w tle, można dodać flagę -d (skrót od "detached mode"), która uruchamia kontenery w tle i zostawia je działające.
