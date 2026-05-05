import { SITE_URL, SITE_NAME, DEFAULT_OG, type RouteSEO } from '../data/seo'

interface SEOProps extends Partial<RouteSEO> {
  noindex?: boolean
}

export default function SEO({
  title = 'Muni Goutham — Product & UX Designer',
  description = 'Product & UX designer building thoughtful digital experiences.',
  path = '/',
  image = DEFAULT_OG,
  type = 'website',
  noindex = false,
}: SEOProps) {
  const url = `${SITE_URL}${path}`
  const ogImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  )
}
