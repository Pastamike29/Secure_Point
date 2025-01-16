import React, { useEffect, useRef, useState } from 'react';
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


interface FindingIssue {
  _id: string;
  [key: string]: any; // Allow any dynamic keys for properties
}

interface DynamicTableProps {
  issues: FindingIssue[]; // Declare the issues prop
  onUpdateIssue: (updatedIssue: FindingIssue) => void;
  onDeleteIssue: (issueId: string) => void;
}


const DynamicTable: React.FC<DynamicTableProps> = ({ issues, onUpdateIssue,
  onDeleteIssue, }) => {

  const [localIssues, setLocalIssues] = useState<FindingIssue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<FindingIssue[]>(issues);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: '',
    direction: 'asc',
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [applicationNumberFilter, setApplicationNumberFilter] = useState('');
  const [foundDateFilter, setFoundDateFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [riskRatingFilter, setRiskRatingFilter] = useState('');

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<FindingIssue | null>(null);
  const currentPageIssues = filteredIssues.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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

  const fetchIssues = async () => {
    try {
      const response = await fetch('http://localhost:5000/findingIssue'); // Replace with your actual API endpoint
      const data = await response.json();
      setLocalIssues(Array.isArray(data.finding_issues) ? data.finding_issues : []); // Set the correct key for issues
    } catch (error) {
      setLocalIssues([]); // Fallback to empty array if fetch fails
    }
  };


  useEffect(() => {
    fetchIssues();
  }, []);

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
    console.log(`Matching key for column "${column}":`, matchingKey); // Debug log
    return matchingKey ? issue[matchingKey] : 'N/A';
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    try {
      // Parse the date with the expected format
      const parsedDate = parse(date, 'dd-MMM-yyyy', new Date());
      return isValid(parsedDate) ? format(parsedDate, 'dd/MM/yyyy') : 'N/A';
    } catch {
      return 'N/A';
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    let filtered = issues.filter((issue) => {
      return Object.values(issue).some((value) =>
        String(value).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    });


    if (applicationNumberFilter) {
      filtered = filtered.filter((issue) => {
        const applicationNumber = String(issue['Application Number']).trim().toLowerCase();
        const isMatch = applicationNumber.includes(applicationNumberFilter.toLowerCase());
        return isMatch;
      });
    }

    if (foundDateFilter) {
      filtered = filtered.filter((issue) => {
        const foundDate = new Date(issue['Found Date']);
        const filterDate = new Date(foundDateFilter); // Parse the selected filter date
        return (
          foundDate.getFullYear() === filterDate.getFullYear() &&
          foundDate.getMonth() === filterDate.getMonth() &&
          foundDate.getDate() === filterDate.getDate()
        );
      });
    }

    if (yearFilter) {
      filtered = filtered.filter((issue) => {
        const foundYear = new Date(issue['Found Date']).getFullYear();
        return foundYear === parseInt(yearFilter);
      });
    }

    if (monthFilter) {
      filtered = filtered.filter((issue) => {
        const foundMonth = new Date(issue['Found Date']).getMonth() + 1;
        return foundMonth === parseInt(monthFilter);
      });
    }

    if (riskRatingFilter) {
      filtered = filtered.filter((issue) => issue['Risk Rating'] === riskRatingFilter);
    }

    const sortedIssues = filtered.sort((a, b) => {
      if (sortConfig.key) {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue == null || aValue === 'N/A') return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue == null || bValue === 'N/A') return sortConfig.direction === 'asc' ? 1 : -1;

        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }

        if (String(aValue).toLowerCase() < String(bValue).toLowerCase()) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (String(aValue).toLowerCase() > String(bValue).toLowerCase()) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });

    setFilteredIssues(sortedIssues);
  }, [issues, sortConfig, debouncedSearchTerm, applicationNumberFilter, foundDateFilter, yearFilter, monthFilter, riskRatingFilter]);


  const columns = filteredIssues.length > 0
    ? columnOrder.filter((column) => column in filteredIssues[0])
    : [];

  if (!Array.isArray(filteredIssues)) {
    return <div>No data available</div>;
  }


  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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

  const handleEditClick = (issue: FindingIssue) => {
    setEditingIssue(issue);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditingIssue(null);
  };


  const handleEditSave = () => {
    if (editingIssue) {
      console.log("Updated issue being sent to API:", editingIssue);
      onUpdateIssue(editingIssue);
    }
    handleEditDialogClose();
  };


  const handleDeleteClick = (issueId: string) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      onDeleteIssue(issueId);
    }
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

      <TableContainer component={Paper}
        ref={scrollContainerRef}
        sx={{
          overflowX: 'auto',
          cursor: isDragging.current ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}>
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
            {currentPageIssues.map((issue) => (
              <TableRow key={issue._id}>
                {validColumns.map((column) => {
                  const value = getNormalizedValue(issue, column);
                  const isDateColumn = ['Found Date', 'Overdue Date'].includes(column);
                  const displayValue = isDateColumn ? formatDate(value) : value;
                  return <TableCell key={column}>{displayValue}</TableCell>;
                })}
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(issue)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(issue._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogContent>
          {editingIssue &&
            Object.keys(editingIssue).map((key) => (
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
            ))}
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
        count={filteredIssues.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div >
  );
};

export default DynamicTable;