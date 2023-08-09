## Get Started

First Install Dependencies
```
yarn install
```

Next Step would be to create a `.env.local` file at the root.

This file must constain `NEXT_PUBLIC_BACKEND_URL`, this will be the URL of the backend.

If for example the backend URL was `http://localhost:5000`; The contents of the file would be:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

After Creating the env file, launch the frontend using

```
yarn dev
```

Predeployed frontend: https://task-manager-frontend-topaz.vercel.app/