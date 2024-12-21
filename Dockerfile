# Используем базовый образ для React приложений
FROM node:16-alpine as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock для установки зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install

# Копируем исходный код приложения
COPY . .

# Собираем приложение
RUN yarn build

# Используем сервер nginx для раздачи статичных файлов
FROM nginx:alpine

# Удаляем стандартные nginx конфиги
RUN rm -rf /usr/share/nginx/html/*

# Копируем собранные файлы приложения в папку nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем статичные файлы (например, шрифты, изображения) в папку public
# COPY public/blur_image /usr/share/nginx/html/blur_image
# COPY public/fonts /usr/share/nginx/html/fonts
# COPY public/image /usr/share/nginx/html/image

# Копируем кастомный nginx конфиг (если нужно)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
