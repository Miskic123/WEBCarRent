<template>
    <div class="order-details-container">
      <h2>Order Details</h2>
      <div v-if="selectedOrder">
        <h3>Order Information</h3>
        <p><strong>Order ID:</strong> {{ selectedOrder.id }}</p>
        <p><strong>Rental Object:</strong> {{ getOrderVehicles(selectedOrder.vehicles) }}</p>
        <p><strong>Date:</strong> {{ selectedOrder.date }}</p>
        <p><strong>Duration (days):</strong> {{ selectedOrder.duration }}</p>
        <p><strong>Total Price:</strong> {{ selectedOrder.price }}</p>
        <p><strong>Order Status:</strong> {{ selectedOrder.orderStatus }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedOrder: Object,
    },
    methods: {
      getOrderVehicles(vehicles) {
        return vehicles.map(vehicle => `${vehicle.brand} ${vehicle.model}`).join(', ');
      },
    },
  };
  </script>
  
  <style scoped>
  .order-details-container {
    flex: 1;
    padding: 20px;
  }
  
  .order-details-container h2,
  .order-details-container h3 {
    text-align: center;
  }
  
  .order-details-container p {
    margin-bottom: 10px;
  }
  </style>
  