import React from 'react';
import MaterialTable from 'material-table';

export class DataTable extends React.Component {
  render() {
    return (
      <MaterialTable
        title={this.props.title}
        columns={this.props.columns ? this.props.columns : [
          { title: 'First Name', field: 'fname' },
          { title: 'Last Name', field: 'lname' },
          { title: 'Nickname', field: 'nickname' },
          { title: 'Community', field: 'communityname' },
          { title: 'Data Collector', field: 'surveyingUser' },
          { title: 'Created At', field: 'createdAt' },
          { title: 'Updated At', field: 'updatedAt' },
        ]}
        data={this.props.data}        
        options={{
          filtering: true,
          grouping: true
        }}
      />
    )
  }

  
}