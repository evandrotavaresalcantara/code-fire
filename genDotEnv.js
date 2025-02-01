const fs = require("fs");
const path = require("path");

const envFiles = [
  { src: "config/apps_api.env.example", dest: "config/apps_api.env" },
  { src: "config/apps_frontend.env.example", dest: "config/apps_frontend.env" },
  { src: "config/mongo_bucket.env.example", dest: "config/mongo_bucket.env" },
  { src: "config/mongo_report.env.example", dest: "config/mongo_report.env" },
  {
    src: "config/mongo-express_bucket.env.example",
    dest: "config/mongo-express_bucket.env",
  },
  {
    src: "config/mongo-express_report.env.example",
    dest: "config/mongo-express_report.env",
  },
  { src: "config/postgres.env.example", dest: "config/postgres.env" },
  { src: "config/rabbitmq.env.example", dest: "config/rabbitmq.env" },
];

envFiles.forEach(({ src, dest }) => {
  const srcPath = path.resolve(__dirname, src);
  const destPath = path.resolve(__dirname, dest);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copiado ${src} para ${dest}`);
  } else {
    console.error(`Arquivo ${src} não existe.`);
  }
});
