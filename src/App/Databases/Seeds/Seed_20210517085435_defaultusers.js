const { default: Seeds } = require("../../../Core/Database/Seeds");
const { default: DateFormat } = require("../../../Core/Libraries/DateFormat");
const { default: CommonLib } = require("../../Libraries/CommonLib");

let Seed_20210517085435_defaultusers = {
  table: "m_users",
  value: [
    {
      Id: 1,
      Username: CommonLib.defaultUser(),
      Password: CommonLib.encryptMd5(CommonLib.getKey() + CommonLib.defaultUser() + "hologram"),
      IsActive: 1
    }
  ]

};

exports.seed = async function (knex) {

  let isDataSeedExist = await Seeds.isSeedExist(knex, "Seed_20210517085435_defaultusers");
  if (!isDataSeedExist) {
    await Seeds.insertSeedBatch(knex, "Seed_20210517085435_defaultusers");

    return knex(Seed_20210517085435_defaultusers.table).insert(
      Seed_20210517085435_defaultusers.value
    );
  }
  return;

};
