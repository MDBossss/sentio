// Entry point for the module
import("./bootstrap")
  .then((module) => {
    console.log("Search App Bootstrap loaded");
    if (typeof module.setupSearchApp === "function") {
      module.setupSearchApp();
    }
  })
  .catch((error) => {
    console.error("Failed to load Search App Bootstrap:", error);
  });
