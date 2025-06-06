import {Elysia} from "elysia";
import {t} from 'elysia'
import {customBody} from "./customerBody";
import {swagger} from '@elysiajs/swagger'

const store = new Elysia()
  .state({visitor: 0})

const router = new Elysia()
  .use(store)
  .get('/increase', ({store}) => store.visitor++)

abstract class Controller {
  static greet({name}: { name: string }) {
    return 'hello ' + name
  }
}

abstract class Service {
  static fibo(number: number): number {
    if (number < 2)
      return number

    return Service.fibo(number - 1) + Service.fibo(number - 2)
  }
}

const AuthService = new Elysia({name: 'Service.Auth'})
  .derive({as: 'scoped'}, ({cookie: {session}}) => ({
    // This is equivalent to dependency injection
    Auth: {
      user: session.value
    }
  }))
  .macro(({onBeforeHandle}) => ({
    // This is declaring a service method
    isSignIn(value: boolean) {
      onBeforeHandle(({Auth, status}) => {
        if (!Auth?.user || !Auth.user) return status(401)
      })
    }
  }))

const UserController = new Elysia()
  .use(AuthService)
  .get('/profile', ({Auth: {user}}) => user, {
    isSignIn: true
  })

const app = new Elysia()
  .use(router)
  .use(swagger())
  .get("/", () => "Hello Elysia")
  .post('/test', ({body}) => Controller.greet(body), {
    body: t.Object({
      name: t.String()
    })
  })
  .get('/fibo', ({body}) => {
    return Service.fibo(body)
  }, {
    body: t.Numeric()
  })
  .post('/login', ({body}) => {
    return body
  }, {
    body: customBody
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
