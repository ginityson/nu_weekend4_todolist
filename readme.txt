x npm init
x npm install express body-parser pg —save
x create server folder in root
x create app.js
x require modules in app.js
x add spin up server code to app.js
x test

x update package.json to add “start”
  text

x create public folder in root

x create scripts folder within public
x create vendors folder within public
x create views folder in root (MVC)
x create index.html in views
x set up static route for public folder
x create get route for base url that points to index.html
x test

x place jQuery file in public/vendors
x create script.js in in public/scripts
x src both into index.html
x test

x add button to DOM
x add jQuery on click even for button with simple console log output
x test

x urlencodedParser
x add ajax post to button click that sends a simple object

test

update app.js with connectionString that points to local database
add pg.connect that uses the connectionString and uses an SQL query to insert the object into the appropriate table in the db
test and view in Postico
