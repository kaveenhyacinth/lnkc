module.exports = {
  apps: [
    {
      name: 'lnkc-backend',
      script: 'npm',
      args: 'run start:prod',
      cwd: '/var/www/lnkc/api', // Ensure you are in the correct directory
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '3G',
      env: {
        NODE_ENV: 'production',
        PORT: 8080, // Ensure the environment variable is set
      },
      exec_mode: 'fork',
    },
    {
      name: 'lnkc-frontend',
      script: 'npm',
      args: 'run start:prod',
      cwd: '/var/www/lnkc/client', // Ensure you are in the correct directory
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '3G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000, // Ensure the environment variable is set
      },
      exec_mode: 'fork',
    }
  ],
};