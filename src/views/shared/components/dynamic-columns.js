const html = htm.bind(React.createElement);
const { useState, useEffect, useReducer } = React;

export default function DynamicColumns({ columns, component, key_name, dispatch, elements_to_load }) {

  function set_first_element_as_loaded(column_index) {
    dispatch({
      type: 'first_element_loaded_in_column',
      payload: column_index
    });
  }

  const dom_columns = Array.from(document.querySelectorAll('.column'));
  const smallest_column = dom_columns === null
    ? 0
    : dom_columns
      .reduce(({ index, column }, curr, curr_index) => 
        column === null || curr.clientHeight < column.clientHeight
          ? { index: curr_index, column: curr }
          : { index, column },
        { index: -1, column: null });

  const element_to_load = elements_to_load[0];

  return html`
    <div className="columns">
      ${columns.map((column, i) => html`
        <div className="column" key=${i} id=${`col_${i}`}>
          ${column.map(pic => html`
            <${component} key=${pic[key_name]} ...${pic} className='component' />
          `)}

          ${element_to_load && smallest_column.column !== null && i === smallest_column.index && html`
            <${component} key=${element_to_load[key_name]} ...${element_to_load} 
              onload=${() => set_first_element_as_loaded(smallest_column.index)} className='component loading' />
          `}
        </div>
      `)}
    </div>
  `;
}