// pm2 configuration for production
// https://nuxtjs.org/docs/2.x/deployment/deployment-pm2

module.exports = {
    apps: [
      {
        name: 'ZpevnikSPA',
        exec_mode: 'cluster',
        instances: '8', // Or a number of instances
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
      }
    ]
  }