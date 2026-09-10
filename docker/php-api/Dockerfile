FROM php:8.3-apache

RUN docker-php-ext-install pdo_mysql \
    && a2enmod rewrite headers

COPY btuc-cms-prototype/php-api/ /var/www/html/
COPY docker/php-api/config.php /var/www/html/config.php
COPY docker/php-api/apache.conf /etc/apache2/conf-available/btuc-api.conf

RUN a2enconf btuc-api \
    && chown -R www-data:www-data /var/www/html

EXPOSE 80
