# Notes

## What I completed

- List, create, search, year filter, sort
- Images via `<picture>` for the three breakpoints
- Filters go to the API (`model` / `year`). Sort is client-side -- schema has no sort field
- Form is RHF + zod. Makes/models are a hardcoded Audi list so you can't submit blanks from the UI
- Tests for `useGetCars`, `useCreateCar`, and the shared Select/Error bits

## What I left out, and why

- Empty/error UI on the list. Loading has a skeleton, the rest is a bit ugly
- Car detail page. Ran out of time
- Debounce, `useCarFilters`. Filters just live in `useGetCars`

## Decisions and trade-offs

- Very simple unit tests given the time I had
- Used the `features/cars` layout from the readme
- Queries are `.graphql` files, not `gql` strings
- Named the hook `useGetCars` not `useCars`. Split create into its own hook
- After create I push to `/?refresh=true` and refetch. Not proud of it, was the fastest path
- Didn't touch the CI config

## If I had another day

Empty state, proper error, cache update after create, a real integration test for the list/form, then maybe a detail page, and more unit tests.

## Anything you should know to run it

`npm install && npm run dev`.
