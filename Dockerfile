FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

RUN npm install

COPY . .

RUN npm run build

RUN chmod +x /app/entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--port=5000", "--open", "false"]
