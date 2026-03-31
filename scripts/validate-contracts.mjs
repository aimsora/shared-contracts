import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const scriptDir = fileURLToPath(new URL(".", import.meta.url));
const cwdRoot = process.cwd();
const scriptRoot = join(scriptDir, "..");
const root = existsSync(join(cwdRoot, "events")) ? cwdRoot : scriptRoot;
const eventsDir = join(root, "events");
const graphqlPath = join(root, "graphql", "schema.graphql");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function validateEventSchemas() {
  const files = readdirSync(eventsDir).filter((name) => name.endsWith(".json"));
  assert(files.length > 0, "В каталоге events нет JSON-схем.");
  const ajv = new Ajv2020({ allErrors: true });
  addFormats(ajv);

  for (const file of files) {
    const fullPath = join(eventsDir, file);
    const data = JSON.parse(readFileSync(fullPath, "utf-8"));

    assert(data.$schema, `${file}: отсутствует поле $schema`);
    assert(data.$id, `${file}: отсутствует поле $id`);
    assert(data.type === "object", `${file}: type должен быть object`);
    assert(Array.isArray(data.required), `${file}: required должен быть массивом`);
    assert(typeof data.properties === "object", `${file}: properties должен быть объектом`);
    ajv.compile(data);
  }
}

function validateGraphqlSchema() {
  const schema = readFileSync(graphqlPath, "utf-8");
  assert(schema.includes("type Query"), "GraphQL schema: отсутствует type Query");
  assert(schema.includes("type Mutation"), "GraphQL schema: отсутствует type Mutation");
}

function validateStructure() {
  assert(statSync(eventsDir).isDirectory(), "Каталог events отсутствует");
  assert(statSync(join(root, "graphql")).isDirectory(), "Каталог graphql отсутствует");
}

try {
  validateStructure();
  validateEventSchemas();
  validateGraphqlSchema();
  console.log("✅ Контракты прошли базовую проверку.");
} catch (error) {
  console.error("❌ Ошибка валидации контрактов:");
  console.error(error.message);
  process.exit(1);
}
