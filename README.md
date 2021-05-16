# AmbInt
## Mesa Livre (Admin and Api)

@ created 04-05-2021<br />

## About

The Admin dashboard and API can be accessed at https://ambint.herokuapp.com

## API

All API related routes start with /api.

Here are some examples.

1) To get all registered organizations do:
https://ambint.herokuapp.com/api

2) To get information of an organization:
https://ambint.herokuapp.com/api/<org_uid>

Several properties will be returned. One of those properties is 'buildings'.
You can take one of those building uids and fetch data of that building using 3)

3) To get data on a building of an organization:
https://ambint.herokuapp.com/api/<org_uid>/b/<building_uid>

Once again, several properties will be shown. One of them is 'rooms'.
It contains the uids of each room registered in that building.
To gather information of that room do 4)

4) To get data on a room of an organization's building:
https://ambint.herokuapp.com/api/<org_uid>/r/<room_uid>

One of the returned data is 'floors'.
It contains the uids of each floor associated to the room.
To gather information of that floor do 5)

5) To get data on a floor of a room:
https://ambint.herokuapp.com/api/<org_uid>/r/<room_uid>/<floor_uid>

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
