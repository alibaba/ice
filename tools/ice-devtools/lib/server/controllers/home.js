const getMaterialLists = require('../getMaterialLists');

module.exports = async (ctx) => {
  const currentMaterial = ctx.params.material;

  const materialsAll = await getMaterialLists(process.cwd());
  const materials = materialsAll[currentMaterial];

  return ctx.render('home.hbs', {
    currentMaterial,
    materials,
  });
};
