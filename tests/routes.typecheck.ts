import type { Route } from 'next'

// These assertions fail typecheck if generated route checking stops working.
const validRoute = '/about' satisfies Route
// @ts-expect-error A misspelled page must be rejected.
const invalidRoute: Route = '/aboot'
// @ts-expect-error The blog route only has one slug segment.
const invalidNestedRoute: Route = '/blog/post/extra'

void [validRoute, invalidRoute, invalidNestedRoute]
