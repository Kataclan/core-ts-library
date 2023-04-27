# fecore

## Intention

This project is the layer that lays between any frontend (consumers, mission control, rina, etc) and our Backend system.

Here we encapsulate all the entities (PassengerType, RecurringProduct, etc) and their transformer methods.

We also include Repositories that have a set of methods to read and write data back and forth, returning a promise that we can resolve.

## Clone

- Clone the repo `git clone git@bitbucket.org:zeelo/fecore.git`
- Install dependencies with `npm ci`.
- Run locally with `npm start`.

## Project structure

1. `src`: Where the source code is located at.

## Parsers

Ideally, the signature of the `adapt`/`prepare` methods will never be `any`. We may create our own typescript types to shape this
so other developers can anticipate what will be coming.

It can also help us when integrating Backend responses.

### Adapt

Transform JSON data received from an API call into our Domain entities.

Adapter methods receive:

- The JSON from which we will extract data.
- The entity to which we will inject data. By default it creates a new one, but we can reuse an already created one in case we need to chain adapters or something.

Adapter methods return:

- An instance of given class.

```typescript
function adapt<T>(json: any, instance: T = new T()): T {
  // Your adapt code goes here.
  return instance;
}

function adaptPassengerType(json: any, instance: PassengerType = new PassengerType()): PassengerType {
  // Your adapt code goes here.
  return instance;
}
```

We use it like this:

```javascript
const passengerType = adaptPassengerType(json);
```

The second parameter is optional, defaulting to `new PassengerType()` (every adapter have -or should- their own default instance).

### Prepare

Transform one of our Domain entities into a JSON to be sent to backend through an API call.

Adapter methods receive:

- The entity from which data will be read.

```typescript
function prepare<T>(instance: T = new T()): any {
  // Your prepare code goes here.
  return {};
}

function preparePassengerType(instance: PassengerType = new PassengerType()): any {
  // Your prepare code goes here.
  return {};
}
```

We use it like this:

```javascript
const json = adaptPassengerType(passengerType);
```

## Repositories

When we need to create, read, update, delete entities, or any other action, we will do it through their repositories.

Repositories will have all the needed methods to read, write, etc.

Example:

```javascript
function PassengerTypeRepository() {
  function find(id) {
    return requestGet(`/passenger-types/${id}`, {
      adapt: adaptPassengerType,
    });
  }
}
```

Here the naming convention (basics):

- `find`: find a resource by ID.
- `findBy`: find resources given a query string.
- `findAll`: find all resources given a query string, resolving all the pages.
- `create`: POST a new resource to create it.
- `update`: PATCH a new resource to update it.
- `delete`: PATCH a new resource to disable it.

Here some examples for advanced methods:

- `findBySupplierId`: receives a supplier ID and prepares the query string for us so we do not have to worry about it.

```typescript
function VehicleRepository() {
  function findBySupplierId(supplierId) {
    return requestGet('/vehicles', {
      adapt: adaptPassengerType,
      qs: [['filter_by[supplier_id]', supplierId]],
    });
  }
}
```

## Scripts

- `npm start`: Runs the project in `dev` mode.
- `npm run build`: Bundles the project, production ready, minimizing and obfuscating the output.
- `npm run analyze`: Analyzes how big the chunks of the production build are.
- `npm run lint`: Runs eslint.
- `npm run formatcode`: Formats the code based on some rules.
- `npm run check`: Run two above scripts, in that order.
- `npm t`: Runs tests.
- `npm link`: Creates the symlink from this folder to .nvm (should you use NVM as node manager) or .node (otherwise) so we can
  work locally with this library.

## Things to take into account

### Market ID Header

Some methods will need some custom headers, like the market ID (same applies to business ID).
To do so, there is no need to pass them manually from the code but a specific key or keys inside query string (QS), which
will tell the `request` method (final step before going to internet) to extract that and put it into the `Marketid` header.

- Option A) `[..., ['filter_by[market_id][]', 'id-1'], ['filter_by[market_id][]', 'id-2'], ...]`
- Option B) `[..., ['market_id', 'id-1,id-2], ...]`

Either way it will transform it into `Marketid: id-1,id-2`.

Best option is A due to its multi value nature and WWW standards.
