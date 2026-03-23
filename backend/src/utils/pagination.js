export const Pagination = (query, queryParams, defaultLimit = 10) => {
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || defaultLimit;

  const skip = (page - 1) * limit;

  return {
    query: query.skip(skip).limit(limit),
    page,
    limit,
  };
};

export const getPaginationParams = (queryParams, defaultLimit = 10) => {
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || defaultLimit;

  return { page, limit };
};
