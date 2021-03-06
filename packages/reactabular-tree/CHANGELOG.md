5.2.1 / 2016-09-30
==================

  * Bug fix - If `className` is not provided to `tree.toggleChildren`, do not render `undefined` as a class. Also dropped extra `console.log`.

5.2.0 / 2016-09-30
==================

  * Bug fix - Calculate `tree.getParents` correctly for root level nodes without parents. Previously that gave false positives.
  * Feature - Annotate `tree.toggleChildren` with `has-children` and `has-parent` classes. Easier to style this way.

5.1.0 / 2016-09-29
==================

  * Feature - Add `tree.flatten` to allow transforming a nested tree structure into a flat structure used by the algorithms.

4.3.0 / 2016-09-27
==================

  * Improvement - Let `toggleChildren` toggle when cell is clicked. If you want the old behavior, override `onClick` through `props`.
  * Improvement - Add `collapseAll` and `expandAll` helpers.

4.2.0 / 2016-09-23
==================

  * Improvement - Allow `toggleChildren` to accept `props` for customization.

3.0.5 / 2016-09-02
==================

  * Improvement - Allow `id` to be passed to `filter`.

3.0.4 / 2016-09-02
==================

  * Improvement - Allow `toggleChildren` `id` to be customized (not just "id" anymore).

3.0.2 / 2016-09-01
==================

  * Improvement - Include suggested default styling for the toggle arrow.

3.0.1 / 2016-09-01
==================

  * Bug fix - Pass `strategy` to `sorter` at `tree.sort`.

3.0.0 / 2016-09-01
==================

  * Breaking - Rewrite API. Now most parts accept objects and you can also customize field names.
  * Improvement - Add `tree.sort` to wrap toggling row children.

2.0.0 / 2016-08-16
==================

  * Initial release.
