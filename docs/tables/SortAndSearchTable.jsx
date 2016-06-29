/* eslint-disable no-shadow */
import React from 'react';
import findIndex from 'lodash/findIndex';
import { Search } from '../helpers';
import orderBy from 'lodash/orderBy';
import {
  Table, sort, transforms, search
} from '../../src';

export default class SortAndSearchTable extends React.Component {
  constructor(props) {
    super(props);

    const sortable = transforms.sort({
      // Point the transform to your data. React state can work for this purpose
      // but you can use a state manager as well.
      getSortingColumns: () => this.state.sortingColumns || [],

      // The user requested sorting, adjust the sorting state accordingly.
      // This is a good chance to pass the request through a sorter.
      onSort: selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumns({ // sort.byColumn would work too
            sortingColumns: this.state.sortingColumns,
            selectedColumn
          })
        });
      }
    });
    const sortableHeader = sortHeader.bind(null, () => this.state.sortingColumns);

    const resetable = () => () => ({
      onDoubleClick: () => this.setState({
        sortingColumns: []
      })
    });

    this.state = {
      query: {}, // Search query
      sortingColumns: null, // reference to the sorting columns
      columns: [
        {
          header: {
            label: 'Name',
            // Resetable operates on cell level while sorting is handled by
            // an element within -> no conflict between click and double click.
            transforms: [resetable()],
            format: sortableHeader(sortable('name'))
          },
          cell: {
            property: 'name'
          }
        },
        {
          header: {
            label: 'Age',
            transforms: [resetable()],
            format: sortableHeader(sortable('age'))
          },
          cell: {
            property: 'age'
          }
        }
      ],
      data: [
        {
          id: 100,
          name: 'Adam',
          age: 11
        },
        {
          id: 101,
          name: 'Brian',
          age: 42
        },
        {
          id: 102,
          name: 'Brian',
          age: 22
        },
        {
          id: 103,
          name: 'Jake',
          age: 88
        },
        {
          id: 104,
          name: 'Jill',
          age: 7
        },
        {
          id: 105,
          name: 'Jill',
          age: 88
        }
      ]
    };
  }
  render() {
    const { data, columns, sortingColumns, query } = this.state;
    const searchedData = search.multipleColumns({ data, columns, query });
    const sortedData = sort.sorter({ data: searchedData, sortingColumns, sort: orderBy });

    return (
      <div>
        <div className="search-container">
          <span>Search</span>
          <Search
            columns={columns}
            data={data}
            onChange={query => this.setState({ query })}
          />
        </div>
        <Table columns={columns} data={sortedData} rowKey="id">
          <Table.Header />

          <Table.Body />
        </Table>
      </div>
    );
  }
}

function sortHeader(getSortingColumns, sortable) {
  return (value, { column }) => {
    const property = column.cell && column.cell.property;
    const sortingColumns = getSortingColumns();
    const idx = findIndex(sortingColumns, { property });

    return (
      <div style={{ display: 'inline' }}>
        <span className="value">{value}</span>
        {idx >= 0 &&
          <span className="sort-order" style={{ marginLeft: '0.5em' }}>
            {idx + 1}
          </span>
        }
        {sortable.toFormatter()}
      </div>
    );
  };
}
