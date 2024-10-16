# Alapértelmezett Node.js kép
FROM node:20

# Munka könyvtár létrehozása
WORKDIR /usr/src/app

# Csomagfájlok másolása
COPY package*.json ./

# Függőségek telepítése
RUN npm install

# Alkalmazás kódjának másolása
COPY . .

# Alkalmazás indítása
CMD ["npm", "start"]
#CMD ["npm", "run" , "dev"]

# Alkalmazás port
EXPOSE 5000
