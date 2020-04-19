FROM postgres
ENV POSTGRES_DB hosen
COPY ./docker/db/backup.sql /docker-entrypoint-initdb.d/1-init.sql

EXPOSE 5432

#ENTRYPOINT [ "/opt/setup/db-run.sh" ]
#RUN [ "psql", "< /1-init.sql ;" ]

CMD [ "postgres" ]d