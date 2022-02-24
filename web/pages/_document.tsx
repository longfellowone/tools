import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=option"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#18181b"></meta>
      </Head>
      <body className="bg-zinc-900 text-zinc-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
