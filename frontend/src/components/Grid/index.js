import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item>자동차</Item>
        </Grid>
        <Grid xs={6}>
          <Item>에어컨</Item>
        </Grid>
        <Grid xs={6}>
          <Item>휴대폰</Item>
        </Grid>
        <Grid xs={6}>
          <Item>나무</Item>
        </Grid>
      </Grid>
    </Box>
  );
}