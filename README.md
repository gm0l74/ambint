# AmbInt
## Mesa Livre (Admin and Api)

@ created 04-05-2021<br />

## About

The Admin dashboard and API can be accessed at https://ambint.herokuapp.com

## API

All API related routes start with /api.

Here are some examples.

1) To get everything (organizations, buildings, rooms, floors) do:
https://ambint.herokuapp.com/api

2) To get all buildings or rooms or floors or seats or tables, do:
https://ambint.herokuapp.com/api?type=buildings
https://ambint.herokuapp.com/api?type=rooms
https://ambint.herokuapp.com/api?type=floors
https://ambint.herokuapp.com/api?type=seats
https://ambint.herokuapp.com/api?type=tables

If no type is specified, the default value is 'any'.

3) You can also define other properties such as occupancy and n_seats (which work with buildings, rooms, floors, tables).
To do so:
https://ambint.herokuapp.com/api?occupancy=0.5
https://ambint.herokuapp.com/api?type=rooms&n_seats=2

The last url shows how to combine parameters.

5) To change the state of a seat, you must have its uid.

https://ambint.herokuapp.com/api/post?uid=<seat_uid>

To get a list of all occupied seats, do:
https://ambint.herokuapp.com/api?type=seats&state=true

To get a list of all unoccupied seats, do:
https://ambint.herokuapp.com/api?type=seats&state=true

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
