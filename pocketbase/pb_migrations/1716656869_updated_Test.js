/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ur2fsoi3nnhc2iv")

  // remove
  collection.schema.removeField("fdbpmqhs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hhofdkve",
    "name": "mood",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "Bien",
        "Moyen",
        "Mal"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ur2fsoi3nnhc2iv")

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

  // remove
  collection.schema.removeField("hhofdkve")

  return dao.saveCollection(collection)
})
