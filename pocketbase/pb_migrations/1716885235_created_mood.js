/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "d0nc1tpw7v3oyz7",
    "created": "2024-05-28 08:33:55.173Z",
    "updated": "2024-05-28 08:33:55.173Z",
    "name": "mood",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "aeu05wcl",
        "name": "mood",
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
        "id": "ib8pnr1d",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("d0nc1tpw7v3oyz7");

  return dao.deleteCollection(collection);
})
