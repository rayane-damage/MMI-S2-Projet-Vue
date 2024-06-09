/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4aifr0b63dfmr7z")

  collection.name = "memories"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4aifr0b63dfmr7z")

  collection.name = "Memorie"

  return dao.saveCollection(collection)
})
