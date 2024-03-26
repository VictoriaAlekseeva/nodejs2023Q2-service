FROM node:20 AS builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

RUN npx prisma generate

FROM node:20-alpine

WORKDIR /usr/app

COPY --from=builder /usr/app /usr/app

# COPY --from=builder /usr/app/node_modules ./node_modules
# COPY --from=builder /usr/app/package*.json ./
# COPY --from=builder /usr/app/dist ./dist

EXPOSE $PORT

CMD ["npm", "run", "start:migrate"]