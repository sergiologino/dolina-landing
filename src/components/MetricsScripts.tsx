export function MetricsScripts() {
  const yandexId = import.meta.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || import.meta.env.VITE_YANDEX_METRIKA_ID;
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
      {yandexId ? (
        <script>{`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
          ym(${yandexId}, 'init', { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
        `}</script>
      ) : null}
    </>
  );
}
