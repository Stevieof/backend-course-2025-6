// Лабораторна робота №6: Створення сервісу інвентаризації
// Коміт 3: CLI + базовий HTTP-сервер (node:http + express), без логіки інвентаря.

const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require("express");
const { Command } = require("commander");

// =======================
// 1. CLI через commander
// =======================

const program = new Command();

program
    .name("backend-course-2025-6")
    .description("Inventory service (Lab 6)")
    .requiredOption("-h, --host <host>", "server host")
    .requiredOption("-p, --port <port>", "server port")
    .requiredOption("-c, --cache <dir>", "cache directory for photos");

program.parse(process.argv);
const opts = program.opts();

const HOST = opts.host;
const PORT = Number(opts.port);
const CACHE_DIR = path.resolve(opts.cache);

// =======================
// 2. Створення директорії кешу
// =======================

fs.mkdirSync(CACHE_DIR, { recursive: true });

// =======================
// 3. Налаштування Express
// =======================

const app = express();

// підтримка JSON та x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// простий 404 за замовчуванням
app.use((req, res) => {
    res.status(404).send("Not Found");
});

// =======================
// 4. Старт node:http сервера
// =======================

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
    console.log(`Inventory service (skeleton) listening at http://${HOST}:${PORT}`);
    console.log(`Photos cache directory: ${CACHE_DIR}`);
});
