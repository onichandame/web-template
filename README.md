# Web Template

full stack web app including both frontend and backend.

# Author

[onichandame](https://onichandame.com)

# Project Structure

```text
root
|
--apps
  |
  --backend
  |
  --frontend
  |
  --proxy
```

- **backend:** GraphQL backend listening on port 9002. can be replaced by an [independent project](https://github.com/onichandame/graphql-template/)
- **frontend:** React SPA listening on port 9001. can be replaced by any frontend app
- **proxy:** Proxy server listening on port 3000. Tunneling requests of `/graphql` to port 9002, requests of `/` to port 9001

The frontend and backend are maintained in different repositories. They can be running separately or behind the same proxy. See `package.json` for preset commands.

For small full stack projects, the default backend and the default frontend are enough to work. For larger or collaborative projects it would be better to manage backend and frontend in different repositories. The dev server port and `dev` scripts need to comply with the default.

# Usage

- `yarn dev`: start development servers for all apps
- `yarn build`: build all apps

# Features

1. GraphQL backend
2. CRA frontend

# Known Issues

1. websocket not yet proxied
