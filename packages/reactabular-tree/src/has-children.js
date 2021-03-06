function hasChildren({
  rows,
  index,
  id = 'id',
  parent = 'parent'
}) {
  // See if the next item points to the current one.
  // This relies on rows order!
  const currentItem = rows[index];
  const nextItem = rows[index + 1];

  const ret = nextItem && currentItem[id] === nextItem[parent];

  return ret;
}

export default hasChildren;
