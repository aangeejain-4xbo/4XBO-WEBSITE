// PM2 process config for the 4X BackOffice Node server.
// Usage on the VPS (from the project dir):
//   pm2 start deploy/ecosystem.config.cjs
//   pm2 save && pm2 startup     # persist across reboots
module.exports = {
  apps: [
    {
      name: "4xbo",
      script: "dist/server.cjs",
      // cwd matters: server.ts resolves dist/ from process.cwd().
      cwd: "/var/www/4xbo", // <-- set to the project path on the server
      env: {
        NODE_ENV: "production",
        PORT: "3535",
      },
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "300M",
    },
  ],
};
