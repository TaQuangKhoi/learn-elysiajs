import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger';
import { appRoutes } from './presentation/routes';

const app = new Elysia()
  .use(swagger()) // Tích hợp Swagger để test API
  .use(appRoutes) // Sử dụng các routes đã định nghĩa
  .onError(({ code, error }) => {
    console.error(`Error: ${error.toString()}`);
    return new Response(error.toString(), { status: 500 });
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
