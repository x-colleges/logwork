➜  ~ mongo admin
use logwork
db.createUser(
  {
    user: "logwork",
    pwd: "logwork",
    roles: [ { "role" : "readWrite", db: "logwork" } ]
  }
)