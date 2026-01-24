//*? Metodo para poder filtrar las columnas 
//*? @@ obj es el JSON con toda la info
//*? @@ allowed es lo que realmente guardaremos
//** solo se usara para los POST y PUT
const pick = (obj, allowed) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => allowed.includes(key))
  );

module.exports = pick;