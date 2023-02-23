### Instructions to Run the Server

---

#### Generate the pages needed for the webapp to work.

```shell
cd src
python3 -m generator.generate
```

This should generate the pages needed at `src/generated/`.

#### Run the server.

```shell
node server.js
```

#### Open the application by going to `localhost:20000`.