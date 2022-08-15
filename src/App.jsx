import {
  Box,
  Table,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { getCustomerData } from './data/data';

const App = () => {
  const [customerData, setCustomerData] = useState(undefined);
  const [rewardPoints, setRewardPoints] = useState(undefined);
  const [lastThreeMonths] = useState([
    moment(new Date()).add(-3, 'months').format('MMMM'), // 3 motnhs ago
    moment(new Date()).add(-2, 'months').format('MMMM'), // 2 months ago
    moment(new Date()).add(-1, 'months').format('MMMM'), // last month
  ]);

  const calcRewards = (price) => {
    let rewards = 0;
    if (price > 50 && price <= 100) {
      rewards = price - 50;
    } else if (price > 100) {
      rewards = 50 + (price - 100) * 2;
    }
    return rewards;
  };

  const pointTotals = (transactions, months) => {
    let result = [];

    months.forEach((month) =>
      result.push(
        transactions
          .filter((t) => t.month === month)
          .reduce((acc, t) => acc + t.points, 0)
      )
    );

    let total = transactions.reduce((acc, t) => acc + t.points, 0);
    result.push(total);
    return result;
  };

  useEffect(() => {
    // On loadup, make simulated API call to get customer data
    getCustomerData().then((result) => setCustomerData(result));
  }, []);

  useEffect(() => {
    if (!customerData) return;
    let rewards = customerData.map((c) => ({
      ...c,
      transactions: c.transactions.map((t) => ({
        ...t,
        month: moment(new Date(t.date)).format('MMMM'),
        points: calcRewards(t.amount),
      })),
    }));
    setRewardPoints(rewards);
  }, [customerData]);

  if (!customerData || !rewardPoints)
    return (
      <Box
        p={4}
        display='flex'
        alignItems='center'
        justifyContent='center'
        sx={{ backgroundColor: '#282c34', minHeight: '100vh' }}
      >
        <Typography variant='h4' color='white'>
          Fetching Customer Data!
        </Typography>
      </Box>
    );
  return (
    <Box p={4} sx={{ backgroundColor: '#282c34', minHeight: '100vh' }}>
      <Paper elevation={6} sx={{ backgroundColor: 'white' }}>
        <Box p={2}>
          <Table size='small'>
            <TableRow>
              <TableCell colSpan={5}>
                <Box display='flex' justifyContent='center'>
                  <b>Customer Reward Points</b>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              {lastThreeMonths.map((month) => (
                <TableCell>{month}</TableCell>
              ))}
              <TableCell>Total</TableCell>
            </TableRow>
            {rewardPoints.map((r) => (
              <TableRow>
                <TableCell>{r.name}</TableCell>
                {pointTotals(r.transactions, lastThreeMonths).map((agg) => (
                  <TableCell>{agg}</TableCell>
                ))}
              </TableRow>
            ))}
          </Table>
        </Box>
      </Paper>
    </Box>
  );
};

export default App;
