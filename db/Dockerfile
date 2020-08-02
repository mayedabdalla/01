FROM library/postgres
COPY init.sql /docker-entrypoint-initdb.d/
ENV POSTGRES_USER prisma
ENV POSTGRES_PASSWORD prisma