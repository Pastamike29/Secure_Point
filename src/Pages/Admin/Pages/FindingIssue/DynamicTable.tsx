import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from '@mui/material';
import { parse, format, isValid } from 'date-fns';
import { Edit, Delete, Close } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { debounce } from 'lodash'; // Ensure you install lodash (npm install lodash)


interface FindingIssue {
  _id: string;
  [key: string]: any; // Allow any dynamic keys for properties
}

interface DynamicTableProps {
  issues: FindingIssue[];
  fetchFindingIssues: () => Promise<void>; // Add this line
  onDeleteIssue: (issueId: string) => void;
}


const DynamicTable: React.FC<DynamicTableProps> = ({ issues,
  onDeleteIssue, }) => {

  const [localIssues, setLocalIssues] = useState<FindingIssue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<FindingIssue[]>(issues);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: '',
    direction: 'asc',
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [applicationNumberFilter, setApplicationNumberFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [foundDateFilter, setFoundDateFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [riskRatingFilter, setRiskRatingFilter] = useState('');
  const [totalIssues, setTotalIssues] = useState(0); // ✅ Corrected state declaration

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<FindingIssue | null>(null);
  const currentPageIssues = localIssues; // ✅ Directly use API-fetched issues
  const [loading, setLoading] = useState(false); // Track loading state


  useEffect(() => {
    console.log("Current page issues:", currentPageIssues); // Debug log
  }, [currentPageIssues]);


  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const normalizeKey = (key: string) => key.toLowerCase().replace(/\s+/g, '');

  const columnOrder = [
    'Application Number',
    'Application Name',
    'Scope',
    'Application Contact',
    'Department',
    'Chief',
    'Risk Rating',
    'Status',
    'Status remark',
    'GRC log',
    'Notify Owner',
    'Last Date Notify Owner',
    'Finding Issue',
    'Description',
    'Recommendation',
    'Found Date',
    'Fixed Criteria',
    'Overdue Date',
    'Overdue',
    'Overdue Status',
    'Overdue.1',
    'Pentester',
    'Testing Scope',
    'Remark',
    'No. Open of GRC ',
    'Remark GRC',
  ];

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const riskRatingOptions = [
    { value: 'Informative', label: 'Informative' },
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Critical', label: 'Critical' },
  ];

  const fetchFindingIssues = useCallback(
    async (currentPage = 0, currentRowsPerPage = rowsPerPage, searchQuery?: string) => {
      try {
        setLoading(true);
        
        // ✅ Ensure latest search query is sent
        const finalSearchQuery = searchQuery !== undefined ? searchQuery : searchTerm;
  
        console.log(`🚀 Fetching data for page=${currentPage}, rowsPerPage=${currentRowsPerPage}, search="${finalSearchQuery}"`);
  
        const response = await axios.get(`http://localhost:5000/findingIssue`, {
          params: {
            page: currentPage + 1,
            limit: currentRowsPerPage,
            search: finalSearchQuery || '', // ✅ Ensures an empty string is sent when no search term
          },
        });
  
        const { finding_issues, total_issues } = response.data;
        console.log(`✅ Received ${finding_issues.length} issues from API`);
  
        setLocalIssues(finding_issues);
        setFilteredIssues(finding_issues);
        setTotalIssues(total_issues);
        setPage(currentPage);
      } catch (error) {
        console.error('❌ Error fetching finding issues:', error);
        setLocalIssues([]);
        setFilteredIssues([]);
      } finally {
        setLoading(false);
      }
    },
    [rowsPerPage, searchTerm]
  );
  



  useEffect(() => {
    console.log(`Current state: page=${page}, rowsPerPage=${rowsPerPage}, searchTerm="${searchTerm}"`);
    setLocalIssues(issues);

  }, [page, rowsPerPage, searchTerm]), [issues];

  useEffect(() => {
    setFilteredIssues(localIssues);
  }, [localIssues]);


  const handleEditSave = async () => {
    if (editingIssue) {
      const { _id, ...updateData } = editingIssue;

      try {
        const response = await axios.put(
          `http://localhost:5000/findingIssue/${_id}`,
          updateData
        );

        if (response.status === 200) {
          toast.success('Issue updated successfully!');

          // Force refresh the window
          window.location.reload();
        }
      } catch (error) {
        toast.error('Failed to update issue.');
      }
    }
  };



  const handleDeleteClick = async (issueId: string) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      await onDeleteIssue(issueId);

      // Refresh data and reset to the first page
      await fetchFindingIssues(0, rowsPerPage);
    }
  };

  // Filter columns to exclude ones where all values are NaN or undefined
  const validColumns = issues.length
    ? columnOrder.filter((column) =>
      issues.some((issue) => issue[column] !== undefined && issue[column] !== null && issue[column] !== 'N/A')
    )
    : [];


  const getNormalizedValue = (issue: FindingIssue, column: string) => {
    const normalizedKey = normalizeKey(column);
    const matchingKey = Object.keys(issue).find(
      (key) => normalizeKey(key) === normalizedKey
    );

    if (matchingKey && issue[matchingKey] !== null && issue[matchingKey] !== undefined) {
      return issue[matchingKey];
    }

    // Return a default value instead of "N/A"
    return '';
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    try {
      // Parse the date in the expected format (YYYY-MM-DD)
      const parsedDate = dayjs(date, 'YYYY-MM-DD');
      return parsedDate.isValid() ? parsedDate.format('DD/MM/YYYY') : 'N/A';
    } catch {
      return 'N/A';
    }
  };


  useEffect(() => {
    setFilteredIssues(localIssues);
  }, [localIssues]);

  useEffect(() => {
    const formattedIssues = issues.map((issue) => ({
      ...issue,
      'Found Date': issue['Found Date']
        ? dayjs(issue['Found Date']).format('YYYY-MM-DD')
        : null,
      'Overdue Date': issue['Overdue Date']
        ? dayjs(issue['Overdue Date']).format('YYYY-MM-DD')
        : null,
    }));

    setLocalIssues(formattedIssues);
  }, [issues]);

  useEffect(() => {
    let filtered = localIssues.filter((issue) => {
      return Object.values(issue).some((value) =>
        value
          ? String(value).toLowerCase().includes(searchTerm.toLowerCase()) // Apply search term filter
          : false
      );
    });

    if (applicationNumberFilter) {
      filtered = filtered.filter((issue) =>
        String(issue['Application Number'])
          .toLowerCase()
          .includes(applicationNumberFilter.toLowerCase())
      );
    }

    if (foundDateFilter) {
      filtered = filtered.filter((issue) => {
        const foundDate = new Date(issue['Found Date']);
        const filterDate = new Date(foundDateFilter);
        return (
          foundDate.getFullYear() === filterDate.getFullYear() &&
          foundDate.getMonth() === filterDate.getMonth() &&
          foundDate.getDate() === filterDate.getDate()
        );
      });
    }

    console.log(`✅ Filtered issues count: ${filtered.length}`);
    setFilteredIssues(filtered);
    setPage(0); // Reset pagination on new search results
  }, [searchTerm, applicationNumberFilter, foundDateFilter, localIssues]);



  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    await fetchFindingIssues(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to the first page when rows per page changes
    await fetchFindingIssues(0, newRowsPerPage);
  };

  const debouncedFetchIssues = useCallback(debounce((searchValue: string) => {
    fetchFindingIssues(0, rowsPerPage, searchValue);
  }, 500), [rowsPerPage]); // ✅ Calls API only after 500ms of inactivity

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.trim();
    setSearchTerm(searchValue);
    debouncedFetchIssues(searchValue);
  };

  const uniqueApplicationNumbers = Array.from(
    new Set(issues.map((issue) => issue['Application Number']))
  ).sort();


  const uniqueFoundDates = Array.from(
    new Set(issues.map((issue) => issue['Found Date'])))
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((date) => new Date(date).toLocaleDateString()); // Keep the locale formatting for UI display

  const uniqueYears = Array.from(
    new Set(issues.map((issue) => new Date(issue['Found Date']).getFullYear()))
  ).sort();

  const uniqueMonths = Array.from(
    new Set(
      issues
        .map((issue) => {
          const foundDate = issue['Found Date'];
          if (!foundDate) return null; // Skip if Found Date is missing
          const parsedDate = new Date(foundDate);
          return isValid(parsedDate) ? parsedDate.getMonth() : null; // Extract numeric month if valid
        })
        .filter((month) => month !== null) // Filter out invalid months
    )
  )
    .sort((a, b) => a - b) // Sort months numerically
    .map((month) => ({
      value: month + 1, // 1-based month value
      label: monthNames[month], // Get month name
    }));

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Adjust multiplier for speed
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };


  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleEditClick = (issueId: string) => {
    const issue = localIssues.find((item) => item._id === issueId);

    if (!issue) {
      toast.error("Issue not found in local issues.");
      console.error("Local issues:", localIssues);
      console.error("Issue ID:", issueId);
      return;
    }

    console.log("Selected issue for editing:", issue);

    const formattedIssue = { ...issue };
    formattedIssue['Found Date'] = issue['Found Date']
      ? dayjs(issue['Found Date']).format('YYYY-MM-DD')
      : null;
    formattedIssue['Overdue Date'] = issue['Overdue Date']
      ? dayjs(issue['Overdue Date']).format('YYYY-MM-DD')
      : null;

    setEditingIssue(formattedIssue);
    setEditDialogOpen(true);
  };


  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditingIssue(null);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2, width: '100%' }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <Typography variant="h6">Application Number</Typography>
          <Select
            value={applicationNumberFilter}
            onChange={(e) => setApplicationNumberFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            {uniqueApplicationNumbers.map((number, index) => (
              <MenuItem key={index} value={number}>
                {number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <Typography variant="h6">Found Date</Typography>
          <Select
            value={foundDateFilter}
            onChange={(e) => setFoundDateFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            {uniqueFoundDates.map((date, index) => (
              <MenuItem key={index} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <Typography variant="h6">Years</Typography>
          <Select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            {uniqueYears.map((year, index) => (
              <MenuItem key={index} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <Typography variant="h6">Months</Typography>
          <Select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            {uniqueMonths.map((month, index) => (
              <MenuItem key={index} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <Typography variant="h6">Risk Rating</Typography>
          <Select
            value={riskRatingFilter}
            onChange={(e) => setRiskRatingFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            {riskRatingOptions.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {validColumns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? ( // Show a loading message
              <TableRow>
                <TableCell colSpan={validColumns.length + 1} align="center">
                  <Typography variant="body1">Loading data...</Typography>
                </TableCell>
              </TableRow>
            ) : currentPageIssues.length > 0 ? ( // Show data if available
              currentPageIssues.map((issue) => (
                <TableRow key={issue._id}>
                  {validColumns.map((column) => {
                    const value = getNormalizedValue(issue, column);
                    const isDateColumn = ['Found Date', 'Overdue Date'].includes(column);
                    const displayValue = isDateColumn && value ? formatDate(value) : value || '';
                    return <TableCell key={column}>{displayValue}</TableCell>;
                  })}
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditClick(issue._id)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClick(issue._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={validColumns.length + 1} align="center">
                  <Typography variant="body1">No data available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Finding Issue</DialogTitle>
        <DialogContent>
          {editingIssue &&
            Object.keys(editingIssue).map((key) => {
              if (key === 'Found Date' || key === 'Overdue Date') {
                return (
                  <LocalizationProvider dateAdapter={AdapterDayjs} key={key}>
                    <DatePicker
                      label={key}
                      value={editingIssue[key] ? dayjs(editingIssue[key]) : null}
                      onChange={(newValue) => {
                        setEditingIssue((prev) =>
                          prev
                            ? {
                              ...prev,
                              [key]: newValue ? newValue.format('YYYY-MM-DD') : null,
                            }
                            : null
                        );
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          margin: 'normal',
                        },
                      }}
                    />
                  </LocalizationProvider>

                );
              } else if (key === 'Risk Rating') {
                return (
                  <TextField
                    key={key}
                    fullWidth
                    select
                    label={key}
                    value={editingIssue[key] || ''}
                    onChange={(e) =>
                      setEditingIssue((prev) =>
                        prev ? { ...prev, [key]: e.target.value } : null
                      )
                    }
                    margin="normal"
                  >
                    <MenuItem value="Critical">Critical</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Informative">Informative</MenuItem>
                  </TextField>
                );
              } else if (key === 'Status' || key === 'Overdue Status') {
                return (
                  <TextField
                    key={key}
                    fullWidth
                    select
                    label={key}
                    value={editingIssue[key] || ''}
                    onChange={(e) =>
                      setEditingIssue((prev) =>
                        prev ? { ...prev, [key]: e.target.value } : null
                      )
                    }
                    margin="normal"
                  >
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Close">Close</MenuItem>
                  </TextField>
                );
              } else {
                return (
                  <TextField
                    key={key}
                    fullWidth
                    label={key}
                    value={editingIssue[key] || ''}
                    onChange={(e) =>
                      setEditingIssue((prev) =>
                        prev ? { ...prev, [key]: e.target.value } : null
                      )
                    }
                    margin="normal"
                  />
                );
              }
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalIssues}  // ✅ Use the correct variable name
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />



    </div >
  );
};

export default DynamicTable;