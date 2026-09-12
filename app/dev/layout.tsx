/* Chrome for the professional track. Nav and footer wrap every /dev route so
   contact details stay reachable from anywhere in the track. */

import Nav from "@/components/sections/nav";
import Footer from "@/components/sections/footer";

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav track="dev" />
      {children}
      <Footer track="dev" />
    </>
  );
}
