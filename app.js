/*
  Main app file require your start files from here. 
  This will automatically require all index.* files in the src folder
*/
require.context(
  "./src", // context folder
  true, // include subdirectories
  /index.(js|styl|less|sass|scss)/ // RegExp
)("./" + expr + "");
