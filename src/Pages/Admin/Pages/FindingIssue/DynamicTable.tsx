     import React, { useEffect, useState } from 'react';
     import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';

     interface FindingIssue {
     _id: string;
     [key: string]: any;  // Allow any dynamic keys for properties
     }

     const DynamicTable = ({ issues }: { issues: FindingIssue[] }) => {
     const [filteredIssues, setFilteredIssues] = useState<FindingIssue[]>(issues);
     const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
          key: '',
          direction: 'asc',
     });

     // Define your custom column order here
     const columnOrder = ['Application Number','Application Name','Application Contact','Department','Chief',
          'Risk Rating','Status','Finding Issue','Description','Recommendation',' Found Date' ,'Pentester', 'Testing Scope', 'overdue','overdueStatus'];

     useEffect(() => {
          const sortedIssues = [...issues].sort((a, b) => {
               const aValue = a[sortConfig.key];
               const bValue = b[sortConfig.key];

               if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
               if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
               return 0;
          });
          setFilteredIssues(sortedIssues);
     }, [issues, sortConfig]);

     // Filter out columns that aren't present in the first issue
     const columns = columnOrder.filter(column => filteredIssues.length > 0 && column in filteredIssues[0]);

     // Function to handle sorting when clicking on a header
     const handleSort = (key: string) => {
          let direction: 'asc' | 'desc' = 'asc';
          if (sortConfig.key === key && sortConfig.direction === 'asc') {
               direction = 'desc';
          }
          setSortConfig({ key, direction });
     };

     return (
          <TableContainer component={Paper}>
               <Table>
                    {/* Dynamic Table Header */}
                    <TableHead>
                         <TableRow>
                         {columns.length > 0
                              ? columns.map((key) => (
                                   <TableCell
                                        key={key}
                                        sx={{
                                             backgroundColor: '#1976d2',
                                             color: 'white',
                                             fontWeight: 'bold',
                                             textAlign: 'center',
                                             cursor: 'pointer',
                                        }}
                                        onClick={() => handleSort(key)} // Handle sorting on column click
                                   >
                                        {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                        {sortConfig.key === key && (
                                             sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
                                        )}
                                   </TableCell>
                                   ))
                              : <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>No Columns Available</TableCell>}
                         </TableRow>
                    </TableHead>

                    {/* Dynamic Table Body */}
                    <TableBody>
                         {filteredIssues.length > 0 ? (
                         filteredIssues.map((issue, index) => (
                              <TableRow key={issue._id || index}>
                                   {columns.map((key) => {
                                        const value = issue[key as keyof FindingIssue];
                                        return (
                                             <TableCell key={key}>
                                             {value === null || value === undefined
                                                  ? 'N/A'
                                                  : typeof value === 'object' && value !== null
                                                  ? JSON.stringify(value)  // Handle nested objects/arrays
                                                  : value}
                                             </TableCell>
                                        );
                                   })}
                              </TableRow>
                         ))
                         ) : (
                         <TableRow>
                              <TableCell colSpan={columns.length || 1} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                   No Data Available
                              </TableCell>
                         </TableRow>
                         )}
                    </TableBody>
               </Table>
          </TableContainer>
     );
     };

     export default DynamicTable;
