// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

module.exports = ({ actions: { createTypes, createFieldExtension }, createContentDigest }) => {
  createFieldExtension({
    name: 'mdx',
    extend() {
      return {
        type: 'String',
        resolve(source, args, context, info) {
          // Grab field
          const value = source[info.fieldName];

          if (typeof value !== 'string') {
            return value;
          }

          // Isolate MDX
          const mdxType = info.schema.getType('Mdx');

          // Grab just the body contents of what MDX generates
          const { resolve } = mdxType.getFields().body;

          return resolve(
            {
              internal: {
                contentDigest: createContentDigest(value), // Used for caching
              },
              rawBody: value,
              context,
              args,
            },
            info,
          );
        },
      };
    },
  });

  const typeDefs = `
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      links: [LinkValues]
    }
    type LinkValues {
      mdx: String @mdx
    }
  `;

  createTypes(typeDefs);
};
