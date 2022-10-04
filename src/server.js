const path = require('path')
const { exec } = require("child_process")
const fastify = require('fastify')({ logger: true })
const { renderToString } = require('@vue/server-renderer')
let App, appPath, manifest

const buildManifest = () => {

  return new Promise((resolve, reject) => {
    
    console.info('Building manifest')

    exec("SSR=true npm run build", (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return
      }
      
      console.log('SSR manifest finished')
      resolve(stdout ? stdout : stderr)
    })
  })
}


fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, '../dist')
})

fastify.get('/', async (req, res) => {

    const renderedApp = await renderToString(App)

    res.type('html').send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link rel="icon" href="${manifest['favicon.ico']}">
        <link rel="stylesheet" href="${manifest['app.css']}">
        <script type="module" src="${manifest['client.js']}"></script>
      </head>
      <body id="app">
        ${renderedApp}
      </body>
    </html>
    `)
})

const start = async () => {
  
  await buildManifest()

  manifest = require('../dist/ssr-manifest.json')
  
  appPath = path.join(__dirname, '../dist', manifest['app.js']) 
  App = require(appPath).default
  
  try {

    await fastify.listen({ port: 3000 })    
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()