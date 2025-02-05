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
  SelectChangeEvent,
} from '@mui/material';
import { Edit, Delete, Close } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';


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

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: '', // Default: No sorting
    direction: 'asc', // Default sorting direction
  });

  const riskRatingPriority = {
    "Critical": 1,
    "High": 2,
    "Medium": 3,
    "Low": 4,
    "Informative": 5
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100); // Change this from 10 to 100
  const [applicationNumberFilter, setApplicationNumberFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [foundDateFilter, setFoundDateFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [riskRatingFilter, setRiskRatingFilter] = useState('');
  const [totalIssues, setTotalIssues] = useState(0); // ✅ Corrected state declaration
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const prevIssuesRef = useRef<FindingIssue[]>([]);
  const [allIssues, setAllIssues] = useState<FindingIssue[]>([]); // ✅ Store all fetched issues
  const [localIssues, setLocalIssues] = useState<FindingIssue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<FindingIssue[]>(issues);
  const [editingIssue, setEditingIssue] = useState<FindingIssue | null>(null);
  const currentPageIssues = filteredIssues;
  const [loading, setLoading] = useState(false); // Track loading state
  const [uniqueApplicationNumbers, setUniqueApplicationNumbers] = useState<string[]>([]);
  const [uniqueFoundDates, setUniqueFoundDates] = useState<string[]>([]);
  const [uniqueRiskRatings, setUniqueRiskRatings] = useState<string[]>([]);
  const [uniqueYears, setUniqueYears] = useState<number[]>([]);
  const [uniqueMonths, setUniqueMonths] = useState<number[]>([]);
  const uniqueValuesFetchedRef = useRef(false); // ✅ Prevents multiple fetches

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


  const fetchFindingIssues = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/findingIssue', {
        params: {
          limit: 10000, // ✅ Fetch all issues at once (adjustable)
          search: searchTerm,
          applicationNumber: applicationNumberFilter,
          foundDate: foundDateFilter,
          riskRating: riskRatingFilter,
          year: yearFilter,
          month: monthFilter,
        },
      });

      const { finding_issues } = response.data;

      if (JSON.stringify(allIssues) !== JSON.stringify(finding_issues)) {
        setAllIssues(finding_issues);
        applyFilters(finding_issues); // ✅ Apply filters immediately
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, applicationNumberFilter, foundDateFilter, riskRatingFilter, yearFilter, monthFilter]);

  const applyFilters = (issues: FindingIssue[]) => {
    let filtered = [...issues];

    if (searchTerm) {
      filtered = filtered.filter((issue) =>
        Object.values(issue).some((value) =>
          value ? String(value).toLowerCase().includes(searchTerm.toLowerCase()) : false
        )
      );
    }

    if (applicationNumberFilter) {
      filtered = filtered.filter((issue) =>
        String(issue['Application Number']).toLowerCase().includes(applicationNumberFilter.toLowerCase())
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

    if (riskRatingFilter) {
      filtered = filtered.filter((issue) =>
        issue['Risk Rating']?.toLowerCase().includes(riskRatingFilter.toLowerCase())
      );
    }

    if (yearFilter) {
      filtered = filtered.filter((issue) =>
        issue['Found Date'] ? new Date(issue['Found Date']).getFullYear() === parseInt(yearFilter) : false
      );
    }

    if (monthFilter) {
      filtered = filtered.filter((issue) =>
        issue['Found Date'] ? new Date(issue['Found Date']).getMonth() + 1 === parseInt(monthFilter) : false
      );
    }

    // ✅ Sorting Logic
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let valueA = a[sortConfig.key] || '';
        let valueB = b[sortConfig.key] || '';

        if (sortConfig.key === "Found Date" || sortConfig.key === "Overdue Date") {
          valueA = valueA ? new Date(valueA).getTime() : 0;
          valueB = valueB ? new Date(valueB).getTime() : 0;
        } else if (sortConfig.key === "Year") {
          valueA = a["Found Date"] ? new Date(a["Found Date"]).getFullYear() : 0;
          valueB = b["Found Date"] ? new Date(b["Found Date"]).getFullYear() : 0;
        } else if (sortConfig.key === "Month") {
          valueA = a["Found Date"] ? new Date(a["Found Date"]).getMonth() + 1 : 0;
          valueB = b["Found Date"] ? new Date(b["Found Date"]).getMonth() + 1 : 0;
        } else if (sortConfig.key === "Risk Rating") {
          valueA = riskRatingPriority[valueA] || 99;
          valueB = riskRatingPriority[valueB] || 99;
        }

        return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
      });
    }

    setFilteredIssues(filtered);
    setLocalIssues(filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
  };


  useEffect(() => {
    const fetchUniqueValues = async () => {
      if (uniqueValuesFetchedRef.current) return; // ✅ Prevent duplicate fetches

      try {
        const response = await axios.get('http://localhost:5000/uniqueValues');
        const data = response.data;

        setUniqueApplicationNumbers(data.application_numbers || []);
        setUniqueFoundDates(data.found_dates || []);
        setUniqueRiskRatings(data.risk_ratings || []);
        setUniqueYears(data.years || []);
        setUniqueMonths(data.months || []);

        uniqueValuesFetchedRef.current = true; // ✅ Mark as fetched
      } catch (error) {
        console.error('Error fetching unique values:', error);
      }
    };

    fetchUniqueValues();
  }, []);  // ✅ Runs only once on mount



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

  const handleFilterChange = (event: SelectChangeEvent<string>, filterType: string) => {
    const { value } = event.target;

    switch (filterType) {
      case 'applicationNumber':
        setApplicationNumberFilter(value);
        break;
      case 'foundDate':
        setFoundDateFilter(value);
        break;
      case 'riskRating':
        setRiskRatingFilter(value);
        break;
      case 'year':
        setYearFilter(value);
        break;
      case 'month':
        setMonthFilter(value);
        break;
      default:
        break;
    }
  };


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

    setLocalIssues(formattedIssues); // Ensure issues are properly formatted first
  }, [issues]);


  useEffect(() => {
    let filtered = localIssues;

    if (searchTerm) {
      filtered = filtered.filter((issue) =>
        Object.values(issue).some((value) =>
          value ? String(value).toLowerCase().includes(searchTerm.toLowerCase()) : false
        )
      );
    }

    if (applicationNumberFilter) {
      filtered = filtered.filter((issue) =>
        String(issue['Application Number']).toLowerCase().includes(applicationNumberFilter.toLowerCase())
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

    if (riskRatingFilter) {
      filtered = filtered.filter((issue) =>
        issue['Risk Rating']?.toLowerCase().includes(riskRatingFilter.toLowerCase())
      );
    }

    setFilteredIssues(filtered);
  }, [
    searchTerm,
    applicationNumberFilter,
    foundDateFilter,
    riskRatingFilter,
    localIssues, // ✅ Keep this, but make sure it's not being overwritten unexpectedly
  ]);



  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // ✅ Update state immediately
    fetchFindingIssues(); // ✅ Fetch immediately on page change
    setPage(0);
  };


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setLocalIssues(filteredIssues.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage)); // ✅ Paginate filtered data
  };


  // Handle rows per page changes
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 100);
    setRowsPerPage(newRowsPerPage);
    setFilteredIssues(localIssues.slice(0, newRowsPerPage)); // Reset filtered data
  };



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

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
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
            onChange={(e) => handleFilterChange(e, 'applicationNumber')}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            {uniqueApplicationNumbers.map((number) => (
              <MenuItem key={number} value={number}>
                {number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <Typography variant="h6">Found Date</Typography>
          <Select
            value={foundDateFilter}
            onChange={(e) => handleFilterChange(e, 'foundDate')}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            {uniqueFoundDates.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <Typography variant="h6">Risk Rating</Typography>
          <Select
            value={riskRatingFilter}
            onChange={(e) => handleFilterChange(e, 'riskRating')}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            {uniqueRiskRatings.map((risk) => (
              <MenuItem key={risk} value={risk}>
                {risk}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <Typography variant="h6">Year</Typography>
          <Select
            value={yearFilter}
            onChange={(e) => handleFilterChange(e, 'year')}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            {uniqueYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <Typography variant="h6">Month</Typography>
          <Select
            value={monthFilter}
            onChange={(e) => handleFilterChange(e, 'month')}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            {uniqueMonths.map((month) => (
              <MenuItem key={month} value={month}>
                {monthNames[month - 1]}
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
                <TableCell key={column} onClick={() => handleSort(column)} style={{ cursor: 'pointer' }}>
                  {column} {sortConfig.key === column ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </TableCell>))}
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
        component="div"
        count={totalIssues} // Use total count from API
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </div >
  );
};

export default DynamicTable;