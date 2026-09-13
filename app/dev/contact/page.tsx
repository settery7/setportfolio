/* Contact moved to a section at the foot of /dev. This route stays alive as a
   redirect rather than being deleted, because the URL has already been shared
   and a 404 is a worse outcome than an extra hop. */

import { redirect } from "next/navigation";

export default function ContactPage() {
  redirect("/dev#contact");
}
