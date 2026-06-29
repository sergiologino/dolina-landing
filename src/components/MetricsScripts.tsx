export function MetricsScripts() {
  const googleTagId = import.meta.env.NEXT_PUBLIC_GTAG_ID || import.meta.env.VITE_GTAG_ID;

  return (
    <>
      {googleTagId ? (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} />
          <script>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleTagId}');
          `}</script>
        </>
      ) : null}
    </>
  );
}
