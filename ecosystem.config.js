require("dotenv").config();

module.exports = {
  apps : [{
    name:"marketplace",
    script: 'bin/www.mjs',
    watch: false,
    node_args:"--experimental-json-modules",
    instances:"3",
    exec_mode:"cluster"
  }],

  deploy : {
    production : { //https://doctoroncall.com/marketplace
      key  : process.env.DEPLOY_KEY_PATH,
      user : 'root',
      host : '202.165.25.69',
      ref  : 'origin/production',
      repo : 'git@github.com:DoctorOnCallMY/Marketplace.git',
      path : '/home/ubuntu/code/marketplace',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npx knex migrate:latest --env production && npm run build && pm2 reload ecosystem.config.js',
      'pre-setup': ''
    },
    staging : { //https://sit.doctoroncall.com/marketplace
      key  : process.env.DEPLOY_KEY_PATH,
      user : 'root',
      host : '202.165.25.162',
      ref  : 'origin/staging',
      repo : 'git@github.com:DoctorOnCallMY/Marketplace.git',
      path : '/home/ubuntu/code/marketplace',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npx knex migrate:latest --env production && npm run build && pm2 reload ecosystem.config.js',
      'pre-setup': ''
    },
    development : {//https://uat.doctoroncall.com/marketplace
      key  : process.env.DEPLOY_KEY_PATH,
      user : 'root',
      host : '202.165.25.247',
      ref  : 'origin/main',
      repo : 'git@github.com:DoctorOnCallMY/Marketplace.git',
      path : '/home/ubuntu/code/marketplace',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npx knex migrate:latest && npm run build && pm2 reload ecosystem.config.js',
      'pre-setup': ''
    }
  }
};
