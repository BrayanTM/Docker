# Instalar todas las dependencias
FROM --platform=$BUILDPLATFORM node:22.21-alpine3.21 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# Ejecutar pruebas
FROM --platform=$BUILDPLATFORM node:22.21-alpine3.21 AS test
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run test

# Instalar solo dependencias de producción
FROM --platform=$BUILDPLATFORM node:22.21-alpine3.21 AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN npm install --prod

# Construir la imagen final
FROM --platform=$BUILDPLATFORM node:22.21-alpine3.21 AS runner
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY app.js ./
COPY tasks/ ./tasks
CMD ["node", "app.js"]