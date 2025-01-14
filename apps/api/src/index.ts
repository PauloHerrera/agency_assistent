import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { router } from "./routes";

const app = new Koa();

const port = process.env.API_PORT;

app.use(bodyParser());
app.use(router.routes());

app.listen(port, () => {
  console.log(`🚀 Server is running on port http://localhost:${port}/`);
});
