import React, { useState, useEffect } from 'react';

export default function TotalsNumberFetch() {
    const [totals, setTotals] = useState({ totalVulnerabilities: 0, totalApps: 0 });

    useEffect(() => {
        fetch('/getTotals')
            .then(response => response.json())
            .then(data => setTotals({
                totalVulnerabilities: data.total_vulnerabilities,
                totalApps: data.total_apps
            }))
            .catch(error => console.error('Error fetching totals:', error));
    }, []);

    return totals;  // Return totals for other components to use
}
