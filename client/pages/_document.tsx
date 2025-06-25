import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Health Care Medical Html5 Template" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="author" content="Themefisher" />
        <meta name="generator" content="Themefisher Novena HTML Template v1.0" />


        <meta name="theme-name" content="novena" />


        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.png" />


        <link rel="stylesheet" href="/plugins/bootstrap/bootstrap.min.css" />
        <link rel="stylesheet" href="/plugins/icofont/icofont.min.css" />
        <link rel="stylesheet" href="/plugins/slick-carousel/slick/slick.css" />
        <link rel="stylesheet" href="/plugins/slick-carousel/slick/slick-theme.css" />


        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <body>
        <Main />

        <script src="/plugins/jquery/jquery.js"></script>
        <script src="/plugins/bootstrap/bootstrap.min.js"></script>
        <script src="/plugins/slick-carousel/slick/slick.min.js"></script>
        <script src="/plugins/shuffle/shuffle.min.js"></script>


        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAkeLMlsiwzp6b3Gnaxd86lvakimwGA6UA"></script>
        <script src="/plugins/google-map/gmap.js"></script>

        <script src="js/script.js"></script>
        <NextScript />
      </body>
    </Html>
  )
}
