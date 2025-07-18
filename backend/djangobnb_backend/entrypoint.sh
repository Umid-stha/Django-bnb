#!/bin/sh

if [ "$DATABASE" = "postgres" ]; then  # Added space before ] and semicolon
    echo "Checking if database is running..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "The database is up and running :)"
fi  # Added missing fi to close the if statement

python manage.py migrate

exec "$@"