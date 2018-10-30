# Build ES6 and Sass/Less/Stylus for your Sitecore frontend project.

## Setup:

Edit *config.json*
```json
{
  "outputDir": "../VSProject/assets/ProjNAME",
  "publicPath": "/assets/ProjNAME",
  "publishedPath": "C:/inetpub/Website/assets/ProjNAME"
}
```

**outputDir**: This points to the assets folder in your webpage project.

**publicPath**: This is the public path to the above folder when served through a web server.

**publishedPath**: This is the direct path to where you run your local webserver, used for watch mode.

---

## To build code: 
Add your js, styl, less, sass or scss files anywhere inside the src folder. Just make sure they're named index.\* to be picked up by the build script.

In your csproj file for the webpage project add the following with the correct path that matches the publicPath in your assets folder to autoinclude all files on build.

    <ItemGroup>
        <Content Include="assets\ProjNAME\**" />
    </ItemGroup>`


To run watch mode:
`$ npm run watch`

To build unminified code:
`$ npm run build:dev`

To build minified production code:
`$ npm install && npm run build`
