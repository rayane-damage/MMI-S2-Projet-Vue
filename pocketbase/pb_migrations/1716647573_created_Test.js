/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "8no8ht5t3ci0s4q",
    "created": "2024-05-25 14:32:53.125Z",
    "updated": "2024-05-25 14:32:53.125Z",
    "name": "Test",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vv9vq5xt",
        "name": "Pseudo",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "y0nupuaf",
        "name": "date",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "akomvabs",
        "name": "field",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 2,
          "values": [
            "Bien",
            "Moeyn",
            "Mal"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8no8ht5t3ci0s4q");

  return dao.deleteCollection(collection);
})
