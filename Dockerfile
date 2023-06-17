# Wybierz obraz bazowy
FROM node:18

# Utwórz katalog roboczy w kontenerze
WORKDIR /app

# Kopiuj plik package.json i package-lock.json
COPY package.json ./
COPY yarn.lock ./

# Zainstaluj zależności
RUN yarn install

# Kopiuj resztę plików aplikacji
COPY . .

# Zbuduj projekt
RUN yarn build

# Oznacz port, który będzie nasłuchiwał
EXPOSE 8080

# Uruchom aplikację
CMD ["yarn", "dev"]
