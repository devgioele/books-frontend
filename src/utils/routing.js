// Returns true iff the first route is an ancestor of the second route.
export default function routeIsAncestor(ancestor, route) {
  return route.startsWith(ancestor);
}
