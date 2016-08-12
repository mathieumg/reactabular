Given Reactabular is flexible by design, it's not the easiest to use and you may have to do quite a bit of wiring to make it work the way you want. `reactabular-easy` has been designed to make using it easier. It is opinionated and takes away some power. But on the plus side it allows you to render a fully featured table faster.

To make the drag and drop functionality work, you have to set up [react-dnd-html5-backend](https://www.npmjs.com/package/react-dnd-html5-backend) or some other React DnD backend.

```jsx
/*
import React from 'react';
import { search, Search, SearchColumns } from 'reactabular';
import EasyTable from 'reactabular-easy';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import cloneDeep from 'lodash/cloneDeep';

import { generateRows, VisibilityToggles } from './helpers';
*/

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    company: {
      type: 'string'
    },
    age: {
      type: 'integer'
    },
    boss: {
      $ref: '#/definitions/boss'
    }
  },
  required: ['id', 'name', 'company', 'age', 'boss'],
  definitions: {
    boss: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      },
      required: ['name']
    }
  }
};
const rows = generateRows(30, schema);

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows,
      columns: this.getColumns(),
      query: {}
    };

    this.onToggleColumn = this.onToggleColumn.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onSort = this.onSort.bind(this);
  }
  getColumns() {
    return [
      {
        header: {
          label: 'Demo',
          draggable: true,
          sortable: true,
          resizable: true,
          format: () => <span>Testing</span>
        },
        cell: {
          format: () => <span>Demo</span>
        },
        width: 100,
        visible: true
      },
      {
        header: {
          label: 'Name',
          draggable: true,
          sortable: true,
          resizable: true
        },
        cell: {
          property: 'name',
          highlight: true
        },
        width: 250,
        visible: true
      },
      {
        header: {
          label: 'Age',
          draggable: true,
          sortable: true,
          resizable: true
        },
        cell: {
          property: 'age',
          highlight: true
        },
        width: 150,
        visible: true
      },
      {
        header: {
          label: 'Company',
          draggable: true,
          sortable: true,
          resizable: true
        },
        cell: {
          property: 'company',
          highlight: true
        },
        width: 250,
        visible: true
      },
      {
        header: {
          label: 'Boss',
          draggable: true,
          sortable: true,
          resizable: true
        },
        cell: {
          property: 'boss.name',
          highlight: true
        },
        width: 200,
        visible: false
      },
      {
        cell: {
          format: (value, { rowData }) => (
            <div>
              <input
                type="button"
                value="Click me"
                onClick={() => alert(`${JSON.stringify(rowData, null, 2)}`)}
              />
              <span
                className="remove"
                onClick={() => this.onRemove(rowData.id)}
                style={{ marginLeft: '1em', cursor: 'pointer' }}
              >
                &#10007;
              </span>
            </div>
          )
        },
        width: 200,
        visible: true
      }
    ];
  }
  render() {
    const { columns, rows, query } = this.state;
    const cols = this.state.columns.filter(column => column.visible);

    return (
      <div>
        <VisibilityToggles
          columns={columns}
          onToggleColumn={this.onToggleColumn}
        />

        <div className="search-container">
          <span>Search</span>
          <Search
            query={query}
            columns={cols}
            rows={rows}
            onChange={query => this.setState({ query })}
          />
        </div>

        <EasyTable
          rows={rows}
          rowKey="id"
          sortingColumns={{}}
          tableWidth={800}
          tableHeight={400}
          columns={cols}
          query={query}
          classNames={{
            table: {
              wrapper: 'pure-table pure-table-striped'
            }
          }}
          selectedRowId="id"
          headerExtra={
            <SearchColumns
              query={query}
              columns={columns}
              onChange={query => this.setState({ query })}
            />
          }
          onDragColumn={this.onDragColumn}
          onMoveColumns={this.onMoveColumns}
          onSelectRow={this.onSelectRow}
          onSort={this.onSort}
          onRow={this.onRow}
        />
      </div>
    );
  }
  onDragColumn(width, columnIndex) {
    console.log('onDragColumn', width, columnIndex);
  }
  onMoveColumns(columns) {
    console.log('onMoveColumns', columns);
  }
  onSelectRow({ selectedRowId, selectedRow }) {
    console.log('onSelectRow', selectedRowId, selectedRow);
  }
  onSort(sortingColumns) {
    console.log('onSort', sortingColumns);
  }
  onRow(row, rowIndex) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row'
    };
  }
  onToggleColumn(columnIndex) {
    const columns = cloneDeep(this.state.columns);

    columns[columnIndex].visible = !columns[columnIndex].visible;

    this.setState({ columns });
  }
  onRemove(id) {
    const rows = cloneDeep(this.state.rows);
    const idx = findIndex(rows, { id });

    // this could go through flux etc.
    rows.splice(idx, 1);

    this.setState({ rows });
  }
}

const DragAndDropDemo = DragDropContext(HTML5Backend)(Demo);

<DragAndDropDemo />
```

## Styling

It is possible to pass custom `classNames` and `styles` as listed below:

```js
classNames: {
  table: null,
  header: {
    wrapper: null
    // TODO
    /*
    row: null,
    cell: null
    */
  },
  body: {
    wrapper: null
    // TODO
    /*
    row: null,
    cell: null
    */
  }
},
styles: {
  resize: {
    container: {},
    value: {},
    handle: {}
  },
  sort: {
    container: {},
    value: {},
    order: {}
  }
}
```

For more control, you can also override `components` and also inject styling and class names through the column definition and the `onRow` handler.