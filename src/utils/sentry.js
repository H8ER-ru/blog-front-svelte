import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";
import { SENTRY_URl } from "./variables";

const sentry = () => {
  Sentry.init({
    dsn: SENTRY_URl,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
    release: '1.0',
  });
}

export default sentry