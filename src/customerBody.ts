// ✅ Do
import { Elysia, t } from 'elysia'

const customBody = t.Object({
	username: t.String(),
	password: t.String()
})

// Optional if you want to get the type of the model
// Usually if we didn't use the type, as it's already inferred by Elysia
type CustomBody = typeof customBody.static



export { customBody }