/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4aifr0b63dfmr7z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bgaja1gz",
    "name": "title",
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
  const collection = dao.findCollectionByNameOrId("4aifr0b63dfmr7z")

  // remove
  collection.schema.removeField("bgaja1gz")

  return dao.saveCollection(collection)
})
