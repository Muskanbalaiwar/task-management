const tasks = await sequelize.query(
  'SELECT * FROM sp_get_user_tasks(:p_user_id, :p_page, :p_limit, :p_search)',
  {
    replacements: {
      p_user_id: req.user.id,
      p_page: parseInt(page),
      p_limit: parseInt(limit),
      p_search: search ? `%${search}%` : null
    },
    type: QueryTypes.SELECT
  }
);
