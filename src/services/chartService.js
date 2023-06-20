const chartServices = {
  totalPlanAndAmount: (subscriptions) => {
    const data = subscriptions.reduce((acc, subscription) => {
      const date = new Date(subscription?.createdAt).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + subscription?.amount;
      return acc;
    }, {});
    let label = []
    let value = []
    for (const x in data) {
      label.push(x)
      value.push(data[x])
    }
    return [label, value];
  },
  planRatio: (subscriptions) => {
    const data = subscriptions.reduce((acc, subscription) => {
      acc[subscription?.plan] = (acc[subscription?.plan] || 0) + 1;
      return acc;
    }, {});
    const label = []
    const value = []
    for (const x in data) {
      label.push(x)
      value.push(data[x])
    }
    return [label, value];
  }
};

export default chartServices;