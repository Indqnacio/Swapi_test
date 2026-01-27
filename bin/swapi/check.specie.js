const { getAllPages } = require("./swapi.client");
//esta en prubea no comprendo esto
(async () => {
  try {
    const items = await getAllPages("species");
    console.log("species count:", items.length);
    if (items.length > 0) {
      console.log("first two species (summary):");
      console.log(items.slice(0, 2).map((s) => ({ name: s.name, url: s.url })));
    } else {
      console.log("No species returned from SWAPI");
    }
  } catch (err) {
    console.error("error fetching species:", err.message || err);
  }
})();
