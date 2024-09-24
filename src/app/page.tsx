import HomePage from "./(pages)/home/page"
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default async function Home() {
  return (
    <HomePage />
  )
}


