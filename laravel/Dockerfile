FROM php:8.2-fpm

# Cài extension cần cho Laravel
RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /var/www/html

COPY . .

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer