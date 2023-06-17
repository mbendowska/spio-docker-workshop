# Popularne komendy :bi-terminal-fill:

**Informacje o Dockerze**:
   - Wersja Docker: `docker --version`
   - Informacje o systemie Docker: `docker info`
      - wersja, liczba obrazów, liczba kontenerów, wtyczki, itp.

**Obrazy Docker**:
   - Lista obrazów: `docker images`
   - Pobieranie obrazu: `docker pull [nazwa_obrazu]`
   - Budowanie obrazu: `docker build -t [nazwa_obrazu] .`
   - Usuwanie obrazu: `docker rmi [nazwa_obrazu]`
   - Warstwy obrazu: `docker history [nazwa_obrazu]`

**Kontenery Docker**:
   - Lista uruchomionych kontenerów: `docker ps`
   - Lista wszystkich kontenerów: `docker ps -a`
   - Uruchomienie kontenera: `docker run [nazwa_obrazu]`
   - Zatrzymanie kontenera: `docker stop [id_kontenera]`
   - Usuwanie kontenera: `docker rm [id_kontenera]`
   - Wejście do kontenera: `docker exec -it [id_kontenera] /bin/bash`

**Woluminy Docker**:
   - Lista woluminów: `docker volume ls`
   - Utworzenie woluminu: `docker volume create [nazwa_woluminu]`
   - Usuwanie woluminu: `docker volume rm [nazwa_woluminu]`

**Sieci Docker**:
   - Lista sieci: `docker network ls`
   - Utworzenie sieci: `docker network create [nazwa_sieci]`
   - Usuwanie sieci: `docker network rm [nazwa_sieci]`

**Docker Compose** (jeśli jest używany):
   - Uruchomienie usług: `docker-compose up`
   - Zatrzymanie usług: `docker-compose down`
