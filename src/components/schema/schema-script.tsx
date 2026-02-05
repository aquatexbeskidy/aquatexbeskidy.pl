interface SchemaScriptProps {
  data: unknown
}

export function SchemaScript({ data }: SchemaScriptProps) {
  const jsonLd = JSON.stringify(data, null, 2)
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{
        __html: jsonLd,
      }}
      type='application/ld+json'
    />
  )
}
