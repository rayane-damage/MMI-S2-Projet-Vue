/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ur2fsoi3nnhc2iv")

  // remove
  collection.schema.removeField("hhofdkve")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kfmcqgo2",
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

  // remove
  collection.schema.removeField("kfmcqgo2")

  return dao.saveCollection(collection)
})
