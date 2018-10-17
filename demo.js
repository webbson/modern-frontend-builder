require.context(
  "./demo", // context folder
  true, // include subdirectories
  /index.(js|styl|less|sass|scss)/ // RegExp
)("./" + expr + "");
