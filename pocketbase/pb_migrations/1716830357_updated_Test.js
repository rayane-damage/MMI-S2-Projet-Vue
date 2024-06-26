/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ur2fsoi3nnhc2iv")

  // remove
  collection.schema.removeField("m1vrdmg4")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ur2fsoi3nnhc2iv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m1vrdmg4",
    "name": "moodbis",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Bien",
        "Moyen",
        "Mal"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
