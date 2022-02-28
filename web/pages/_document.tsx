import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* Use display=option */}
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_GRAPHQL_URL} crossOrigin="anonymous" />
        <meta name="theme-color" content="#18181b"></meta>
      </Head>
      <body className="bg-zinc-900 text-zinc-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
