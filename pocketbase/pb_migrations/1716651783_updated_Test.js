/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ur2fsoi3nnhc2iv")

  // remove
  collection.schema.removeField("p3ybna74")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fdbpmqhs",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ur2fsoi3nnhc2iv")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("fdbpmqhs")

  return dao.saveCollection(collection)
})
