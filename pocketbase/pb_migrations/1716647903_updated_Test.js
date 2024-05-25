/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8no8ht5t3ci0s4q")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vv9vq5xt",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8no8ht5t3ci0s4q")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
