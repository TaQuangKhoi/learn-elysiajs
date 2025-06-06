import { Elysia } from "elysia";

const store = new Elysia()
	.state({ visitor: 0 })

const router = new Elysia()
	.use(store)
	.get('/increase', ({ store }) => store.visitor++)

const app = new Elysia()
  .use(router)
  .get("/", () => "Hello Elysia").listen(3000);



console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
