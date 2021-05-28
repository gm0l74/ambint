# AmbInt
## Mesa Livre (Admin and Api)

@ created 04-05-2021<br />
@ submit  28-05-2021<br />

## About

This contains both the API and the Admin Dashboard of the Mesa Livre system.

API routes are server under the /api route.
The Dashboard requires authentication, the api does not.

## Locally

Run the webapp locally using node.
To install the dependencies and run the webapp, cd to '/webapp' and do:

```console
npm install
npm run dev
```

## Docker

To deploy using docker-compose, do:
```console
docker-compose up --build

docker-compose down --rmi 'all'
```

To open a shell on a running container:
```console
docker exec -it <container_id_or_name> /bin/sh
```
