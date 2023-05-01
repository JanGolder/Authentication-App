// funkcja która dodaje action ale bez komponentu

import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("token");
  return redirect("/");
}
