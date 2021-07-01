module.exports = async function ({ graphql, page, createAdvancedPage }) {
  const result = await graphql(`
    {
      allMdx(filter: { frontmatter: { type: { eq: "novelties" } } }) {
        totalCount
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  // next or prev ? check this: https://stevenmercatante.com/add-prev-and-next-article-links-in-gatsby

  createAdvancedPage({
    route: 'novelties',
    pagination: {
      route: 'novelties.paginated',
      count: result.data.allMdx.totalCount,
      limit: 1,
    },
  });
};
