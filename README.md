## js-jsondb

A Javascript Class that reads JSON file as a database. Use for sample DBs.

### Usage

Install package

```node
npm i @kreisler/js-jsondb
```

#### Initialize

```js
import JsonDb from "@kreisler/js-jsondb";
```
or
```js
const JsonDb = require("@kreisler/js-jsondb");
```
```js	
// Crea una instancia de la clase JsonDb y especifica la ruta de la carpeta
const json_db = new JsonDb("json_files"); // Or passing the directory of your json files with no trailing slash, default is the current directory. E.g.  new JsonDb( '/var/www/html/json_files' )
```

#### Inserting

Insert into your new JSON file. Using _users.json_ as example here

```js
json_db.insert("users", { id: 1, name: "Juan" });
json_db.insert("users", { id: 2, name: "Ana" });
json_db.insert("users", { id: 3, name: "Mario" });
```

or

```js
json_db.insert("users", [
  { id: 1, name: "Juan" },
  { id: 2, name: "Ana" },
  { id: 3, name: "Mario" },
]);
```

#### Get

Get back data

##### All data:

```js
// Obtiene todos los objetos del archivo "users.json"
const allUsers = json_db.select("users");
console.log(allUsers);

/*
[
  { id: 1, name: 'Juan' },
  { id: 2, name: 'Ana' },
  { id: 3, name: 'Mario' }
]
*/
```

#### Find data:

```js
// Obtiene los objetos del archivo "users.json" cuyo atributo "name" es "Juan"
// Se puede usar && y/o || para ser más especifico
const juanUsers = json_db.select("users", (item) => item.name === "Juan");
console.log(juanUsers);

/*
[ { id: 1, name: 'Juan' } ]
*/
```

```js
// Obtiene los objetos del archivo "users.json" cuyo atributo "id" es mayor a 1
const usersWithIdGreaterThanOne = json_db.select(
  "users",
  (item) => item.id > 1
);
console.log(usersWithIdGreaterThanOne);
/*
[ { id: 2, name: 'Ana' }, { id: 3, name: 'Mario' } ]
*/
```

#### Updating

You can also update same JSON file with these methods

```js
// Actualiza el atributo "name" de los objetos del archivo "users.json" cuyo atributo "id" es 1
json_db.update("users", (element) => element.id === 1, {
  name: "Juan Lopez",
});
/*
[
  { id: 1, name: 'Juan Lopez' },
  { id: 2, name: 'Ana' },
  { id: 3, name: 'Mario' }
]
*/
```

or

```js
json_db.update(
  "users",
  (element) => element.id > 1,
  (element) => ({
    name: `${element.name} :)`,
  })
);
/*
[
  { "id": 1, "name": "Juan" },
  { "id": 2, "name": "Ana :)" },
  { "id": 3, "name": "Mario :)" }
]
*/
```

All rows in the JSON file can also be modified

```js
// Actualiza el atributo "name" de todos los objetos del archivo "users.json"
json_db.update("users", null, {
  name: "Juan Perez",
});

/*
[
  { id: 1, name: 'Juan Perez' },
  { id: 2, name: 'Juan Perez' },
  { id: 3, name: 'Juan Perez' }
]
*/
```

#### Deleting Row

```js
// Eliminamos todos los usuarios cuyo nombre empiece con la letra 'J'
json_db.delete("users", ({ name }) => name.startsWith("J"));
/*
[ { id: 2, name: 'Ana' }, { id: 3, name: 'Mario' } ]
*/
```

Delete file:

```js
json_db.delete("users");
```
