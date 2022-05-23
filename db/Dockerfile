FROM mysql

ENV MYSQL_ROOT_PASSWORD=san
COPY ./scripts/ /docker-entrypoint-initdb.d/

EXPOSE 3306
# docker build . -t safystore
# docker run --name safystorebox -p 3311:3306 -d safystore
# docker run --name safystorebox -e MYSQL_ROOT_PASSWORD=san -p 3311:3306 mysql
# docker run --name safystorebox -e MYSQL_ROOT_PASSWORD=san -p 3311:3306 safystore