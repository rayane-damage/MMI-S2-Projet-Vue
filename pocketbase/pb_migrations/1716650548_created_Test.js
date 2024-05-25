/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ur2fsoi3nnhc2iv",
    "created": "2024-05-25 15:22:28.530Z",
    "updated": "2024-05-25 15:22:28.530Z",
    "name": "Test",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yayz5pf4",
        "name": "pseudo",
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
        "id": "0jq1kc3f",
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
        "id": "p3ybna74",
        "name": "mood",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 3,
          "values": [
            "Bien",
            "Moyen",
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
  const collection = dao.findCollectionByNameOrId("ur2fsoi3nnhc2iv");

  return dao.deleteCollection(collection);
})
