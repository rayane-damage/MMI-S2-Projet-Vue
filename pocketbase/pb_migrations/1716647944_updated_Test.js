/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8no8ht5t3ci0s4q")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "akomvabs",
    "name": "mood",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8no8ht5t3ci0s4q")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
