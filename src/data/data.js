// Assume data coming through API was aggreagated by customer
// Data will be an array of objects with the type {name: string, transactions: [{data, ammount}]}

export const getCustomerData = async () => {
  return new Promise((resolve) => {
    const data = [
      {
        name: 'Jake',
        transactions: [
          {
            date: '5/1/2022',
            amount: 100,
          },
          {
            date: '6/1/2022',
            amount: 10,
          },
          {
            date: '7/1/2022',
            amount: 200,
          },
          {
            date: '5/1/2022',
            amount: 650,
          },
          {
            date: '5/1/2022',
            amount: 110,
          },
          {
            date: '7/1/2022',
            amount: 500,
          },
          {
            date: '6/1/2022',
            amount: 170,
          },
          {
            date: '7/1/2022',
            amount: 120,
          },
        ],
      },
      {
        name: 'Colton',
        transactions: [
          {
            date: '5/1/2022',
            amount: 100,
          },
          {
            date: '6/28/2022',
            amount: 140,
          },
          {
            date: '7/15/2022',
            amount: 1300,
          },
          {
            date: '6/11/2022',
            amount: 256,
          },
          {
            date: '7/24/2022',
            amount: 35,
          },
          {
            date: '6/2/2022',
            amount: 115,
          },
        ],
      },
      {
        name: 'Daniel',
        transactions: [
          {
            date: '6/1/2022',
            amount: 2354,
          },
          {
            date: '5/26/2022',
            amount: 120,
          },
          {
            date: '7/4/2022',
            amount: 114,
          },
          {
            date: '7/24/2022',
            amount: 345,
          },
          {
            date: '5/2/2022',
            amount: 2389,
          },
          {
            date: '5/12/2022',
            amount: 1456,
          },
          {
            date: '6/12/2022',
            amount: 38,
          },
        ],
      },
      {
        name: 'Brittney',
        transactions: [],
      },
    ];
    // Use setTimeout to simulate this being an asynchronous API data call
    setTimeout(() => {
      resolve(data);
    }, 3000);
  });
  // console.log('we are done waiting 3 seconds')
  // return result;
};
