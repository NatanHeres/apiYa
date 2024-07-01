# Gunakan image resmi Node.js sebagai base image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin seluruh isi proyek ke container
COPY . .

# Instal Playwright dan dependensinya
RUN npx playwright install --with-deps

# Build aplikasi
RUN npm run build

# Jalankan aplikasi pada port 3000
EXPOSE 3000
CMD ["npm", "start"]
