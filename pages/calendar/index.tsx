import { CalendarView } from "../../components";
import type { PropsWithChildren, ReactElement } from "react";

import {
  example,
  page,
} from "../../components/Calendar/calendar.css";


function Page({ children }: PropsWithChildren): ReactElement {
  return <div className={page}>{children}</div>;
}

function Block({ children }: PropsWithChildren) {
  return <div className={example}>{children}</div>;
}

export default function CalendarIndex() {
  return (
    <Page>
      <Block>
        <p>header</p>
      </Block>
      <CalendarView date={new Date()} />
      <Block>
        <p>footer</p>
      </Block>
    </Page>
  );
}
